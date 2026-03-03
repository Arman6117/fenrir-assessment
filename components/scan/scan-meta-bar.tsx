export default function ScanMetaBar() {
    const items = [
      { label: "Scan Type", value: "Grey Box" },
      { label: "Targets", value: "google.com" },
      { label: "Started At", value: "Nov 22, 09:00AM" },
      { label: "Credentials", value: "2 Active" },
      { label: "Files", value: "Control.pdf" },
      { label: "Checklists", value: "40/350" },
    ];
  
    return (
      <div className="flex flex-wrap gap-8 px-6 py-4 border-t border-gray-100">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="text-xs text-gray-400">{item.label}</span>
            <span className="text-sm font-semibold text-gray-800">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    );
  }