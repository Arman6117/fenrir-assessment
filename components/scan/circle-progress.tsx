export default function CircleProgress({ value }: { value: number }) {
    const r = 44;
    const circ = 2 * Math.PI * r;
    const offset = circ - (value / 100) * circ;
  
    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="-rotate-90" width="96" height="96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
          <circle
            cx="48"
            cy="48"
            r={r}
            fill="none"
            stroke="#0D9488"
            strokeWidth="8"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute text-center">
          <p className="text-lg font-bold">{value}%</p>
          <p className="text-xs text-gray-400">In Progress</p>
        </div>
      </div>
    );
  }