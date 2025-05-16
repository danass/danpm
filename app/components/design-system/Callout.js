import { ExclamationTriangleIcon, QuestionMarkCircleIcon, LightBulbIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const typeStyles = {
  info: {
    container: 'border-blue-500 text-blue-800',
    icon: <LightBulbIcon className="w-6 h-6 text-blue-500" />,
  },
  success: {
    container: 'border-green-500 text-green-800',
    icon: <CheckCircleIcon className="w-6 h-6 text-green-500" />,
  },
  warning: {
    container: 'border-yellow-500 text-yellow-800',
    icon: <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />,
  },
  fail: {
    container: 'border-red-500 text-red-800',
    icon: <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />,
  },
  question: {
    container: 'border-indigo-500 text-indigo-800',
    icon: <QuestionMarkCircleIcon className="w-6 h-6 text-indigo-500" />,
  },
  secure: {
    container: 'border-teal-500 text-teal-800',
    icon: <ShieldCheckIcon className="w-6 h-6 text-teal-500" />,
  },
  default: {
    container: 'border-gray-500 text-gray-800',
    icon: <LightBulbIcon className="w-6 h-6 text-gray-500" />,
  },
};

export default function Callout({ 
  type = 'default', 
  title, 
  children, 
  icon: customIcon, 
  className = '',
  isEditing = false,
  onPropChange,
  propNameForTitle = 'title',
  propNameForChildren = 'children',
}) {
  const styles = typeStyles[type] || typeStyles.default;
  const displayIcon = customIcon || styles.icon;

  const handleTitleChange = (e) => {
    if (onPropChange) {
      onPropChange(propNameForTitle, e.target.value);
    }
  };

  const handleChildrenChange = (e) => {
    if (onPropChange) {
      onPropChange(propNameForChildren, e.target.value);
    }
  };

  return (
    <div 
      className={`border-l-4 p-6 my-8 rounded-r-lg flex items-start gap-4 shadow-sm ${styles.container} ${className}`}
      role="note" 
      aria-live="polite"
    >
      {displayIcon && (
        <div className={`flex-shrink-0 w-6 h-6 mt-0.5`}>
          {displayIcon}
        </div>
      )}
      <div className="flex-grow">
        {title && !isEditing && <div className="font-semibold mb-1.5 text-sm uppercase tracking-wider">{title}</div>}
        {isEditing && (
          <div className="mb-2">
            <label htmlFor="callout-title-editor" className="block text-xs font-medium text-gray-700 mb-1">Edit Title:</label>
            <input
              type="text"
              id="callout-title-editor"
              value={title || ''}
              onChange={handleTitleChange}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              placeholder="Enter title"
            />
          </div>
        )}
        {!isEditing && <div className="text-base leading-relaxed">{children}</div>}
        {isEditing && (
          <div>
            <label htmlFor="callout-children-editor" className="block text-xs font-medium text-gray-700 mb-1">Edit Content:</label>
            <textarea
              id="callout-children-editor"
              value={typeof children === 'string' ? children : ''}
              onChange={handleChildrenChange}
              rows={3}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
              placeholder="Enter content"
            />
          </div>
        )}
      </div>
    </div>
  );
} 