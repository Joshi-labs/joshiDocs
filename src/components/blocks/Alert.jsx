import React from "react";
import { Info, AlertTriangle, Zap } from "lucide-react";
import { processText } from "../../utils/textProcessor";

const Alert = ({ variant, title, text }) => {
  const styles = {
    info: { border: "border-blue-500/50", bg: "bg-blue-500/10", text: "text-blue-200", icon: <Info size={18} className="text-blue-400" /> },
    warning: { border: "border-amber-500/50", bg: "bg-amber-500/10", text: "text-amber-200", icon: <AlertTriangle size={18} className="text-amber-400" /> },
    tip: { border: "border-emerald-500/50", bg: "bg-emerald-500/10", text: "text-emerald-200", icon: <Zap size={18} className="text-emerald-400" /> },
  };
  const style = styles[variant] || styles.info;
  return (
    <div className={`my-6 p-4 rounded-lg border ${style.border} ${style.bg} flex gap-3 items-start`}>
      <div className="mt-0.5 shrink-0">{style.icon}</div>
      <div>
        <h4 className={`font-semibold text-sm ${style.text} mb-1`}>{title}</h4>
        <p className="text-sm text-slate-300 leading-relaxed">{processText(text)}</p>
      </div>
    </div>
  );
};

export default Alert;