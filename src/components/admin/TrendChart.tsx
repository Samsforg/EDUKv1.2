interface BarData {
  label: string;
  value: number;
}

export function TrendChart({
  title,
  subtitle,
  data,
  color,
  legend,
}: {
  title: string;
  subtitle: string;
  data: BarData[];
  color: string;
  legend: string;
}) {
  const W = 600;
  const H = 200;
  const PAD_L = 32;
  const PAD_B = 26;
  const PAD_T = 12;
  const PAD_R = 8;
  const max = Math.max(1, ...data.map((d) => d.value));
  const step = (max / 4) * 1.1;
  const levels = [0, 1, 2, 3, 4].map((i) => Math.round(i * step));
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const slot = plotW / Math.max(1, data.length);
  const barW = Math.max(2, slot * 0.55);

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-headline text-headline-md font-semibold text-on-surface">{title}</h3>
          <p className="text-xs text-on-surface-variant">{subtitle}</p>
        </div>
        <span className="flex items-center gap-1.5 text-label-xs text-on-surface-variant">
          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }}></span>
          {legend}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={title}>
        {levels.map((lv) => {
          const y = PAD_T + plotH - (lv / (levels[levels.length - 1] || 1)) * plotH;
          return (
            <g key={lv}>
              <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="currentColor" className="text-outline-variant" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              <text x={PAD_L - 6} y={y + 3} textAnchor="end" fontSize="10" className="fill-on-surface-variant">
                {lv}
              </text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const h = (d.value / (levels[levels.length - 1] || 1)) * plotH;
          const x = PAD_L + i * slot + (slot - barW) / 2;
          const y = PAD_T + plotH - h;
          const showLabel = i % Math.ceil(data.length / 8) === 0;
          return (
            <g key={d.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(h, d.value > 0 ? 2 : 0)}
                rx="3"
                fill={color}
                opacity={d.value > 0 ? 0.9 : 0.15}
              >
                <title>{`${d.label} : ${d.value}`}</title>
              </rect>
              {showLabel && (
                <text x={x + barW / 2} y={H - 8} textAnchor="middle" fontSize="9" className="fill-on-surface-variant">
                  {d.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
