import IconFeatureItem from './IconFeatureItem';

export default function IconFeatureGrid({ items, className = '' }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 md:gap-y-12 ${className}`}>
      {items.map((item, index) => (
        <IconFeatureItem 
          key={item.title + index} 
          icon={item.icon}
          title={item.title} 
          description={item.description} 
        />
      ))}
    </div>
  );
} 