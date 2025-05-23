import IconFeatureItem from './IconFeatureItem';

export default function IconFeatureGrid({ 
  items, 
  className = '', 
  isEditing = false, 
  onGridItemPropChange,
  backgroundColor = 'bg-gray-50' // Light blue background like in Airbnb design
}) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`${backgroundColor} rounded-2xl p-8 sm:p-10 my-8 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
        {items.map((item, index) => (
          <IconFeatureItem 
            key={item.id || item.title + index}
            icon={item.icon}
            title={item.title} 
            description={item.description} 
            isEditing={isEditing}
            onPropChange={isEditing && onGridItemPropChange ? (propName, value) => {
              onGridItemPropChange(index, propName, value);
            } : undefined}
          />
        ))}
      </div>
    </div>
  );
} 