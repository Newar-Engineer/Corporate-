export default function ServiceVisual() {
  return (
    <div className="stage">
      <div className="glow" />
      <div className="base" />

      <div className="badges">
        <div className="badge react"><i />React</div>
        <div className="badge next"><i />Next.js</div>
        <div className="badge node"><i />Node.js</div>
      </div>

      <div className="browser">
        <div className="browser-bar">
          <div className="dot r" />
          <div className="dot y" />
          <div className="dot g" />
          <div className="url">newatech.vercel.app</div>
        </div>
        <div className="browser-body">
          <div className="bb-tag">Live Build</div>
          <p className="bb-title">Grow Your <span>Business</span></p>
          <div className="bb-line w1" />
          <div className="bb-line w2" />
          <div className="bb-btns">
            <div className="bb-btn solid">Explore Services</div>
            <div className="bb-btn ghost">Request Proposal</div>
          </div>
        </div>
      </div>

      <div className="code-card">
        <div className="code-head">
          <div className="dot r sm" />
          <div className="dot y sm" />
          <div className="dot g sm" />
          <span>checkout.tsx</span>
        </div>
        <div className="code-body">
          <div><span className="c-kw">const</span> <span className="c-var">pay</span> = <span className="c-kw">await</span> <span className="c-fn">esewa</span>.init();</div>
          <div><span className="c-com">{"// secure payment gateway"}</span></div>
          <div><span className="c-tag">{"<Checkout"}</span> <span className="c-var">status</span>={"="}<span className="c-str">"ready"</span> <span className="c-tag">{"/>"}</span></div>
        </div>
      </div>

      <style jsx>{`
        .stage {
          position: relative;
          width: 100%;
          height: 100%;
          font-family: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
        }
        .glow {
          position: absolute;
          inset: -60px;
          background:
            radial-gradient(ellipse at 35% 30%, rgba(47,143,255,0.22), transparent 60%),
            radial-gradient(ellipse at 70% 75%, rgba(56,211,245,0.14), transparent 55%);
          filter: blur(10px);
          pointer-events: none;
        }
        .base {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background:
            linear-gradient(160deg, #0d1730 0%, #0a0e1a 65%),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 28px),
            repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 28px);
          border: 1px solid #1e2740;
          overflow: hidden;
        }
        .base::after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          right: -60px;
          bottom: -60px;
          background: radial-gradient(circle, rgba(47,143,255,0.18), transparent 70%);
          border-radius: 50%;
        }
        .browser {
          position: absolute;
          top: 38px;
          left: 30px;
          width: 340px;
          border-radius: 12px;
          background: #0f1526;
          border: 1px solid #1e2740;
          box-shadow: 0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02);
          animation: float1 7s ease-in-out infinite;
        }
        .browser-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 12px;
          border-bottom: 1px solid #1e2740;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .dot.sm { width: 6px; height: 6px; }
        .dot.r { background: #ff5f57; }
        .dot.y { background: #febc2e; }
        .dot.g { background: #28c840; }
        .url {
          margin-left: 10px;
          font-size: 9px;
          color: #7d8aa8;
          background: rgba(255,255,255,0.03);
          border: 1px solid #1e2740;
          padding: 3px 10px;
          border-radius: 6px;
          letter-spacing: 0.3px;
        }
        .browser-body { padding: 16px; }
        .bb-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 8.5px;
          color: #38d3f5;
          background: rgba(56,211,245,0.08);
          border: 1px solid rgba(56,211,245,0.25);
          padding: 4px 8px;
          border-radius: 999px;
          margin-bottom: 10px;
        }
        .bb-title {
          font-family: -apple-system, 'Segoe UI', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #eaf1ff;
          line-height: 1.3;
          margin: 0 0 6px;
        }
        .bb-title span { color: #2f8fff; }
        .bb-line {
          height: 6px;
          border-radius: 3px;
          background: rgba(255,255,255,0.06);
          margin-bottom: 6px;
        }
        .bb-line.w1 { width: 92%; }
        .bb-line.w2 { width: 68%; }
        .bb-btns { display: flex; gap: 8px; margin-top: 14px; }
        .bb-btn {
          font-size: 9px;
          padding: 7px 12px;
          border-radius: 6px;
          font-family: -apple-system, sans-serif;
          font-weight: 600;
        }
        .bb-btn.solid {
          background: linear-gradient(135deg, #2f8fff, #38d3f5);
          color: #04101f;
        }
        .bb-btn.ghost {
          border: 1px solid #1e2740;
          color: #b8c2da;
        }
        .code-card {
          position: absolute;
          bottom: 26px;
          right: 24px;
          width: 236px;
          background: #0b1224;
          border: 1px solid #1e2740;
          border-radius: 10px;
          box-shadow: 0 25px 50px -15px rgba(0,0,0,0.7);
          animation: float2 8s ease-in-out infinite;
          animation-delay: .4s;
        }
        .code-head {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 8px 10px;
          border-bottom: 1px solid #1e2740;
        }
        .code-head span { font-size: 8px; color: #7d8aa8; margin-left: 4px; }
        .code-body { padding: 10px 12px; font-size: 9.5px; line-height: 1.7; }
        .c-kw { color: #ff6bcb; }
        .c-fn { color: #38d3f5; }
        .c-str { color: #34d399; }
        .c-com { color: #7d8aa8; }
        .c-var { color: #fbbf24; }
        .c-tag { color: #a78bfa; }
        .badges {
          position: absolute;
          top: -14px;
          right: 40px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }
        .badge {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #0f1526;
          border: 1px solid #1e2740;
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 9px;
          color: #b8c2da;
          box-shadow: 0 10px 20px -8px rgba(0,0,0,0.5);
          animation: float3 6s ease-in-out infinite;
        }
        .badge:nth-child(2) { animation-delay: .3s; }
        .badge:nth-child(3) { animation-delay: .6s; }
        .badge i { width: 6px; height: 6px; border-radius: 50%; display: block; }
        .badge.react i { background: #61dafb; }
        .badge.next i { background: #ffffff; }
        .badge.node i { background: #83cd29; }
        @keyframes float1 {
          0%, 100% { transform: translateY(0) rotate(-1.2deg); }
          50% { transform: translateY(-8px) rotate(-0.4deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) rotate(1.5deg); }
          50% { transform: translateY(-10px) rotate(2.2deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .browser, .code-card, .badge { animation: none; }
        }
        @media (max-width: 480px) {
          .stage { height: 380px; }
          .browser { width: 90%; left: 5%; }
          .code-card { width: 200px; right: 10px; }
        }
      `}</style>
    </div>
  );
}
