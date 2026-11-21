import React from "react";

/**
 * CoverDiagram - renders a proportional technical blueprint of the
 * unfolded book cover with numbered callouts matching the dimension table.
 */
export default function CoverDiagram({ dims, isMm, fmt, u, readingDir }) {
  const isHardcover = dims.isHardcover;
  const isRTL = readingDir === "rtl";

  // All values in display units (inches or mm)
  const { full, trim, spine, bleed, margin, safe, spineSafe, spineMargin, barcode, wrap, hinge } = dims;

  const bleedVal = bleed.w;
  const marginVal = margin.w;
  const wrapVal = wrap.w;
  const hingeVal = hinge.w;

  // Compute trim area position (centered in full cover)
  const trimTotalW = 2 * trim.w + spine.w;
  const trimX = (full.w - trimTotalW) / 2;
  const trimY = isHardcover ? (full.h - trim.h) / 2 : bleedVal;

  // Section positions
  const backX = trimX;
  const spineX = trimX + trim.w;
  const frontX = trimX + trim.w + spine.w;

  // For RTL, front is on the left, back on the right
  const frontCoverX = isRTL ? backX : frontX;
  const backCoverX = isRTL ? frontX : backX;

  // Safe area (on front cover)
  const safeX = frontCoverX + (isRTL ? marginVal : 0);
  const safeY = trimY + marginVal;

  // Spine safe area
  const spineSafeX = spineX + spineMargin.w;
  const spineSafeY = trimY + marginVal;

  // Barcode (bottom outer corner of back cover)
  const barcodeX = isRTL ? backCoverX + trim.w - barcode.w : backCoverX;
  const barcodeY = trimY + trim.h - barcode.h;

  // Hinge positions (hardcover)
  const hingeBackX = spineX - hingeVal;
  const hingeFrontX = spineX + spine.w;

  // Scale to SVG
  const padX = 70;
  const padY = 50;
  const maxW = 520;
  const maxH = 380;
  const scale = Math.min((maxW - padX * 2) / full.w, (maxH - padY * 2) / full.h);
  const svgW = full.w * scale + padX * 2;
  const svgH = full.h * scale + padY * 2;
  const ox = padX;
  const oy = padY;
  const s = (v) => v * scale;

  // Callout positions (in display units, will be scaled)
  const pbCallouts = [
    { n: 1, x: full.w / 2, y: -0.35, anchor: "top" },
    { n: 2, x: frontCoverX + trim.w / 2, y: trimY + trim.h * 0.35 },
    { n: 3, x: safeX + safe.w / 2, y: safeY + safe.h / 2 },
    { n: 4, x: full.w / 2, y: bleedVal / 2 },
    { n: 5, x: frontCoverX + trim.w - marginVal / 2, y: trimY + marginVal / 2 },
    { n: 6, x: spineX + spine.w / 2, y: trimY + trim.h * 0.22 },
    { n: 7, x: spineX + spine.w / 2, y: trimY + trim.h * 0.5 },
    { n: 8, x: spineX + spineMargin.w, y: trimY + trim.h * 0.78 },
    { n: 9, x: barcodeX + barcode.w / 2, y: barcodeY + barcode.h / 2 },
  ];

  const hcCallouts = [
    { n: 1, x: full.w / 2, y: -0.35, anchor: "top" },
    { n: 2, x: frontCoverX + trim.w / 2, y: trimY + trim.h * 0.35 },
    { n: 3, x: frontCoverX + trim.w - marginVal / 2, y: trimY + marginVal / 2 },
    { n: 4, x: wrapVal / 2, y: full.h / 2 },
    { n: 5, x: (isRTL ? hingeBackX : hingeFrontX) + hingeVal / 2, y: trimY + trim.h * 0.5 },
    { n: 6, x: spineX + spine.w / 2, y: trimY + trim.h * 0.22 },
    { n: 7, x: spineX + spine.w / 2, y: trimY + trim.h * 0.5 },
    { n: 8, x: spineX + spineMargin.w, y: trimY + trim.h * 0.78 },
    { n: 9, x: barcodeX + barcode.w / 2, y: barcodeY + barcode.h / 2 },
  ];

  const callouts = isHardcover ? hcCallouts : pbCallouts;
  const cr = 9; // callout radius in SVG px

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto" style={{ maxHeight: 420 }}>
      {/* Dimension line - width (top) */}
      <g stroke="#475569" strokeWidth={0.8} fill="#475569">
        <line x1={ox} y1={oy - 12} x2={ox + s(full.w)} y2={oy - 12} />
        <line x1={ox} y1={oy - 16} x2={ox} y2={oy - 8} />
        <line x1={ox + s(full.w)} y1={oy - 16} x2={ox + s(full.w)} y2={oy - 8} />
        <text x={ox + s(full.w) / 2} y={oy - 18} textAnchor="middle" fontSize={10} fontWeight="600" stroke="none">
          {fmt(full.w)} {u}
        </text>
      </g>

      {/* Dimension line - height (left) */}
      <g stroke="#475569" strokeWidth={0.8} fill="#475569">
        <line x1={ox - 14} y1={oy} x2={ox - 14} y2={oy + s(full.h)} />
        <line x1={ox - 18} y1={oy} x2={ox - 10} y2={oy} />
        <line x1={ox - 18} y1={oy + s(full.h)} x2={ox - 10} y2={oy + s(full.h)} />
        <text x={ox - 22} y={oy + s(full.h) / 2} textAnchor="middle" fontSize={10} fontWeight="600" stroke="none" transform={`rotate(-90, ${ox - 22}, ${oy + s(full.h) / 2})`}>
          {fmt(full.h)} {u}
        </text>
      </g>

      {/* Full cover background */}
      <rect x={ox} y={oy} width={s(full.w)} height={s(full.h)} fill="#f8fafc" stroke="#1e293b" strokeWidth={1.5} />

      {/* Wrap area (hardcover) */}
      {isHardcover && (
        <rect
          x={ox + s(wrapVal)} y={oy + s(wrapVal)}
          width={s(full.w - 2 * wrapVal)} height={s(full.h - 2 * wrapVal)}
          fill="#fef9c3" fillOpacity={0.3}
          stroke="#ca8a04" strokeWidth={0.8} strokeDasharray="4 2"
        />
      )}

      {/* Trim area (white) */}
      <rect
        x={ox + s(trimX)} y={oy + s(trimY)}
        width={s(trimTotalW)} height={s(trim.h)}
        fill="#ffffff" stroke="#475569" strokeWidth={1}
      />

      {/* Hinge areas (hardcover) */}
      {isHardcover && (
        <>
          <rect
            x={ox + s(hingeBackX)} y={oy + s(trimY)}
            width={s(hingeVal)} height={s(trim.h)}
            fill="#fef3c7" fillOpacity={0.5} stroke="#d97706" strokeWidth={0.5}
          />
          <rect
            x={ox + s(hingeFrontX)} y={oy + s(trimY)}
            width={s(hingeVal)} height={s(trim.h)}
            fill="#fef3c7" fillOpacity={0.5} stroke="#d97706" strokeWidth={0.5}
          />
        </>
      )}

      {/* Spine */}
      <rect
        x={ox + s(spineX)} y={oy + s(trimY)}
        width={s(spine.w)} height={s(spine.h)}
        fill="#ede9fe" stroke="#7c3aed" strokeWidth={1}
      />

      {/* Spine center line */}
      <line
        x1={ox + s(spineX + spine.w / 2)} y1={oy + s(trimY)}
        x2={ox + s(spineX + spine.w / 2)} y2={oy + s(trimY + trim.h)}
        stroke="#7c3aed" strokeWidth={0.4} strokeDasharray="2 2"
      />

      {/* Safe area */}
      <rect
        x={ox + s(safeX)} y={oy + s(safeY)}
        width={s(safe.w)} height={s(safe.h)}
        fill="none" stroke="#0ea5e9" strokeWidth={0.8} strokeDasharray="3 2"
      />

      {/* Spine safe area */}
      <rect
        x={ox + s(spineSafeX)} y={oy + s(spineSafeY)}
        width={s(spineSafe.w)} height={s(spineSafe.h)}
        fill="none" stroke="#6d28d9" strokeWidth={0.6} strokeDasharray="2 2"
      />

      {/* Barcode area */}
      <rect
        x={ox + s(barcodeX)} y={oy + s(barcodeY)}
        width={s(barcode.w)} height={s(barcode.h)}
        fill="#e0f2fe" fillOpacity={0.4} stroke="#0284c7" strokeWidth={0.8} strokeDasharray="2 2"
      />
      {s(barcode.w) > 20 && (
        <text
          x={ox + s(barcodeX + barcode.w / 2)} y={oy + s(barcodeY + barcode.h / 2) + 2}
          textAnchor="middle" fontSize={5} fill="#0284c7" fontWeight="bold"
        >
          Barcode
        </text>
      )}

      {/* Callout circles */}
      {callouts.map((c) => {
        const cx = ox + s(c.x);
        const cy = oy + s(c.y);
        return (
          <g key={c.n}>
            {c.anchor === "top" && (
              <line x1={cx} y1={cy + s(0.35)} x2={cx} y2={oy - 4} stroke="#1e293b" strokeWidth={0.6} />
            )}
            <circle cx={cx} cy={cy} r={cr} fill="#1e293b" stroke="#fff" strokeWidth={1.5} />
            <text x={cx} y={cy + 3} textAnchor="middle" fontSize={9} fill="#fff" fontWeight="bold">
              {c.n}
            </text>
          </g>
        );
      })}
    </svg>
  );
}