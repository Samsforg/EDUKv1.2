import net from "net";
import tls from "tls";

export interface MailInput {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

const DEFAULT_HOST = "smtp-relay.brevo.com";
const DEFAULT_PORT = 587;

function dotStuff(body: string): string {
  return body
    .split("\r\n")
    .map((line) => (line.startsWith(".") ? "." + line : line))
    .join("\r\n");
}

export async function sendMailSmtp(input: MailInput): Promise<boolean> {
  const host = process.env.SMTP_HOST || DEFAULT_HOST;
  const port = Number(process.env.SMTP_PORT || DEFAULT_PORT);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    console.warn("[smtp] SMTP_USER/SMTP_PASS non configurés — email non envoyé.");
    return false;
  }
  const fromEmail = process.env.MAIL_FROM_EMAIL || "support@edukora.net";
  const fromName = "EduKora";

  return new Promise((resolve) => {
    let buf = "";
    let pending: ((r: { ok: boolean; code?: string; text?: string }) => void) | null = null;
    let socket: net.Socket | tls.TLSSocket;
    const timeout = setTimeout(() => {
      try { socket.destroy(); } catch {}
      resolve(false);
    }, 30000);
    let settled = false;
    const finish = (ok: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      try { socket.destroy(); } catch {}
      resolve(ok);
    };

    socket = net.connect(port, host, () => {});
    const rawSock = socket;

    const streamOnError = (e?: Error) => {
      console.error(`[smtp] erreur socket: ${e?.message ?? ""} host=${host}:${port}`);
      finish(false);
    };
    const attach = (stream: net.Socket | tls.TLSSocket) => {
      stream.on("data", (chunk) => {
        buf += chunk.toString("utf8");
        let idx;
        while ((idx = buf.indexOf("\r\n")) !== -1) {
          const line = buf.slice(0, idx);
          buf = buf.slice(idx + 2);
          const m = /^(\d{3})([ -])(.*)$/.exec(line);
          if (!m) continue;
          if (m[2] === "-") continue;
          if (pending) {
            const p = pending;
            pending = null;
            p({ ok: Number(m[1]) >= 200 && Number(m[1]) < 400, code: m[1], text: m[3] });
          }
        }
      });
      stream.on("error", streamOnError);
    };
    attach(socket);

    const cmd = (line: string) =>
      new Promise<{ ok: boolean; code?: string; text?: string }>((res) => {
        pending = res;
        socket.write(line + "\r\n");
      });
    const waitReply = () =>
      new Promise<{ ok: boolean; code?: string; text?: string }>((res) => {
        pending = res;
      });
    const fail = (where: string, r?: { ok: boolean; code?: string; text?: string }) => {
      console.error(`[smtp] échec ${where}${r?.code ? ` (${r.code} ${r.text})` : ""} host=${host}:${port}`);
      finish(false);
    };

    (async () => {
      let r = await waitReply(); // greeting
      r = await cmd("EHLO edukora.net");
      if (!r.ok) return fail("EHLO initial", r);
      if (port === 587) {
        r = await cmd("STARTTLS");
        if (!r.ok) return fail("STARTTLS", r);
        await new Promise<void>((res, rej) => {
          const t2 = tls.connect({ socket: socket as net.Socket, servername: host }, () => res());
          t2.on("error", () => rej(new Error("tls")));
          socket = t2;
        }).catch((e) => {
          console.error(`[smtp] TLS échec: ${e?.message ?? ""}`);
          finish(false);
          return;
        });
        rawSock.removeAllListeners("data");
        attach(socket);
        r = await cmd("EHLO edukora.net");
        if (!r.ok) return fail("EHLO post-TLS", r);
      }
      const auth = Buffer.from("\u0000" + user + "\u0000" + pass).toString("base64");
      r = await cmd("AUTH PLAIN " + auth);
      if (!r.ok) return fail("AUTH PLAIN", r);
      r = await cmd("MAIL FROM:<" + fromEmail + ">");
      if (!r.ok) return fail("MAIL FROM", r);
      r = await cmd("RCPT TO:<" + input.to + ">");
      if (!r.ok) return fail("RCPT TO", r);
      r = await cmd("DATA");
      if (!r.ok) return fail("DATA", r);
      const body =
        "From: " + fromName + " <" + fromEmail + ">\r\n" +
        "To: <" + input.to + ">\r\n" +
        "Subject: " + input.subject.replace(/\r?\n/g, " ").trim() + "\r\n" +
        "MIME-Version: 1.0\r\n" +
        "Content-Type: text/html; charset=UTF-8\r\n" +
        "\r\n" +
        dotStuff(input.html);
      const done = waitReply();
      socket.write(body + "\r\n.\r\n");
      r = await done;
      if (!r.ok) return fail("corps", r);
      try { socket.write("QUIT\r\n"); } catch {}
      finish(true);
    })().catch((e) => {
      console.error(`[smtp] exception: ${e?.message ?? e}`);
      finish(false);
    });
  });
}