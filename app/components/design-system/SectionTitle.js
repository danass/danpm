export default function SectionTitle({ children, subtitle, eyebrow, color = 'text-black', className = '' }) {
  return (
    <div className={`w-full flex flex-col items-center justify-center my-24 ${className}`}>
      {eyebrow && (
        <span className="uppercase tracking-widest text-xs md:text-sm font-semibold text-gray-400 mb-2">{eyebrow}</span>
      )}
      <h2 className={`text-4xl md:text-6xl font-bold text-center leading-tight mb-4 tracking-tight ${color}`}>
        {children}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-gray-500 font-medium text-center max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
} 