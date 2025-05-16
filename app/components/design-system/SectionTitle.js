export default function SectionTitle({ 
  children, 
  subtitle, 
  eyebrow, 
  color = 'text-black', 
  className = '', 
  isEditing, 
  onPropChange, 
  // Default prop names, can be overridden if SectionTitle is used with different prop names for these text fields
  propNameForChildren = 'children', 
  propNameForSubtitle = 'subtitle', 
  propNameForEyebrow = 'eyebrow' 
}) {

  const handleInputChange = (propName, value) => {
    if (onPropChange) {
      onPropChange(propName, value);
    }
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center my-24 ${className}`}>
      {isEditing && eyebrow !== undefined ? (
        <input 
          type="text"
          value={eyebrow || ''} 
          onChange={(e) => handleInputChange(propNameForEyebrow, e.target.value)} 
          className="mb-2 px-2 py-1 text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-widest text-center bg-gray-100 border border-gray-300 rounded w-auto inline-block"
          placeholder="Eyebrow text"
        />
      ) : eyebrow && (
        <span className="uppercase tracking-widest text-xs md:text-sm font-semibold text-gray-400 mb-2">{eyebrow}</span>
      )}
      
      {isEditing ? (
        <input 
          type="text" 
          value={children || ''} 
          onChange={(e) => handleInputChange(propNameForChildren, e.target.value)} 
          className={`text-4xl md:text-6xl font-bold text-center leading-tight mb-4 tracking-tight ${color} bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full max-w-xl`}
          placeholder="Title text"
        />
      ) : (
        <h2 className={`text-4xl md:text-6xl font-bold text-center leading-tight mb-4 tracking-tight ${color}`}>
          {children}
        </h2>
      )}

      {isEditing && subtitle !== undefined ? (
         <textarea 
          value={subtitle || ''} 
          onChange={(e) => handleInputChange(propNameForSubtitle, e.target.value)} 
          className="text-lg md:text-xl text-gray-600 font-medium text-center max-w-2xl bg-gray-100 border border-gray-300 rounded px-2 py-1 w-full"
          placeholder="Subtitle text"
          rows={2}
        />
      ) : subtitle && (
        <p className="text-lg md:text-xl text-gray-500 font-medium text-center max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
} 