import { NextRequest, NextResponse } from "next/server";
import { guardApi } from "@/lib/api-guard";
import { logAudit } from "@/lib/audit";
import {
  getConversionStats,
  buildWhatsappReport,
  buildEmailReport,
} from "@/lib/conversion-report";
import { sendMail } from "@/lib/mailer";
import { sendWhatsappText, whatsappConfigured } from "@/lib/whatsapp";
import { requireCronSecret } from "@/lib/cron-auth";

const REPORT_EMAIL = process.env.ADMIN_EMAIL;

async function GETHandler(req: NextRequest) {
  const forbidden = requireCronSecret(req);
  if (forbidden) return forbidden;

  if (!whatsappConfigured && !(REPORT_EMAIL && (process.env.BREVO_API_KEY || (process.env.SMTP_USER && process.env.SMTP_PASS)))) {
    return NextResponse.json({
      ok: true,
      skipped: "Aucun canal configuré (WHATSAPP_* ou ADMIN_EMAIL + mailer)",
    });
  }

  const stats = await getConversionStats(7);
  const summary = buildWhatsappReport(stats);

  const results: Record<string, boolean> = {};
  if (whatsappConfigured) results.whatsapp = await sendWhatsappText(summary);
  if (REPORT_EMAIL) {
    const mail = buildEmailReport(stats);
    results.email = await sendMail({
      to: REPORT_EMAIL,
      subject: mail.subject,
      html: mail.html,
      text: summary,
    });
  }

  if (results.whatsapp || results.email) {
    await logAudit(
      null,
      "rapport_conversion",
      `${summary.split("\n").slice(0, 6).join(" | ")} | whatsapp=${!!results.whatsapp} email=${!!results.email}`,
    );
  }

  return NextResponse.json({ ok: true, ...results, date: stats.date });
}

export const GET = guardApi("GET /api/cron/report", GETHandler);