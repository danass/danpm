export default function CheckListCard({ title, subtitle, items, icon }) {
  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center">
      {icon && <div className="mb-4">{icon}</div>}
      {title && <h3 className="text-2xl md:text-3xl font-bold text-center mb-2">{title}</h3>}
      {subtitle && <p className="text-lg text-gray-500 text-center mb-8">{subtitle}</p>}
      <div className="bg-white rounded-3xl shadow p-8 w-full flex flex-col gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between border-b last:border-b-0 border-gray-200 py-3 px-2">
            <span className="text-base md:text-lg text-gray-900">{item.label}</span>
            {item.checked && (
              <span role="img" aria-label="Checked" className="text-green-500 text-xl ml-4">✔️</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 