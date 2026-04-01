import { useState, useEffect, useRef } from "react";

const ELEMENTS = [
  { symbol: "H",  name: "Hydrogen",   atomicNumber: 1,  atomicMass: 1.008,  meltingPoint: -259, reactivity: 7, rarity: 1, outerElectrons: 1, group: "nonmetal",     period: 1, col: 1  },
  { symbol: "He", name: "Helium",     atomicNumber: 2,  atomicMass: 4.003,  meltingPoint: -272, reactivity: 1, rarity: 2, outerElectrons: 2, group: "noble",        period: 1, col: 18 },
  { symbol: "Li", name: "Lithium",    atomicNumber: 3,  atomicMass: 6.941,  meltingPoint: 180,  reactivity: 8, rarity: 4, outerElectrons: 1, group: "alkali",       period: 2, col: 1  },
  { symbol: "Be", name: "Beryllium",  atomicNumber: 4,  atomicMass: 9.012,  meltingPoint: 1287, reactivity: 4, rarity: 5, outerElectrons: 2, group: "alkalineearth",period: 2, col: 2  },
  { symbol: "B",  name: "Boron",      atomicNumber: 5,  atomicMass: 10.81,  meltingPoint: 2075, reactivity: 3, rarity: 5, outerElectrons: 3, group: "metalloid",    period: 2, col: 13 },
  { symbol: "C",  name: "Carbon",     atomicNumber: 6,  atomicMass: 12.011, meltingPoint: 3550, reactivity: 4, rarity: 2, outerElectrons: 4, group: "nonmetal",     period: 2, col: 14 },
  { symbol: "N",  name: "Nitrogen",   atomicNumber: 7,  atomicMass: 14.007, meltingPoint: -210, reactivity: 3, rarity: 1, outerElectrons: 5, group: "nonmetal",     period: 2, col: 15 },
  { symbol: "O",  name: "Oxygen",     atomicNumber: 8,  atomicMass: 15.999, meltingPoint: -218, reactivity: 6, rarity: 1, outerElectrons: 6, group: "nonmetal",     period: 2, col: 16 },
  { symbol: "F",  name: "Fluorine",   atomicNumber: 9,  atomicMass: 18.998, meltingPoint: -220, reactivity: 9, rarity: 4, outerElectrons: 7, group: "halogen",      period: 2, col: 17 },
  { symbol: "Ne", name: "Neon",       atomicNumber: 10, atomicMass: 20.18,  meltingPoint: -249, reactivity: 1, rarity: 3, outerElectrons: 8, group: "noble",        period: 2, col: 18 },
  { symbol: "Na", name: "Sodium",     atomicNumber: 11, atomicMass: 22.99,  meltingPoint: 98,   reactivity: 9, rarity: 2, outerElectrons: 1, group: "alkali",       period: 3, col: 1  },
  { symbol: "Mg", name: "Magnesium",  atomicNumber: 12, atomicMass: 24.305, meltingPoint: 650,  reactivity: 6, rarity: 2, outerElectrons: 2, group: "alkalineearth",period: 3, col: 2  },
  { symbol: "Al", name: "Aluminium",  atomicNumber: 13, atomicMass: 26.982, meltingPoint: 660,  reactivity: 5, rarity: 2, outerElectrons: 3, group: "metal",        period: 3, col: 13 },
  { symbol: "Si", name: "Silicon",    atomicNumber: 14, atomicMass: 28.086, meltingPoint: 1414, reactivity: 3, rarity: 2, outerElectrons: 4, group: "metalloid",    period: 3, col: 14 },
  { symbol: "P",  name: "Phosphorus", atomicNumber: 15, atomicMass: 30.974, meltingPoint: 44,   reactivity: 6, rarity: 3, outerElectrons: 5, group: "nonmetal",     period: 3, col: 15 },
  { symbol: "S",  name: "Sulfur",     atomicNumber: 16, atomicMass: 32.06,  meltingPoint: 113,  reactivity: 5, rarity: 2, outerElectrons: 6, group: "nonmetal",     period: 3, col: 16 },
  { symbol: "Cl", name: "Chlorine",   atomicNumber: 17, atomicMass: 35.45,  meltingPoint: -101, reactivity: 8, rarity: 2, outerElectrons: 7, group: "halogen",      period: 3, col: 17 },
  { symbol: "Ar", name: "Argon",      atomicNumber: 18, atomicMass: 39.948, meltingPoint: -189, reactivity: 1, rarity: 2, outerElectrons: 8, group: "noble",        period: 3, col: 18 },
  { symbol: "K",  name: "Potassium",  atomicNumber: 19, atomicMass: 39.098, meltingPoint: 64,   reactivity: 9, rarity: 2, outerElectrons: 1, group: "alkali",       period: 4, col: 1  },
  { symbol: "Ca", name: "Calcium",    atomicNumber: 20, atomicMass: 40.078, meltingPoint: 842,  reactivity: 7, rarity: 2, outerElectrons: 2, group: "alkalineearth",period: 4, col: 2  },
  { symbol: "Fe", name: "Iron",       atomicNumber: 26, atomicMass: 55.845, meltingPoint: 1538, reactivity: 5, rarity: 2, outerElectrons: 2, group: "metal",        period: 4, col: 8  },
  { symbol: "Cu", name: "Copper",     atomicNumber: 29, atomicMass: 63.546, meltingPoint: 1085, reactivity: 3, rarity: 3, outerElectrons: 1, group: "metal",        period: 4, col: 11 },
  { symbol: "Zn", name: "Zinc",       atomicNumber: 30, atomicMass: 65.38,  meltingPoint: 420,  reactivity: 4, rarity: 3, outerElectrons: 2, group: "metal",        period: 4, col: 12 },
  { symbol: "Br", name: "Bromine",    atomicNumber: 35, atomicMass: 79.904, meltingPoint: -7,   reactivity: 7, rarity: 4, outerElectrons: 7, group: "halogen",      period: 4, col: 17 },
  { symbol: "Kr", name: "Krypton",    atomicNumber: 36, atomicMass: 83.798, meltingPoint: -157, reactivity: 1, rarity: 4, outerElectrons: 8, group: "noble",        period: 4, col: 18 },
  { symbol: "Ag", name: "Silver",     atomicNumber: 47, atomicMass: 107.87, meltingPoint: 962,  reactivity: 2, rarity: 6, outerElectrons: 1, group: "metal",        period: 5, col: 11 },
  { symbol: "I",  name: "Iodine",     atomicNumber: 53, atomicMass: 126.9,  meltingPoint: 114,  reactivity: 5, rarity: 4, outerElectrons: 7, group: "halogen",      period: 5, col: 17 },
  { symbol: "Au", name: "Gold",       atomicNumber: 79, atomicMass: 196.97, meltingPoint: 1064, reactivity: 1, rarity: 8, outerElectrons: 1, group: "metal",        period: 6, col: 11 },
  { symbol: "Hg", name: "Mercury",    atomicNumber: 80, atomicMass: 200.59, meltingPoint: -39,  reactivity: 3, rarity: 6, outerElectrons: 2, group: "metal",        period: 6, col: 12 },
  { symbol: "Pb", name: "Lead",       atomicNumber: 82, atomicMass: 207.2,  meltingPoint: 327,  reactivity: 2, rarity: 3, outerElectrons: 4, group: "metal",        period: 6, col: 14 },
  { symbol: "U",  name: "Uranium",    atomicNumber: 92, atomicMass: 238.03, meltingPoint: 1135, reactivity: 5, rarity: 9, outerElectrons: 2, group: "actinide",     period: 7, col: 6  },
];

const GROUP_COLORS = {
  alkali:       { bg: "#FF6B6B", text: "#fff", label: "Alkali Metal" },
  alkalineearth:{ bg: "#FF9F43", text: "#fff", label: "Alkaline Earth" },
  metal:        { bg: "#48DBFB", text: "#1a1a2e", label: "Transition Metal" },
  metalloid:    { bg: "#1DD1A1", text: "#fff", label: "Metalloid" },
  nonmetal:     { bg: "#54A0FF", text: "#fff", label: "Non-metal" },
  halogen:      { bg: "#5F27CD", text: "#fff", label: "Halogen" },
  noble:        { bg: "#FF6FD8", text: "#fff", label: "Noble Gas" },
  actinide:     { bg: "#00D2D3", text: "#1a1a2e", label: "Actinide" },
};

const RARITY_LABELS = ["","Common","Common","Uncommon","Uncommon","Rare","Rare","Epic","Epic","Legendary"];
const RARITY_COLORS = ["","#aaa","#aaa","#4CAF50","#4CAF50","#2196F3","#2196F3","#9C27B0","#9C27B0","#FF9800"];

function StatBar({ value, max, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 4, height: 8, overflow: "hidden" }}>
      <div style={{
        width: `${(value / max) * 100}%`,
        height: "100%",
        background: color,
        borderRadius: 4,
        transition: "width 0.5s ease"
      }} />
    </div>
  );
}

function ElementCard({ element, onClick, selected, size = "normal" }) {
  const colors = GROUP_COLORS[element.group] || GROUP_COLORS.metal;
  const isSmall = size === "small";
  return (
    <div
      onClick={() => onClick && onClick(element)}
      style={{
        background: `linear-gradient(145deg, ${colors.bg}ee, ${colors.bg}99)`,
        border: selected ? "3px solid #FFD700" : "2px solid rgba(255,255,255,0.3)",
        borderRadius: isSmall ? 8 : 12,
        cursor: onClick ? "pointer" : "default",
        transform: selected ? "scale(1.05) translateY(-4px)" : "scale(1)",
        transition: "all 0.2s ease",
        boxShadow: selected ? "0 8px 24px rgba(255,215,0,0.5)" : "0 4px 12px rgba(0,0,0,0.3)",
        fontFamily: "'Orbitron', monospace",
        color: colors.text,
        userSelect: "none",
        padding: isSmall ? "8px 6px" : "14px 10px",
        width: isSmall ? 70 : 140,
        minWidth: isSmall ? 70 : 140,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Shimmer overlay */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "40%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)",
        borderRadius: isSmall ? "8px 8px 0 0" : "12px 12px 0 0",
        pointerEvents: "none"
      }} />

      <div style={{ fontSize: isSmall ? 8 : 10, opacity: 0.8, marginBottom: 2, letterSpacing: 1 }}>
        #{element.atomicNumber}
      </div>

      <div style={{ fontSize: isSmall ? 22 : 38, fontWeight: 900, lineHeight: 1, textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
        {element.symbol}
      </div>

      <div style={{ fontSize: isSmall ? 7 : 10, fontWeight: 600, marginBottom: isSmall ? 4 : 8, opacity: 0.9, letterSpacing: 0.5 }}>
        {element.name}
      </div>

      {!isSmall && (
        <>
          <div style={{ fontSize: 9, marginBottom: 6, background: "rgba(0,0,0,0.2)", borderRadius: 4, padding: "2px 6px", display: "inline-block" }}>
            {colors.label}
          </div>

          <div style={{ fontSize: 9, display: "flex", flexDirection: "column", gap: 4, marginTop: 4 }}>
            {[
              { label: "⚛️ Atomic No.", value: element.atomicNumber, max: 118, color: "#FFD700" },
              { label: "⚖️ Mass", value: Math.round(element.atomicMass), max: 300, color: "#54A0FF" },
              { label: "⚡ Reactivity", value: element.reactivity, max: 10, color: "#FF6B6B" },
              { label: "🔋 Electrons", value: element.outerElectrons, max: 8, color: "#1DD1A1" },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span>{stat.label}</span>
                  <span style={{ fontWeight: 700 }}>{stat.value}</span>
                </div>
                <StatBar value={stat.value} max={stat.max} color={stat.color} />
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 8, fontSize: 9, fontWeight: 700,
            color: RARITY_COLORS[element.rarity],
            letterSpacing: 1
          }}>
            ✦ {RARITY_LABELS[element.rarity]}
          </div>
        </>
      )}
    </div>
  );
}

function BeakerAnimation({ animationType, isAnimating }) {
  const bubbles = Array.from({ length: 8 }, (_, i) => i);

  const beakerColors = {
    fizz: ["#54A0FF", "#48DBFB"],
    glow: ["#FFD700", "#FF9F43"],
    smoke: ["#636e72", "#b2bec3"],
    explosion: ["#FF6B6B", "#FF9F43"],
    sparkle: ["#FF6FD8", "#5F27CD"],
  };
  const [c1, c2] = beakerColors[animationType] || beakerColors.fizz;

  return (
    <div style={{ position: "relative", width: 100, height: 130, margin: "0 auto" }}>
      {/* Beaker body */}
      <svg width="100" height="130" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="liquidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} stopOpacity="0.9" />
            <stop offset="100%" stopColor={c2} stopOpacity="0.7" />
          </linearGradient>
          <clipPath id="beakerClip">
            <path d="M25 20 L25 95 Q25 110 40 115 L60 115 Q75 110 75 95 L75 20 Z" />
          </clipPath>
        </defs>

        {/* Liquid fill */}
        <rect x="26" y={isAnimating ? 45 : 65} width="48" height="70"
          fill="url(#liquidGrad)" clipPath="url(#beakerClip)"
          style={{ transition: "y 0.5s ease" }}
        />

        {/* Beaker outline */}
        <path d="M25 20 L25 95 Q25 110 40 115 L60 115 Q75 110 75 95 L75 20"
          fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinejoin="round" />
        <line x1="20" y1="20" x2="80" y2="20" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" />
        <line x1="20" y1="20" x2="25" y2="20" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" />
        <line x1="75" y1="20" x2="80" y2="20" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" />

        {/* Measurement lines */}
        {[40, 55, 70, 85].map(y => (
          <line key={y} x1="72" y1={y} x2="76" y2={y} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
        ))}
      </svg>

      {/* Bubbles */}
      {isAnimating && bubbles.map(i => (
        <div key={i} style={{
          position: "absolute",
          bottom: 20 + Math.random() * 40,
          left: 30 + (i * 7),
          width: 4 + (i % 3) * 3,
          height: 4 + (i % 3) * 3,
          borderRadius: "50%",
          background: c1,
          opacity: 0.7,
          animation: `bubble ${0.8 + i * 0.2}s ease-in infinite`,
          animationDelay: `${i * 0.15}s`,
          pointerEvents: "none",
        }} />
      ))}

      {/* Explosion sparks */}
      {isAnimating && animationType === "explosion" && [0,45,90,135,180,225,270,315].map((angle, i) => (
        <div key={i} style={{
          position: "absolute",
          top: 10,
          left: 50,
          width: 3,
          height: 20,
          background: "#FFD700",
          transformOrigin: "bottom center",
          transform: `rotate(${angle}deg)`,
          animation: `spark 0.6s ease-out infinite`,
          animationDelay: `${i * 0.07}s`,
          borderRadius: 2,
          opacity: 0.8,
        }} />
      ))}
    </div>
  );
}

function ResultCard({ result, onClose }) {
  const dangerConfig = {
    safe:    { bg: "#1DD1A1", icon: "✅", label: "Safe Compound" },
    warning: { bg: "#FF9F43", icon: "⚠️", label: "Handle with Care!" },
    danger:  { bg: "#FF6B6B", icon: "💀", label: "DO NOT MAKE THIS!" },
  };
  const dc = dangerConfig[result.dangerLevel] || dangerConfig.safe;

  return (
    <div style={{
      background: "linear-gradient(145deg, #1a1a3e, #16213e)",
      border: `3px solid ${dc.bg}`,
      borderRadius: 16,
      padding: 20,
      fontFamily: "'Orbitron', monospace",
      color: "#fff",
      maxWidth: 320,
      boxShadow: `0 0 40px ${dc.bg}66`,
      animation: "slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    }}>
      {/* Danger banner */}
      <div style={{
        background: dc.bg,
        borderRadius: 8,
        padding: "8px 12px",
        marginBottom: 12,
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: 1,
        display: "flex",
        alignItems: "center",
        gap: 6,
      }}>
        <span style={{ fontSize: 16 }}>{dc.icon}</span>
        {dc.label}
      </div>

      <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 4, color: dc.bg }}>
        {result.compoundName}
      </div>
      <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 16, letterSpacing: 1 }}>
        {result.formula}
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
        {[
          { label: "💥 Explosive Power", value: result.explosivePower, max: 10, color: "#FF6B6B" },
          { label: "☠️ Toxicity", value: result.toxicity, max: 10, color: "#FF9F43" },
          { label: "🌡️ Boiling Pt °C", value: result.boilingPoint, max: 4000, color: "#48DBFB" },
          { label: "⭐ Coolness", value: result.coolnessFactor, max: 10, color: "#FFD700" },
        ].map(stat => (
          <div key={stat.label} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: "8px 10px" }}>
            <div style={{ fontSize: 8, opacity: 0.7, marginBottom: 4 }}>{stat.label}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: stat.color, marginBottom: 4 }}>
              {stat.value}
            </div>
            <StatBar value={Math.min(stat.value, stat.max)} max={stat.max} color={stat.color} />
          </div>
        ))}
      </div>

      {/* Discovery year */}
      <div style={{ fontSize: 9, opacity: 0.6, marginBottom: 10 }}>
        🔬 First discovered: {result.discoveryYear} &nbsp;|&nbsp; 🌍 {result.realWorldUse}
      </div>

      {/* Fun fact */}
      <div style={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 8,
        padding: "10px 12px",
        fontSize: 10,
        lineHeight: 1.6,
        borderLeft: `3px solid ${dc.bg}`,
      }}>
        <span style={{ opacity: 0.6, letterSpacing: 1 }}>FUN FACT: </span>
        {result.funFact}
      </div>

      <button onClick={onClose} style={{
        marginTop: 14,
        width: "100%",
        padding: "10px",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: 8,
        color: "#fff",
        fontFamily: "'Orbitron', monospace",
        fontSize: 10,
        letterSpacing: 1,
        cursor: "pointer",
        transition: "background 0.2s",
      }}
        onMouseOver={e => e.target.style.background = "rgba(255,255,255,0.2)"}
        onMouseOut={e => e.target.style.background = "rgba(255,255,255,0.1)"}
      >
        🧪 MIX AGAIN
      </button>
    </div>
  );
}

export default function App() {
  const [selectedElements, setSelectedElements] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animType, setAnimType] = useState("fizz");
  const [filter, setFilter] = useState("all");
  const [hoveredElement, setHoveredElement] = useState(null);

  const filteredElements = filter === "all" ? ELEMENTS : ELEMENTS.filter(e => e.group === filter);

  const toggleElement = (el) => {
    if (result) return;
    setSelectedElements(prev => {
      if (prev.find(e => e.symbol === el.symbol)) {
        return prev.filter(e => e.symbol !== el.symbol);
      }
      if (prev.length >= 4) return prev;
      return [...prev, el];
    });
  };

  const combineElements = async () => {
    if (selectedElements.length < 2) return;
    setLoading(true);
    setIsAnimating(true);

    const elementNames = selectedElements.map(e => `${e.name} (${e.symbol})`).join(", ");

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are a chemistry explainer for kids aged 8-12. When given a list of chemical elements, respond ONLY with a valid JSON object (no markdown, no backticks, no preamble). The JSON must have these exact fields:
{
  "compoundName": "common name of the main compound these elements make, or a creative name if no real compound exists",
  "formula": "chemical formula or best guess",
  "dangerLevel": "safe" | "warning" | "danger",
  "animationType": "fizz" | "glow" | "smoke" | "explosion" | "sparkle",
  "explosivePower": number 1-10,
  "toxicity": number 1-10,
  "boilingPoint": number in celsius,
  "coolnessFactor": number 1-10,
  "discoveryYear": year as string e.g. "1774" or "Ancient times",
  "realWorldUse": "one short example use in the real world",
  "funFact": "one fascinating kid-friendly fact about this compound or the reaction, max 2 sentences"
}

IMPORTANT: If the combination would make something genuinely dangerous (chlorine gas, explosives, toxic compounds), set dangerLevel to "danger" and animationType to "explosion" or "smoke", and make the funFact explain why it's dangerous in an exciting way. Safe things like water or salt should be dangerLevel "safe". Be educational and exciting!`,
          messages: [{ role: "user", content: `What happens when you combine: ${elementNames}?` }]
        })
      });

      const data = await response.json();
      const text = data.content?.find(b => b.type === "text")?.text || "{}";
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setAnimType(parsed.animationType || "fizz");
      setTimeout(() => {
        setResult(parsed);
        setLoading(false);
      }, 1500);
    } catch (e) {
      setLoading(false);
      setIsAnimating(false);
      alert("Something went wrong mixing those elements! Try again.");
    }
  };

  const reset = () => {
    setResult(null);
    setSelectedElements([]);
    setIsAnimating(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Orbitron', monospace",
      padding: "20px 16px",
      color: "#fff",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        @keyframes bubble {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          100% { transform: translateY(-60px) scale(0.3); opacity: 0; }
        }
        @keyframes spark {
          0% { transform: rotate(var(--r)) scaleY(1); opacity: 0.9; }
          100% { transform: rotate(var(--r)) scaleY(0); opacity: 0; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255,215,0,0.4); }
          50% { box-shadow: 0 0 40px rgba(255,215,0,0.8); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .element-pill:hover { transform: translateY(-2px); filter: brightness(1.2); }
        .combine-btn:hover { background: linear-gradient(135deg, #FFD700, #FF9F43) !important; transform: scale(1.03); }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 10, letterSpacing: 4, opacity: 0.5, marginBottom: 4 }}>⚗️ WELCOME TO</div>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0, letterSpacing: 2,
          background: "linear-gradient(135deg, #FFD700, #FF6FD8, #54A0FF)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
        }}>
          ELEMENT ALCHEMY
        </h1>
        <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4, letterSpacing: 2 }}>
          PICK ELEMENTS • COMBINE • DISCOVER
        </div>
      </div>

      {/* Main layout */}
      <div style={{ display: "flex", gap: 16, maxWidth: 960, margin: "0 auto", alignItems: "flex-start", flexWrap: "wrap" }}>

        {/* Left: Periodic table */}
        <div style={{ flex: "1 1 500px" }}>

          {/* Group filter */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {[["all", "#fff", "#333", "All"], ...Object.entries(GROUP_COLORS).map(([k, v]) => [k, v.bg, v.text, v.label.split(" ")[0]])].map(([key, bg, text, label]) => (
              <button key={key}
                onClick={() => setFilter(key)}
                className="element-pill"
                style={{
                  padding: "4px 10px",
                  borderRadius: 20,
                  border: filter === key ? "2px solid #FFD700" : "1px solid rgba(255,255,255,0.2)",
                  background: filter === key ? bg : "rgba(255,255,255,0.08)",
                  color: filter === key ? text : "#fff",
                  fontSize: 9,
                  cursor: "pointer",
                  fontFamily: "'Orbitron', monospace",
                  letterSpacing: 0.5,
                  transition: "all 0.2s",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Element grid */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            padding: 12,
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            {filteredElements.map(el => {
              const colors = GROUP_COLORS[el.group] || GROUP_COLORS.metal;
              const isSelected = selectedElements.find(e => e.symbol === el.symbol);
              return (
                <div
                  key={el.symbol}
                  onClick={() => toggleElement(el)}
                  onMouseEnter={() => setHoveredElement(el)}
                  onMouseLeave={() => setHoveredElement(null)}
                  style={{
                    width: 52,
                    height: 58,
                    background: isSelected
                      ? `linear-gradient(145deg, ${colors.bg}, ${colors.bg}cc)`
                      : `linear-gradient(145deg, ${colors.bg}44, ${colors.bg}22)`,
                    border: isSelected ? "2px solid #FFD700" : `1px solid ${colors.bg}66`,
                    borderRadius: 8,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.15s ease",
                    transform: isSelected ? "scale(1.08) translateY(-2px)" : "scale(1)",
                    boxShadow: isSelected ? `0 4px 16px ${colors.bg}88` : "none",
                  }}
                >
                  <div style={{ fontSize: 7, opacity: 0.7, color: colors.text }}>{el.atomicNumber}</div>
                  <div style={{ fontSize: 18, fontWeight: 900, color: isSelected ? colors.text : "#fff", lineHeight: 1 }}>{el.symbol}</div>
                  <div style={{ fontSize: 6, opacity: 0.8, color: isSelected ? colors.text : "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.2 }}>{el.name}</div>
                </div>
              );
            })}
          </div>

          {/* Hover tooltip */}
          {hoveredElement && !selectedElements.find(e => e.symbol === hoveredElement.symbol) && (
            <div style={{
              marginTop: 8,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 9,
              opacity: 0.8,
              letterSpacing: 0.5,
            }}>
              {hoveredElement.name} · Reactivity {hoveredElement.reactivity}/10 · {RARITY_LABELS[hoveredElement.rarity]} · {GROUP_COLORS[hoveredElement.group]?.label}
            </div>
          )}
        </div>

        {/* Right: Beaker + selected + result */}
        <div style={{ flex: "0 0 200px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>

          {/* Selected elements as mini cards */}
          <div style={{ width: "100%" }}>
            <div style={{ fontSize: 9, letterSpacing: 2, opacity: 0.5, marginBottom: 8, textAlign: "center" }}>
              SELECTED ({selectedElements.length}/4)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", minHeight: 40 }}>
              {selectedElements.map(el => {
                const colors = GROUP_COLORS[el.group] || GROUP_COLORS.metal;
                return (
                  <div key={el.symbol}
                    onClick={() => toggleElement(el)}
                    style={{
                      background: `linear-gradient(145deg, ${colors.bg}, ${colors.bg}aa)`,
                      borderRadius: 8,
                      padding: "6px 10px",
                      fontSize: 14,
                      fontWeight: 900,
                      color: colors.text,
                      cursor: "pointer",
                      border: "2px solid rgba(255,255,255,0.3)",
                      animation: "float 2s ease-in-out infinite",
                    }}
                  >
                    {el.symbol}
                    <span style={{ fontSize: 7, opacity: 0.7, display: "block", textAlign: "center" }}>✕</span>
                  </div>
                );
              })}
              {selectedElements.length === 0 && (
                <div style={{ fontSize: 9, opacity: 0.3, letterSpacing: 1, textAlign: "center", paddingTop: 10 }}>
                  TAP ELEMENTS TO SELECT
                </div>
              )}
            </div>
          </div>

          {/* Beaker */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            borderRadius: 16,
            padding: 20,
            border: "1px solid rgba(255,255,255,0.1)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            <BeakerAnimation animationType={animType} isAnimating={isAnimating} />

            <button
              className="combine-btn"
              onClick={result ? reset : combineElements}
              disabled={loading || (!result && selectedElements.length < 2)}
              style={{
                marginTop: 16,
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                background: result
                  ? "linear-gradient(135deg, #1DD1A1, #00b894)"
                  : selectedElements.length >= 2
                  ? "linear-gradient(135deg, #54A0FF, #5F27CD)"
                  : "rgba(255,255,255,0.1)",
                color: "#fff",
                fontFamily: "'Orbitron', monospace",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                cursor: selectedElements.length >= 2 || result ? "pointer" : "not-allowed",
                width: "100%",
                transition: "all 0.2s",
                opacity: loading ? 0.7 : 1,
                animation: selectedElements.length >= 2 && !result && !loading ? "pulse 2s infinite" : "none",
              }}
            >
              {loading ? "⚗️ MIXING..." : result ? "🔄 MIX AGAIN" : selectedElements.length >= 2 ? "⚗️ COMBINE!" : `SELECT ${2 - selectedElements.length} MORE`}
            </button>
          </div>

          {/* Result card */}
          {result && !loading && (
            <ResultCard result={result} onClose={reset} />
          )}
        </div>
      </div>
    </div>
  );
}
