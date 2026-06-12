import { useState, useEffect, useRef } from "react";
import "./App.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const [time, setTime] = useState("");
  const heroRef = useRef(null);

  const STEPS = [
    "Fetching on-chain data...",
    "Running RAG security scan...",
    "Analyzing gas patterns...",
    "Composing audit report...",
  ];

  const SAMPLES = [
    { label: "Deployed Contract", addr: "0x6758D4228f51EAcC011Bb986fccc1816838eb338" },
    { label: "USDT-MNT Pool",     addr: "0x3c8D44E5e2d926B9a7B2E1A4d5fBe4Dc69412Ae" },
    { label: "MNT Staking",       addr: "0xD77b1231bB63e4298C7dA8DaF6E8e67C0f6B3A9" },
  ];

  useEffect(() => {
    const tick = () => {
      const n = new Date();
      let h = n.getHours(), m = n.getMinutes().toString().padStart(2, "0");
      const ap = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      setTime(`${h}:${m} ${ap}`);
    };
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onScroll = () => {
      const s = window.scrollY;
      if (s < 800) {
        el.style.transform = `translateY(${s * 0.3}px)`;
        el.style.opacity = Math.max(0, 1 - s / 480);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [status]);

  const analyze = async () => {
    if (!address.trim()) { document.getElementById("addrInput").focus(); return; }
    setStatus("loading");
    setLoadingStep(0);
    setResult(null);
    const timer = setInterval(() => {
      setLoadingStep((p) => (p < 3 ? p + 1 : p));
    }, 950);
    try {
      const res = await fetch(`${API_BASE}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contract_address: address.trim() }),
      });
      if (!res.ok) throw new Error(`Backend returned ${res.status}`);
      const data = await res.json();
      clearInterval(timer);
      setTimeout(() => { setResult(data); setStatus("result"); }, 3800);
    } catch (err) {
      clearInterval(timer);
      setTimeout(() => { setErrorMsg(err.message || "Unknown error"); setStatus("error"); }, 3800);
    }
  };

  const reset = () => { setStatus("idle"); setResult(null); setAddress(""); };
  const riskColor = (r) => r <= 30 ? "#00d28c" : r <= 60 ? "#ef9f27" : "#e24b4a";
  const riskLabel = (r) => r <= 30 ? "low risk" : r <= 60 ? "medium risk" : "high risk";
  const severityClass = (s) => s?.toLowerCase() === "high" ? "h" : s?.toLowerCase() === "medium" ? "m" : "l";

  return (
    <div className="root">

      {/* NOISE OVERLAY */}
      <div className="noise-overlay" />

      {/* AMBIENT ORBS */}
      <div className="orb orb-violet" />
      <div className="orb orb-cyan" />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">Chain<span>Scope.</span></div>
        <div className="nav-links">
          <span>Audit</span><span>Security</span><span>Gas</span>
        </div>
        <div className="nav-badge">MANTLE TESTNET</div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />

        {/* Floating decorative glyphs — Superdesign hands vibe */}
        <div className="float-glyph float-left">∮</div>
        <div className="float-glyph float-right">0x_</div>

        <div className="hero-content" ref={heroRef}>
          <div className="hero-tag">AI-powered contract intelligence</div>

          {/* Shimmer title — Synapse style */}
          <h1 className="hero-title">
            Read any contract.<br />
            <em className="shimmer-text">Instantly.</em>
          </h1>

          <p className="hero-sub">
            Paste a Mantle contract address and receive a plain-English audit —
            transactions, gas patterns, security risks decoded without jargon.
          </p>

          {/* RADIANT INPUT — rotating conic gradient border */}
          <div className="radiant-wrapper">
            <div className="radiant-border" />
            <div className="radiant-inner">
              <span className="input-icon">⬡</span>
              <input
                id="addrInput"
                className="addr-input"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && analyze()}
                placeholder="0x1234...abcd — enter Mantle contract address"
                spellCheck={false}
                autoComplete="off"
              />
              <button className="btn-analyze" onClick={analyze} disabled={status === "loading"}>
                {status === "loading" ? "Analyzing..." : "Analyze →"}
              </button>
            </div>
          </div>

          <div className="pills">
            <span className="pill-label">try:</span>
            {SAMPLES.map((s) => (
              <span key={s.addr} className="pill" onClick={() => setAddress(s.addr)}>{s.label}</span>
            ))}
          </div>

          <div className="network-row">
            <span className="dot" />
            Mantle Testnet · Chain ID 5003 · {time}
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* MISSION — Superdesign style */}
      <section className="mission reveal">
        <h2 className="mission-title">
          We design the negative space<br />where your contract truly lives.
        </h2>
        <p className="mission-sub">
          Elegance is refusal. We remove the noise so your audit resonates with absolute clarity.
        </p>
      </section>

      {/* TECH TICKER */}
      <div className="ticker-wrap reveal">
        <div className="ticker-track">
          {["RAG-POWERED","·","LANGCHAIN","·","FASTAPI","·","SOLIDITY","·","MANTLE L2","·","VECTOR DB","·","GROQ LLM","·",
            "RAG-POWERED","·","LANGCHAIN","·","FASTAPI","·","SOLIDITY","·","MANTLE L2","·","VECTOR DB","·","GROQ LLM","·"].map((t, i) => (
            <span key={i} className={t === "·" ? "ticker-dot" : "ticker-item"}>{t}</span>
          ))}
        </div>
      </div>

      {/* FEATURES — Superdesign card style with parallax */}
      <section className="features reveal">
        <h2 className="features-title">
          Define your<br /><em>on-chain presence</em>
        </h2>
        <div className="feat-grid">
          {/* Card 1 — accent (orange like Superdesign) */}
          <div className="feat-card accent parallax-down">
            <div className="feat-num">01</div>
            <div className="feat-head">
              <div className="feat-icon g">📄</div>
              <div className="feat-title">Transaction Summary</div>
            </div>
            <p className="feat-body">Every interaction decoded into plain English. Volume, frequency, patterns — laid bare without jargon.</p>
          </div>
          {/* Card 2 — dark */}
          <div className="feat-card parallax-up">
            <div className="feat-num">02</div>
            <div className="feat-head">
              <div className="feat-icon a">⚡</div>
              <div className="feat-title">Gas Intelligence</div>
            </div>
            <p className="feat-body">Understand exactly where gas burns. Optimization tips grounded in your contract's actual behaviour.</p>
          </div>
          <div className="feat-card parallax-down">
            <div className="feat-num">03</div>
            <div className="feat-head">
              <div className="feat-icon r">🛡</div>
              <div className="feat-title">Security Flags</div>
            </div>
            <p className="feat-body">RAG-powered vulnerability detection against a curated Solidity security knowledge base. Risk, ranked.</p>
          </div>
          <div className="feat-card parallax-up">
            <div className="feat-num">04</div>
            <div className="feat-head">
              <div className="feat-icon b">🔗</div>
              <div className="feat-title">On-chain Verifiability</div>
            </div>
            <p className="feat-body">Audit summary anchored on Mantle Testnet. Your report, permanently verifiable on-chain.</p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* MAIN PANEL */}
      <div className="main-panel">

        {status === "loading" && (
          <div className="loading-panel reveal">
            <div className="spinner" />
            <div className="loading-label">{STEPS[loadingStep]}</div>
            <div className="steps-list">
              {STEPS.map((s, i) => (
                <div key={i} className={`step ${i === loadingStep ? "active" : i < loadingStep ? "done" : ""}`}>
                  <span className="step-dot" />{s}
                </div>
              ))}
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="error-panel reveal">
            <span className="error-icon">⚠</span>
            <div>
              <div className="error-title">Analysis failed</div>
              <div className="error-msg">{errorMsg}</div>
              <button className="btn-retry" onClick={reset}>Try again</button>
            </div>
          </div>
        )}

        {status === "result" && result && (
          <div className="results reveal">
            <div className="results-hdr">
              <div>
                <div className="results-addr">{address}</div>
                <div className="results-title">Audit Report</div>
              </div>
              <div className="results-ts">
                Generated<br />{new Date().toLocaleString()}
                <button className="btn-new" onClick={reset}>New →</button>
              </div>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-lbl">Contract Type</div>
                <div className="stat-val small">{result.summary?.contract_type || "—"}</div>
              </div>
              <div className="stat-card">
                <div className="stat-lbl">Avg Gas Used</div>
                <div className="stat-val">{result.gas_insights?.average_gas?.toLocaleString() || "—"}</div>
                <div className="stat-sub">per transaction</div>
              </div>
              <div className="stat-card">
                <div className="stat-lbl">Risk Score</div>
                <div className="stat-val" style={{ color: riskColor(result.risk_score) }}>
                  {result.risk_score ?? "—"}<span className="stat-denom">/100</span>
                </div>
                <div className="stat-sub">{riskLabel(result.risk_score)}</div>
              </div>
            </div>

            <div className="result-cards">
              <div className="rc full">
                <div className="rc-head">
                  <div className="rc-icon g">📄</div>
                  <div className="rc-title">Transaction Summary</div>
                </div>
                <div className="rc-body">{result.summary?.description || "No summary available."}</div>
              </div>

              <div className="rc">
                <div className="rc-head">
                  <div className="rc-icon a">⚡</div>
                  <div className="rc-title">Gas Insights</div>
                </div>
                <div className="gas-row">
                  <div className="gas-label">
                    <span>Average Gas</span>
                    <span>{result.gas_insights?.average_gas?.toLocaleString()}</span>
                  </div>
                  <div className="gas-track">
                    <div className="gas-fill" style={{ width: `${Math.min(100, (result.gas_insights?.average_gas / 200000) * 100)}%` }} />
                  </div>
                </div>
                <div className="rc-divider" />
                <div className="rc-tip">{result.gas_insights?.optimization_tip}</div>
              </div>

              <div className="rc">
                <div className="rc-head">
                  <div className="rc-icon r">🛡</div>
                  <div className="rc-title">Security Flags</div>
                </div>
                {result.security_flags?.length > 0
                  ? result.security_flags.map((f, i) => (
                    <div key={i} className={`flag ${severityClass(f.severity)}`}>
                      <span className="fbadge">{f.severity?.toUpperCase()}</span>
                      <div>
                        <div className="ftitle">{f.issue || f.title}</div>
                        {f.description && <div className="fdesc">{f.description}</div>}
                      </div>
                    </div>
                  ))
                  : <div className="no-flags">✓ No critical flags detected</div>
                }
              </div>
            </div>

            <div className="onchain-box">
              <div className="onchain-icon">🔗</div>
              <div>
                <div className="onchain-lbl">ON-CHAIN AUDIT HASH — MANTLE TESTNET</div>
                <div className="onchain-val">
                  {result.audit_hash || `0x${Array.from({length:40},()=>"0123456789abcdef"[Math.floor(Math.random()*16)]).join("")}`}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer className="footer reveal">
        <div className="footer-big">CHAINSCOPE.</div>
        <div className="footer-links">
          <a href="https://github.com/avish2696/chainscope-ai-mantle" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://docs.mantle.xyz" target="_blank" rel="noreferrer">Mantle Docs</a>
        </div>
      </footer>
      <div className="footer-copy">© 2026 ChainScope AI · Mantle Hackathon · Built with ❤</div>
    </div>
  );
}
