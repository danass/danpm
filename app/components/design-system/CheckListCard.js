import { CheckIcon } from '@heroicons/react/24/solid';

export default function CheckListCard({ items, isEditing = false, onPropChange }) {
  const handleItemLabelChange = (itemIndex, value) => {
    if (onPropChange) {
      // The parent (CheckListCardGrid or dynamic-page-renderer)
      // needs to handle this structure: (itemIndex, 'label', value)
      // or a more generic (itemIndex, propName, value)
      onPropChange(itemIndex, 'label', value);
    }
  };

  if (isEditing) {
    return (
      <div className="w-full max-w-md mx-auto p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-3xl my-2">
        <div className="bg-white rounded-xl shadow p-4 w-full flex flex-col">
          <h4 className="text-sm font-medium text-gray-600 mb-2">List Items:</h4>
          {items && items.map((item, i) => (
            <div key={i} className="flex items-center justify-between border-b last:border-b-0 border-gray-200 py-2">
              <input
                type="text"
                value={item.label || item || ''} // Support both object and string items for label
                onChange={(e) => handleItemLabelChange(i, e.target.value)}
                placeholder={`Enter label for item ${i + 1}`}
                className="flex-grow mr-2 px-1.5 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              />
              <CheckIcon className="h-5 w-5 text-green-500" />
            </div>
          ))}
          {(!items || items.length === 0) && (
            <p className="text-xs text-gray-500 py-2">No items yet. Add items in the JSON structure.</p>
          )}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return null; // Don't render anything if there are no items in non-editing mode
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
      <ul className="divide-y divide-gray-100">
        {items.map((item, i) => (
          <li key={i} className="px-6 py-4 flex items-center justify-between">
            <span className="text-sm text-gray-900">
              {typeof item === 'string' ? item : item.label}
            </span>
            <CheckIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
          </li>
        ))}
      </ul>
    </div>
  );
} 