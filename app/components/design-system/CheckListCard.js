export default function CheckListCard({ title, subtitle, items, icon, isEditing = false, onPropChange }) {
  const handleFieldChange = (fieldName, value) => {
    if (onPropChange) {
      onPropChange(fieldName, value); // For title, subtitle
    }
  };

  const handleItemLabelChange = (itemIndex, value) => {
    if (onPropChange) {
      // This specific signature needs to be handled by the parent (CheckListCardGrid)
      onPropChange(itemIndex, 'label', value);
    }
  };

  if (isEditing) {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg my-2">
        {/* Icon is not typically text-editable */}
        <div className="mb-2 w-full">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Title:</label>
          <input
            type="text"
            value={title || ''}
            onChange={(e) => handleFieldChange('title', e.target.value)}
            placeholder="Enter title"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div className="mb-4 w-full">
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Subtitle:</label>
          <textarea
            value={subtitle || ''}
            onChange={(e) => handleFieldChange('subtitle', e.target.value)}
            rows={2}
            placeholder="Enter subtitle"
            className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div className="bg-white rounded-xl shadow p-6 w-full flex flex-col gap-3">
          <h4 className="text-sm font-medium text-gray-600 mb-1">List Items:</h4>
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b last:border-b-0 border-gray-200 py-2">
              <input
                type="text"
                value={item.label || ''}
                onChange={(e) => handleItemLabelChange(i, e.target.value)}
                placeholder={`Enter label for item ${i+1}`}
                className="flex-grow mr-2 px-1 py-0.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              />
              <span className={`text-sm ${item.checked ? 'text-green-500' : 'text-gray-400'}`}>
                (Checked: {item.checked ? 'Yes' : 'No'}) {/* Not editable here */}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

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