import { Fragment, type ReactNode } from "react";

function renderInline(text: string, key: number): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <Fragment key={key}>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i}>{p.slice(2, -2)}</strong>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </Fragment>
  );
}

export default function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split("\n");
  const blocks: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let key = 0;

  const flushList = () => {
    if (!list) return;
    if (list.ordered) {
      blocks.push(
        <ol key={key++} className="list-decimal list-inside space-y-1.5">
          {list.items.map((it, i) => (
            <li key={i}>{renderInline(it, i)}</li>
          ))}
        </ol>,
      );
    } else {
      blocks.push(
        <ul key={key++} className="list-disc list-outside pl-5 space-y-1.5">
          {list.items.map((it, i) => (
            <li key={i}>{renderInline(it, i)}</li>
          ))}
        </ul>,
      );
    }
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushList();
      continue;
    }
    const h = line.match(/^##\s+(.*)$/);
    if (h) {
      flushList();
      blocks.push(
        <h2 key={key++} className="font-title-md text-title-md font-bold text-primary mt-7 mb-2">
          {renderInline(h[1], key++)}
        </h2>,
      );
      continue;
    }
    const li = line.match(/^[-*•]\s+(.*)$/);
    if (li) {
      list ??= { ordered: false, items: [] };
      list.items.push(li[1]);
      continue;
    }
    const ol = line.match(/^\d+[.)]\s+(.*)$/);
    if (ol) {
      list ??= { ordered: true, items: [] };
      list.items.push(ol[1]);
      continue;
    }
    flushList();
    blocks.push(
      <p key={key++} className="font-body-md text-on-surface leading-relaxed mb-3">
        {renderInline(line, key++)}
      </p>,
    );
  }
  flushList();

  return <div>{blocks}</div>;
}
