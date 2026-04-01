import { useState } from "react";
import compoundData from "../public/compounds.json";

const { compounds, compatibility } = compoundData;

const ELEMENTS = [
  { symbol: "H",  name: "Hydrogen",   atomicNumber: 1,  atomicMass: 1.008,  meltingPoint: -259, reactivity: 7, rarity: 1, outerElectrons: 1, group: "nonmetal"      },
  { symbol: "He", name: "Helium",     atomicNumber: 2,  atomicMass: 4.003,  meltingPoint: -272, reactivity: 1, rarity: 2, outerElectrons: 2, group: "noble"         },
  { symbol: "Li", name: "Lithium",    atomicNumber: 3,  atomicMass: 6.941,  meltingPoint: 180,  reactivity: 8, rarity: 4, outerElectrons: 1, group: "alkali"        },
  { symbol: "Be", name: "Beryllium",  atomicNumber: 4,  atomicMass: 9.012,  meltingPoint: 1287, reactivity: 4, rarity: 5, outerElectrons: 2, group: "alkalineearth" },
  { symbol: "B",  name: "Boron",      atomicNumber: 5,  atomicMass: 10.81,  meltingPoint: 2075, reactivity: 3, rarity: 5, outerElectrons: 3, group: "metalloid"     },
  { symbol: "C",  name: "Carbon",     atomicNumber: 6,  atomicMass: 12.011, meltingPoint: 3550, reactivity: 4, rarity: 2, outerElectrons: 4, group: "nonmetal"      },
  { symbol: "N",  name: "Nitrogen",   atomicNumber: 7,  atomicMass: 14.007, meltingPoint: -210, reactivity: 3, rarity: 1, outerElectrons: 5, group: "nonmetal"      },
  { symbol: "O",  name: "Oxygen",     atomicNumber: 8,  atomicMass: 15.999, meltingPoint: -218, reactivity: 6, rarity: 1, outerElectrons: 6, group: "nonmetal"      },
  { symbol: "F",  name: "Fluorine",   atomicNumber: 9,  atomicMass: 18.998, meltingPoint: -220, reactivity: 9, rarity: 4, outerElectrons: 7, group: "halogen"       },
  { symbol: "Ne", name: "Neon",       atomicNumber: 10, atomicMass: 20.18,  meltingPoint: -249, reactivity: 1, rarity: 3, outerElectrons: 8, group: "noble"         },
  { symbol: "Na", name: "Sodium",     atomicNumber: 11, atomicMass: 22.99,  meltingPoint: 98,   reactivity: 9, rarity: 2, outerElectrons: 1, group: "alkali"        },
  { symbol: "Mg", name: "Magnesium",  atomicNumber: 12, atomicMass: 24.305, meltingPoint: 650,  reactivity: 6, rarity: 2, outerElectrons: 2, group: "alkalineearth" },
  { symbol: "Al", name: "Aluminium",  atomicNumber: 13, atomicMass: 26.982, meltingPoint: 660,  reactivity: 5, rarity: 2, outerElectrons: 3, group: "metal"         },
  { symbol: "Si", name: "Silicon",    atomicNumber: 14, atomicMass: 28.086, meltingPoint: 1414, reactivity: 3, rarity: 2, outerElectrons: 4, group: "metalloid"     },
  { symbol: "P",  name: "Phosphorus", atomicNumber: 15, atomicMass: 30.974, meltingPoint: 44,   reactivity: 6, rarity: 3, outerElectrons: 5, group: "nonmetal"      },
  { symbol: "S",  name: "Sulfur",     atomicNumber: 16, atomicMass: 32.06,  meltingPoint: 113,  reactivity: 5, rarity: 2, outerElectrons: 6, group: "nonmetal"      },
  { symbol: "Cl", name: "Chlorine",   atomicNumber: 17, atomicMass: 35.45,  meltingPoint: -101, reactivity: 8, rarity: 2, outerElectrons: 7, group: "halogen"       },
  { symbol: "Ar", name: "Argon",      atomicNumber: 18, atomicMass: 39.948, meltingPoint: -189, reactivity: 1, rarity: 2, outerElectrons: 8, group: "noble"         },
  { symbol: "K",  name: "Potassium",  atomicNumber: 19, atomicMass: 39.098, meltingPoint: 64,   reactivity: 9, rarity: 2, outerElectrons: 1, group: "alkali"        },
  { symbol: "Ca", name: "Calcium",    atomicNumber: 20, atomicMass: 40.078, meltingPoint: 842,  reactivity: 7, rarity: 2, outerElectrons: 2, group: "alkalineearth" },
  { symbol: "Ti", name: "Titanium",   atomicNumber: 22, atomicMass: 47.867, meltingPoint: 1668, reactivity: 4, rarity: 4, outerElectrons: 2, group: "metal"         },
  { symbol: "V",  name: "Vanadium",   atomicNumber: 23, atomicMass: 50.942, meltingPoint: 1910, reactivity: 4, rarity: 5, outerElectrons: 2, group: "metal"         },
  { symbol: "Cr", name: "Chromium",   atomicNumber: 24, atomicMass: 51.996, meltingPoint: 1907, reactivity: 4, rarity: 4, outerElectrons: 1, group: "metal"         },
  { symbol: "Mn", name: "Manganese",  atomicNumber: 25, atomicMass: 54.938, meltingPoint: 1246, reactivity: 4, rarity: 4, outerElectrons: 2, group: "metal"         },
  { symbol: "Fe", name: "Iron",       atomicNumber: 26, atomicMass: 55.845, meltingPoint: 1538, reactivity: 5, rarity: 2, outerElectrons: 2, group: "metal"         },
  { symbol: "Co", name: "Cobalt",     atomicNumber: 27, atomicMass: 58.933, meltingPoint: 1495, reactivity: 4, rarity: 5, outerElectrons: 2, group: "metal"         },
  { symbol: "Ni", name: "Nickel",     atomicNumber: 28, atomicMass: 58.693, meltingPoint: 1455, reactivity: 3, rarity: 4, outerElectrons: 2, group: "metal"         },
  { symbol: "Cu", name: "Copper",     atomicNumber: 29, atomicMass: 63.546, meltingPoint: 1085, reactivity: 3, rarity: 3, outerElectrons: 1, group: "metal"         },
  { symbol: "Zn", name: "Zinc",       atomicNumber: 30, atomicMass: 65.38,  meltingPoint: 420,  reactivity: 4, rarity: 3, outerElectrons: 2, group: "metal"         },
  { symbol: "As", name: "Arsenic",    atomicNumber: 33, atomicMass: 74.922, meltingPoint: 817,  reactivity: 4, rarity: 5, outerElectrons: 5, group: "metalloid"     },
  { symbol: "Br", name: "Bromine",    atomicNumber: 35, atomicMass: 79.904, meltingPoint: -7,   reactivity: 7, rarity: 4, outerElectrons: 7, group: "halogen"       },
  { symbol: "Sr", name: "Strontium",  atomicNumber: 38, atomicMass: 87.62,  meltingPoint: 777,  reactivity: 7, rarity: 4, outerElectrons: 2, group: "alkalineearth" },
  { symbol: "Ag", name: "Silver",     atomicNumber: 47, atomicMass: 107.87, meltingPoint: 962,  reactivity: 2, rarity: 6, outerElectrons: 1, group: "metal"         },
  { symbol: "Sn", name: "Tin",        atomicNumber: 50, atomicMass: 118.71, meltingPoint: 232,  reactivity: 3, rarity: 3, outerElectrons: 4, group: "metal"         },
  { symbol: "I",  name: "Iodine",     atomicNumber: 53, atomicMass: 126.9,  meltingPoint: 114,  reactivity: 5, rarity: 4, outerElectrons: 7, group: "halogen"       },
  { symbol: "Xe", name: "Xenon",      atomicNumber: 54, atomicMass: 131.29, meltingPoint: -112, reactivity: 1, rarity: 7, outerElectrons: 8, group: "noble"         },
  { symbol: "Ba", name: "Barium",     atomicNumber: 56, atomicMass: 137.33, meltingPoint: 727,  reactivity: 7, rarity: 4, outerElectrons: 2, group: "alkalineearth" },
  { symbol: "W",  name: "Tungsten",   atomicNumber: 74, atomicMass: 183.84, meltingPoint: 3422, reactivity: 2, rarity: 6, outerElectrons: 2, group: "metal"         },
  { symbol: "Pt", name: "Platinum",   atomicNumber: 78, atomicMass: 195.08, meltingPoint: 1768, reactivity: 1, rarity: 8, outerElectrons: 1, group: "metal"         },
  { symbol: "Au", name: "Gold",       atomicNumber: 79, atomicMass: 196.97, meltingPoint: 1064, reactivity: 1, rarity: 8, outerElectrons: 1, group: "metal"         },
  { symbol: "Hg", name: "Mercury",    atomicNumber: 80, atomicMass: 200.59, meltingPoint: -39,  reactivity: 3, rarity: 6, outerElectrons: 2, group: "metal"         },
  { symbol: "Pb", name: "Lead",       atomicNumber: 82, atomicMass: 207.2,  meltingPoint: 327,  reactivity: 2, rarity: 3, outerElectrons: 4, group: "metal"         },
  { symbol: "Bi", name: "Bismuth",    atomicNumber: 83, atomicMass: 208.98, meltingPoint: 271,  reactivity: 2, rarity: 5, outerElectrons: 5, group: "metal"         },
  { symbol: "U",  name: "Uranium",    atomicNumber: 92, atomicMass: 238.03, meltingPoint: 1135, reactivity: 5, rarity: 9, outerElectrons: 2, group: "actinide"      },
];

const GROUP_COLORS = {
  alkali:        { bg: "#FF6B6B", text: "#fff",    label: "Alkali Metal"     },
  alkalineearth: { bg: "#FF9F43", text: "#fff",    label: "Alkaline Earth"   },
  metal:         { bg: "#48DBFB", text: "#1a1a2e", label: "Transition Metal" },
  metalloid:     { bg: "#1DD1A1", text: "#fff",    label: "Metalloid"        },
  nonmetal:      { bg: "#54A0FF", text: "#fff",    label: "Non-metal"        },
  halogen:       { bg: "#5F27CD", text: "#fff",    label: "Halogen"          },
  noble:         { bg: "#FF6FD8", text: "#fff",    label: "Noble Gas"        },
  actinide:      { bg: "#00D2D3", text: "#1a1a2e", label: "Actinide"         },
};

const RARITY_LABELS = ["","Common","Common","Uncommon","Uncommon","Rare","Rare","Epic","Epic","Legendary"];

function findCompound(selection) {
  const selCount = {};
  selection.forEach(s => { selCount[s] = (selCount[s] || 0) + 1; });
  const selKeys = Object.keys(selCount).sort();
  return compounds.find(c => {
    const cKeys = Object.keys(c.elements).sort();
    if (cKeys.length !== selKeys.length) return false;
    return selKeys.every(k => c.elements[k] === selCount[k]);
  }) || null;
}

function getValidNextElements(selection) {
  if (selection.length === 0) return new Set(Object.keys(compatibility));
  const syms = [...new Set(selection)];
  let valid = new Set(compatibility[syms[0]] || []);
  syms.slice(1).forEach(s => {
    const p = new Set(compatibility[s] || []);
    valid = new Set([...valid].filter(x => p.has(x)));
  });
  syms.forEach(s => valid.add(s));
  return valid;
}

function StatBar({ value, max, color }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 4, height: 8, overflow: "hidden" }}>
      <div style={{ width: `${Math.min((value/max)*100,100)}%`, height: "100%", background: color, borderRadius: 4, transition: "width 0.5s ease" }} />
    </div>
  );
}

function BeakerAnimation({ animationType, isAnimating }) {
  const cols = { fizz:["#54A0FF","#48DBFB"], glow:["#FFD700","#FF9F43"], smoke:["#636e72","#b2bec3"], explosion:["#FF6B6B","#FF9F43"], sparkle:["#FF6FD8","#5F27CD"] };
  const [c1, c2] = cols[animationType] || cols.fizz;
  return (
    <div style={{ position:"relative", width:100, height:130, margin:"0 auto" }}>
      <svg width="100" height="130" viewBox="0 0 100 130">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c1} stopOpacity="0.9"/>
            <stop offset="100%" stopColor={c2} stopOpacity="0.7"/>
          </linearGradient>
          <clipPath id="bc"><path d="M25 20 L25 95 Q25 110 40 115 L60 115 Q75 110 75 95 L75 20 Z"/></clipPath>
        </defs>
        <rect x="26" y={isAnimating?45:65} width="48" height="70" fill="url(#lg)" clipPath="url(#bc)" style={{transition:"y 0.5s ease"}}/>
        <path d="M25 20 L25 95 Q25 110 40 115 L60 115 Q75 110 75 95 L75 20" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinejoin="round"/>
        <line x1="20" y1="20" x2="80" y2="20" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5"/>
        {[40,55,70,85].map(y=><line key={y} x1="72" y1={y} x2="76" y2={y} stroke="rgba(255,255,255,0.4)" strokeWidth="1"/>)}
      </svg>
      {isAnimating && Array.from({length:8},(_,i)=>(
        <div key={i} style={{position:"absolute",bottom:20+(i%4)*10,left:30+(i*7),width:4+(i%3)*3,height:4+(i%3)*3,borderRadius:"50%",background:c1,opacity:0.7,animation:`bubble ${0.8+i*0.2}s ease-in infinite`,animationDelay:`${i*0.15}s`}}/>
      ))}
      {isAnimating && animationType==="explosion" && [0,45,90,135,180,225,270,315].map((angle,i)=>(
        <div key={i} style={{position:"absolute",top:10,left:50,width:3,height:20,background:"#FFD700",transformOrigin:"bottom center",transform:`rotate(${angle}deg)`,animation:`spark 0.6s ease-out infinite`,animationDelay:`${i*0.07}s`,borderRadius:2,opacity:0.8}}/>
      ))}
    </div>
  );
}

function ResultCard({ result, onClose }) {
  const dc = {safe:{bg:"#1DD1A1",icon:"✅",label:"Safe Compound"},warning:{bg:"#FF9F43",icon:"⚠️",label:"Handle with Care!"},danger:{bg:"#FF6B6B",icon:"💀",label:"DO NOT MAKE THIS!"}}[result.dangerLevel] || {bg:"#1DD1A1",icon:"✅",label:"Safe"};
  return (
    <div style={{background:"linear-gradient(145deg,#1a1a3e,#16213e)",border:`3px solid ${dc.bg}`,borderRadius:16,padding:20,fontFamily:"'Orbitron',monospace",color:"#fff",maxWidth:320,boxShadow:`0 0 40px ${dc.bg}66`,animation:"slideIn 0.4s cubic-bezier(0.175,0.885,0.32,1.275)"}}>
      <div style={{background:dc.bg,borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:11,fontWeight:700,letterSpacing:1,display:"flex",alignItems:"center",gap:6}}>
        <span style={{fontSize:16}}>{dc.icon}</span>{dc.label}
      </div>
      {result.dangerLevel==="danger" && result.dangerWarning && (
        <div style={{background:"rgba(255,107,107,0.2)",border:"1px solid #FF6B6B",borderRadius:8,padding:"8px 12px",marginBottom:12,fontSize:10,lineHeight:1.5,color:"#FF6B6B",fontWeight:700}}>
          ⚡ {result.dangerWarning}
        </div>
      )}
      <div style={{fontSize:22,fontWeight:900,marginBottom:4,color:dc.bg}}>{result.commonName}</div>
      <div style={{fontSize:10,opacity:0.6,marginBottom:16,letterSpacing:1}}>{result.formula}</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:14}}>
        {[{label:"💥 Explosive Power",value:result.explosivePower,max:10,color:"#FF6B6B"},{label:"☠️ Toxicity",value:result.toxicity,max:10,color:"#FF9F43"},{label:"🌡️ Boiling Pt °C",value:result.boilingPoint,max:4000,color:"#48DBFB"},{label:"⭐ Coolness",value:result.coolnessFactor,max:10,color:"#FFD700"}].map(s=>(
          <div key={s.label} style={{background:"rgba(255,255,255,0.06)",borderRadius:8,padding:"8px 10px"}}>
            <div style={{fontSize:8,opacity:0.7,marginBottom:4}}>{s.label}</div>
            <div style={{fontSize:16,fontWeight:700,color:s.color,marginBottom:4}}>{s.value}</div>
            <StatBar value={Math.min(s.value,s.max)} max={s.max} color={s.color}/>
          </div>
        ))}
      </div>
      <div style={{fontSize:9,opacity:0.6,marginBottom:10}}>🔬 Discovered: {result.discoveryYear} &nbsp;|&nbsp; 🌍 {result.realWorldUse}</div>
      <div style={{background:"rgba(255,255,255,0.05)",borderRadius:8,padding:"10px 12px",fontSize:10,lineHeight:1.6,borderLeft:`3px solid ${dc.bg}`}}>
        <span style={{opacity:0.6,letterSpacing:1}}>FUN FACT: </span>{result.funFact}
      </div>
      <button onClick={onClose} style={{marginTop:14,width:"100%",padding:"10px",background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.2)",borderRadius:8,color:"#fff",fontFamily:"'Orbitron',monospace",fontSize:10,letterSpacing:1,cursor:"pointer"}}
        onMouseOver={e=>e.target.style.background="rgba(255,255,255,0.2)"}
        onMouseOut={e=>e.target.style.background="rgba(255,255,255,0.1)"}>
        🧪 MIX AGAIN
      </button>
    </div>
  );
}

export default function App() {
  const [selection, setSelection] = useState([]);
  const [result, setResult]       = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animType, setAnimType]   = useState("fizz");
  const [filter, setFilter]       = useState("all");
  const [hoveredEl, setHoveredEl] = useState(null);
  const [noMatch, setNoMatch]     = useState(false);

  const validNext = getValidNextElements(selection);
  const selectedSymbols = [...new Set(selection)];
  const countOf = sym => selection.filter(s => s === sym).length;

  const addEl = (el) => {
    if (result || selection.length >= 6) return;
    setSelection(p => [...p, el.symbol]);
    setNoMatch(false);
  };

  const removeOne = (sym) => {
    if (result) return;
    const arr = [...selection];
    const idx = arr.lastIndexOf(sym);
    if (idx !== -1) arr.splice(idx, 1);
    setSelection(arr);
    setNoMatch(false);
  };

  const combine = () => {
    if (selection.length < 2) return;
    const match = findCompound(selection);
    if (match) {
      setAnimType(match.animationType || "fizz");
      setIsAnimating(true);
      setNoMatch(false);
      setTimeout(() => setResult(match), 1400);
    } else {
      setNoMatch(true);
    }
  };

  const reset = () => { setResult(null); setSelection([]); setIsAnimating(false); setNoMatch(false); };

  const filteredEls = filter === "all" ? ELEMENTS : ELEMENTS.filter(e => e.group === filter);

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)",fontFamily:"'Orbitron',monospace",padding:"20px 16px",color:"#fff"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        @keyframes bubble { 0%{transform:translateY(0) scale(1);opacity:0.7} 100%{transform:translateY(-60px) scale(0.3);opacity:0} }
        @keyframes spark  { 0%{scaleY:1;opacity:0.9} 100%{scaleY:0;opacity:0} }
        @keyframes slideIn{ from{opacity:0;transform:scale(0.8) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pulse  { 0%,100%{box-shadow:0 0 20px rgba(255,215,0,0.4)} 50%{box-shadow:0 0 40px rgba(255,215,0,0.8)} }
        @keyframes float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes shake  { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-6px)} 75%{transform:translateX(6px)} }
      `}</style>

      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:10,letterSpacing:4,opacity:0.5,marginBottom:4}}>⚗️ WELCOME TO</div>
        <h1 style={{fontSize:28,fontWeight:900,margin:0,letterSpacing:2,background:"linear-gradient(135deg,#FFD700,#FF6FD8,#54A0FF)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
          ELEMENT ALCHEMY
        </h1>
        <div style={{fontSize:9,opacity:0.5,marginTop:4,letterSpacing:2}}>PICK ELEMENTS • BUILD YOUR FORMULA • DISCOVER</div>
      </div>

      <div style={{display:"flex",gap:16,maxWidth:960,margin:"0 auto",alignItems:"flex-start",flexWrap:"wrap"}}>

        {/* LEFT: Table */}
        <div style={{flex:"1 1 500px"}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            {[["all","#fff","#333","All"],...Object.entries(GROUP_COLORS).map(([k,v])=>[k,v.bg,v.text,v.label.split(" ")[0]])].map(([key,bg,text,label])=>(
              <button key={key} onClick={()=>setFilter(key)} style={{padding:"4px 10px",borderRadius:20,border:filter===key?"2px solid #FFD700":"1px solid rgba(255,255,255,0.2)",background:filter===key?bg:"rgba(255,255,255,0.08)",color:filter===key?text:"#fff",fontSize:9,cursor:"pointer",fontFamily:"'Orbitron',monospace",letterSpacing:0.5,transition:"all 0.2s"}}>
                {label}
              </button>
            ))}
          </div>

          <div style={{display:"flex",flexWrap:"wrap",gap:6,background:"rgba(255,255,255,0.03)",borderRadius:12,padding:12,border:"1px solid rgba(255,255,255,0.08)"}}>
            {filteredEls.map(el => {
              const colors = GROUP_COLORS[el.group] || GROUP_COLORS.metal;
              const cnt    = countOf(el.symbol);
              const isSelected = cnt > 0;
              const isValid    = validNext.has(el.symbol);
              const disabled   = !isValid || selection.length >= 6 || !!result;
              return (
                <div key={el.symbol}
                  onClick={()=>!disabled && addEl(el)}
                  onMouseEnter={()=>setHoveredEl(el)}
                  onMouseLeave={()=>setHoveredEl(null)}
                  style={{width:52,height:60,background:isSelected?`linear-gradient(145deg,${colors.bg},${colors.bg}cc)`:disabled?"rgba(255,255,255,0.04)":`linear-gradient(145deg,${colors.bg}44,${colors.bg}22)`,border:isSelected?"2px solid #FFD700":disabled?"1px solid rgba(255,255,255,0.08)":`1px solid ${colors.bg}66`,borderRadius:8,cursor:disabled?"not-allowed":"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"all 0.15s ease",opacity:disabled&&!isSelected?0.25:1,transform:isSelected?"scale(1.06) translateY(-2px)":"scale(1)",boxShadow:isSelected?`0 4px 16px ${colors.bg}88`:"none",position:"relative"}}>
                  {cnt>0 && <div style={{position:"absolute",top:2,right:4,fontSize:9,fontWeight:900,color:"#FFD700"}}>×{cnt}</div>}
                  <div style={{fontSize:7,opacity:0.7,color:isSelected?colors.text:"#aaa"}}>{el.atomicNumber}</div>
                  <div style={{fontSize:18,fontWeight:900,lineHeight:1,color:isSelected?colors.text:disabled?"rgba(255,255,255,0.3)":"#fff"}}>{el.symbol}</div>
                  <div style={{fontSize:6,opacity:0.8,textAlign:"center",lineHeight:1.2,color:isSelected?colors.text:disabled?"rgba(255,255,255,0.2)":"rgba(255,255,255,0.6)"}}>{el.name}</div>
                </div>
              );
            })}
          </div>

          {hoveredEl && (
            <div style={{marginTop:8,background:"rgba(255,255,255,0.08)",borderRadius:8,padding:"8px 12px",fontSize:9,opacity:0.8,letterSpacing:0.5}}>
              {hoveredEl.name} · Reactivity {hoveredEl.reactivity}/10 · {RARITY_LABELS[hoveredEl.rarity]} · {GROUP_COLORS[hoveredEl.group]?.label}
            </div>
          )}
        </div>

        {/* RIGHT: Builder + beaker + result */}
        <div style={{flex:"0 0 210px",display:"flex",flexDirection:"column",alignItems:"center",gap:14}}>

          <div style={{width:"100%"}}>
            <div style={{fontSize:9,letterSpacing:2,opacity:0.5,marginBottom:8,textAlign:"center"}}>YOUR FORMULA ({selection.length}/6 atoms)</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6,justifyContent:"center",minHeight:48,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:8,border:"1px solid rgba(255,255,255,0.08)"}}>
              {selectedSymbols.length===0
                ? <div style={{fontSize:9,opacity:0.3,letterSpacing:1,alignSelf:"center"}}>TAP ELEMENTS BELOW</div>
                : selectedSymbols.map(sym=>{
                    const el = ELEMENTS.find(e=>e.symbol===sym);
                    const colors = GROUP_COLORS[el?.group]||GROUP_COLORS.metal;
                    const cnt = countOf(sym);
                    return (
                      <div key={sym} style={{display:"flex",alignItems:"center",gap:4,background:`linear-gradient(145deg,${colors.bg}cc,${colors.bg}88)`,borderRadius:8,padding:"4px 6px",border:"1px solid rgba(255,255,255,0.3)",animation:"float 2s ease-in-out infinite"}}>
                        <button onClick={()=>removeOne(sym)} style={{background:"rgba(0,0,0,0.3)",border:"none",color:"#fff",borderRadius:4,width:16,height:16,cursor:"pointer",fontSize:12,padding:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace"}}>−</button>
                        <div style={{textAlign:"center"}}>
                          <div style={{fontSize:14,fontWeight:900,color:colors.text,lineHeight:1}}>{sym}</div>
                          {cnt>1&&<div style={{fontSize:8,color:colors.text,opacity:0.8}}>×{cnt}</div>}
                        </div>
                        <button onClick={()=>addEl(el)} disabled={selection.length>=6} style={{background:"rgba(0,0,0,0.3)",border:"none",color:"#fff",borderRadius:4,width:16,height:16,cursor:"pointer",fontSize:12,padding:0,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",opacity:selection.length>=6?0.3:1}}>+</button>
                      </div>
                    );
                  })
              }
            </div>
            {noMatch && (
              <div style={{marginTop:8,background:"rgba(255,107,107,0.15)",border:"1px solid rgba(255,107,107,0.4)",borderRadius:8,padding:"8px 10px",fontSize:9,color:"#FF6B6B",textAlign:"center",animation:"shake 0.3s ease",letterSpacing:0.5}}>
                🤔 No compound found for this formula.<br/><span style={{opacity:0.7}}>Try adjusting the amounts!</span>
              </div>
            )}
          </div>

          <div style={{background:"rgba(255,255,255,0.05)",borderRadius:16,padding:20,border:"1px solid rgba(255,255,255,0.1)",width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
            <BeakerAnimation animationType={animType} isAnimating={isAnimating}/>
            <button onClick={result?reset:combine} disabled={!result&&selection.length<2}
              style={{marginTop:16,padding:"12px 20px",borderRadius:10,border:"none",background:result?"linear-gradient(135deg,#1DD1A1,#00b894)":selection.length>=2?"linear-gradient(135deg,#54A0FF,#5F27CD)":"rgba(255,255,255,0.1)",color:"#fff",fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:1,cursor:(selection.length>=2||result)?"pointer":"not-allowed",width:"100%",transition:"all 0.2s",animation:selection.length>=2&&!result?"pulse 2s infinite":"none"}}>
              {result?"🔄 MIX AGAIN":selection.length>=2?"⚗️ COMBINE!":"SELECT "+Math.max(0,2-selection.length)+" MORE"}
            </button>
          </div>

          {result && <ResultCard result={result} onClose={reset}/>}
        </div>
      </div>
    </div>
  );
}
