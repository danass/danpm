'use client'

import React from 'react';
import Image from 'next/image';

// Import all necessary components from the design system
import Callout from '../components/design-system/Callout';
import Quote from '../components/design-system/Quote';
import Button from '../components/design-system/Button';
import ListItem from '../components/design-system/ListItem';
import SectionTitle from '../components/design-system/SectionTitle';
import CheckListCard from '../components/design-system/CheckListCard';
import CardGrid from '../components/design-system/CardGrid';
import ImageCarousel from '../components/design-system/ImageCarousel';
import HeroSplitLayout from '../components/design-system/HeroSplitLayout';
import StylePreviewCard from '../components/design-system/StylePreviewCard';
import IconFeatureGrid from '../components/design-system/IconFeatureGrid';
import ImageGallery from '../components/design-system/ImageGallery';
import MobileScreenLayout from '../components/design-system/MobileScreenLayout';
import MobileScreenGrid from '../components/design-system/MobileScreenGrid';
import FeatureMobileScreens from '../components/design-system/FeatureMobileScreens';
import ContentCard from '../components/design-system/ContentCard';
import Paragraph from '../components/design-system/Paragraph';
import PlaceholderImage from '../components/design-system/PlaceholderImage';

// Import the shared iconMap
import { iconMap } from '../components/design-system/icon-map'; // Import shared iconMap

// Heroicons (only those NOT in iconMap or used directly by name string lookup if any)
// Most direct Heroicon imports can be removed if iconMap covers all needs or if components get icons directly.
// Keep specific ones if used uniquely here, e.g. solid variants not in the main map.
import { ChevronUpIcon, ChevronDownIcon, Bars3Icon as DraggableIcon } from '@heroicons/react/24/solid'; // Renamed Bars3Icon to avoid clash if it exists in iconMap

// Helper function to render mixed content (strings and simple inline formatted elements)
function renderMixedContent(content) {
  if (Array.isArray(content)) {
    return content.map((item, index) => {
      if (typeof item === 'string') {
        return item;
      }
      if (typeof item === 'object' && item !== null) {
        if (item.format === 'strong') {
          return <strong key={index} className="font-semibold">{item.text}</strong>;
        }
        if (item.format === 'italic') {
          return <em key={index} className="italic">{item.text}</em>;
        }
        // Example for link format (can be expanded)
        // if (item.format === 'link' && item.href) {
        //   return <a key={index} href={item.href} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{item.text}</a>;
        // }
      }
      return null; // Fallback for unrecognised format objects
    });
  }
  return content; // If it's just a string, return it directly
}

// Helper to format derived category names
function formatCategoryName(csvFileName) {
  return csvFileName
    .replace('Collection Image Similarity - ', '')
    .replace('.csv', '')
    .replace(/Styles|Amenities/g, '$& ') 
    .trim();
}

// const derivedCategoriesData = [ ... ]; // This might use iconName strings that iconMap will resolve
// Ensure iconName strings in derivedCategoriesData match keys in the new iconMap
const derivedCategoriesData = [
  { name: formatCategoryName('Styles Ancient.csv'), description: 'Homes with historical character and timeless appeal.', iconName: 'TableCellsIcon' },
  { name: formatCategoryName('Styles Family Friendly.csv'), description: 'Properties suitable for families with children.', iconName: 'TableCellsIcon' },
  { name: formatCategoryName('Styles Supercharged.csv'), description: 'Modern, high-tech, and luxurious homes.', iconName: 'TableCellsIcon' },
  // ... more data, ensure iconName values are valid keys in the new iconMap.js
];

export function CustomSection({ className, content, isEditing, onMoveBlock, index, totalBlocks }) {
  const sectionContent = (
    <section className={`w-full max-w-5xl mx-auto px-4 md:px-0 ${className || ''}`}>
      {content.map((element, idx) => (
        <BlockRenderer key={element.props?.id || idx} block={element} isEditing={false} />
      ))}
    </section>
  );

  if (isEditing) {
    return (
      <div className="relative py-2 px-2 border-2 border-dashed border-blue-500 my-4 bg-blue-50/50 group">
        <div className="absolute top-2 right-2 z-10 flex flex-col space-y-1 opacity-50 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onMoveBlock(index, 'up')}
            disabled={index === 0}
            className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Move block up"
          >
            <ChevronUpIcon className="h-5 w-5 text-gray-700" />
          </button>
          <button 
            onClick={() => onMoveBlock(index, 'down')}
            disabled={index === totalBlocks - 1}
            className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Move block down"
          >
            <ChevronDownIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        <div className="absolute top-2 left-2 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
           <DraggableIcon className="h-6 w-6 text-gray-500 cursor-grab" aria-label="Drag to reorder"/>
        </div>
        {sectionContent}
      </div>
    );
  }
  return sectionContent;
}

export function HtmlContent({ className, paragraphs, elements, listItems, isEditing, onPropChange }) {
  const handleBlur = (e, path) => {
    if (onPropChange) {
      onPropChange(path, e.currentTarget.innerHTML);
    }
  };

  // Import Paragraph component for consistent styling
  const Paragraph = React.lazy(() => import('../components/design-system/Paragraph'));

  if (isEditing) {
    const editableStyle = {
      outline: '1px dashed #9ca3af', // gray-400
      padding: '2px',
      margin: '2px 0',
      minHeight: '1em', // Ensure clickable area
      cursor: 'text',
    };
    if (paragraphs) {
      return (
        <div className={className}>
          {paragraphs.map((p, i) => (
            <p 
              key={i} 
              contentEditable={true}
              suppressContentEditableWarning={true}
              dangerouslySetInnerHTML={{ __html: p }} 
              onBlur={(e) => handleBlur(e, ['paragraphs', i])}
              style={editableStyle}
            />
          ))}
        </div>
      );
    }
    if (elements) {
      return (
        <div className={className}>
          {elements.map((el, i) => {
            if (el.type === 'p') return (
              <p 
                key={i} 
                contentEditable={true}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: el.content }} 
                onBlur={(e) => handleBlur(e, ['elements', i, 'content'])}
                style={{...editableStyle, ...(el.className ? {} : {})}} // Preserve existing classes if any, apply style
                className={el.className} // Keep original classes
              />
            );
            if (el.type === 'ul') return (
              <ul key={i} className={el.className}>
                {el.items.map((item, idx) => (
                  <li 
                    key={idx} 
                    contentEditable={true}
                    suppressContentEditableWarning={true}
                    dangerouslySetInnerHTML={{ __html: item }} 
                    onBlur={(e) => handleBlur(e, ['elements', i, 'items', idx])}
                    style={editableStyle}
                  />
                ))}
              </ul>
            );
            if (el.type === 'h2') return (
              <h2 
                key={i} 
                className={el.className} 
                contentEditable={true}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: el.content }} 
                onBlur={(e) => handleBlur(e, ['elements', i, 'content'])}
                style={editableStyle}
              />
            );
            return null;
          })}
        </div>
      );
    }
    if (listItems) {
      return (
          <ul className={className}>
              {listItems.map((item, i) => {
                const itemText = item.text || item;
                const renderedText = typeof itemText === 'string' || React.isValidElement(itemText) 
                                     ? itemText 
                                     : renderMixedContent(itemText);
                return <ListItem key={i} text={renderedText} {...item.props} />;
              })}
          </ul>
      );
    }
    return <div className="bg-yellow-100 p-2">HtmlContent in edit mode: No editable content structure (paragraphs, elements, listItems) found or structure not yet supported for inline editing.</div>;
  }

  // Original rendering logic (non-editing mode)
  if (paragraphs) {
    return (
      <div className={className}>
        {paragraphs.map((p, i) => (
          <React.Suspense key={i} fallback={<p dangerouslySetInnerHTML={{ __html: p }} />}>
            <Paragraph dangerouslySetInnerHTML={{ __html: p }} />
          </React.Suspense>
        ))}
      </div>
    );
  }
  if (elements) {
    return (
      <div className={className}>
        {elements.map((el, i) => {
          if (el.type === 'p') {
            return (
              <React.Suspense key={i} fallback={<p dangerouslySetInnerHTML={{ __html: el.content }} />}>
                <Paragraph 
                  className={el.className} 
                  dangerouslySetInnerHTML={{ __html: el.content }} 
                />
              </React.Suspense>
            );
          }
          if (el.type === 'ul') return (
            <ul key={i} className={el.className}>
              {el.items.map((item, idx) => <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />)}
            </ul>
          );
          if (el.type === 'h2') return <h2 key={i} className={el.className} dangerouslySetInnerHTML={{ __html: el.content }} />;
          return null;
        })}
      </div>
    );
  }
   if (listItems) {
    return (
        <ul className={className}>
            {listItems.map((item, i) => {
              const itemText = item.text || item;
              const renderedText = typeof itemText === 'string' || React.isValidElement(itemText) 
                                   ? itemText 
                                   : renderMixedContent(itemText);
              return <ListItem key={i} text={renderedText} {...item.props} />;
            })}
        </ul>
    );
  }
  return null;
}

export function VideoComponent({ containerClassName, videoClassName, src, autoPlay, muted, loop, playsInline, controls, fallbackText }) {
  return (
    <div className={containerClassName}>
      <video 
        className={videoClassName}
        src={src} 
        autoPlay={autoPlay} 
        muted={muted} 
        loop={loop} 
        playsInline={playsInline} 
        controls={controls}
      >
        {fallbackText}
      </video>
    </div>
  );
}

export function StylePreviewCardGrid({ wrapperClassName, styles }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 ${wrapperClassName}`}>
      {styles.map((style, index) => (
        <StylePreviewCard key={index} {...style} />
      ))}
    </div>
  );
}

export function CheckListCardGrid({ wrapperClassName, cards }) {
  return (
    <div className={wrapperClassName}>
      {cards.map((card, index) => {
        return (
          <CheckListCard 
            key={index} 
            items={card.items} 
          />
        );
      })}
    </div>
  );
}

export function ImageFigureGroup({ 
  wrapperClassName, 
  figures, 
  isEditing = false, 
  onItemPropChange
}) {
  // Use an array of booleans for error states, matching the figures array length
  const [imageErrors, setImageErrors] = React.useState(() => figures.map(() => false));

  const handleImageError = (index) => {
    setImageErrors(prevErrors => {
      const newErrors = [...prevErrors];
      newErrors[index] = true;
      return newErrors;
    });
  };
  
  // Reset error states if figures array changes (e.g. in editing mode)
  React.useEffect(() => {
    setImageErrors(figures.map(() => false));
  }, [figures]);

  const handlePropChange = (itemIndex, propName, value) => {
    if (onItemPropChange) {
      onItemPropChange(itemIndex, propName, value);
      // If src changes, reset error state for that image
      if (propName === 'src') {
        setImageErrors(prevErrors => {
          const newErrors = [...prevErrors];
          newErrors[itemIndex] = false;
          return newErrors;
        });
      }
    }
  };

  if (isEditing) {
    return (
      <div className={`${wrapperClassName} p-4 border-2 border-dashed border-blue-300 bg-blue-50/50 rounded-lg my-2`}>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Edit Figures:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {figures.map((figure, index) => (
            <div key={`edit-fig-${index}`} className="p-3 border border-gray-200 rounded bg-white shadow-sm">
              <p className="text-xs text-gray-600 mb-1">Figure {index + 1} (Src: {figure.src})</p>
              <div className="relative w-full aspect-[4/3] bg-gray-100 rounded overflow-hidden mb-2">
                {imageErrors[index] ? (
                  <PlaceholderImage icon="photo" message="Image not available" />
                ) : (
                  <Image 
                    src={figure.src || '/he-styles-preview.png'}
                    alt={figure.alt || 'Preview'}
                    width={figure.imageWidth || 300} 
                    height={figure.imageHeight || 200} 
                    className={`w-full h-auto ${figure.imageClassName || 'object-contain'}`}
                    onError={() => handleImageError(index)}
                  />
                )}
              </div>
              <div className="mb-2">
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Alt Text:</label>
                <input 
                  type="text" 
                  value={figure.alt || ''} 
                  onChange={(e) => handlePropChange(index, 'alt', e.target.value)} 
                  placeholder="Enter alt text"
                  className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Caption:</label>
                <textarea 
                  value={figure.caption || ''} 
                  onChange={(e) => handlePropChange(index, 'caption', e.target.value)} 
                  rows={2}
                  placeholder="Enter caption"
                  className="mt-0.5 block w-full px-2 py-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs text-gray-900"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClassName || 'flex flex-col md:flex-row gap-6 justify-center items-start'}>
      {figures.map((figure, index) => (
        <figure key={figure.id || index} className={`flex flex-col ${figure.figureClassName || 'w-full md:max-w-sm mx-auto'}`}>
          <div className={figure.imageContainerClassName || 'rounded-lg overflow-hidden shadow-md border border-gray-200 bg-white'}>
            {imageErrors[index] ? (
              <PlaceholderImage icon="photo" message="Figure not available" />
            ) : (
              <div className="relative">
                <Image 
                  src={figure.src || '/he-styles-preview.png'}
                  alt={figure.alt || 'Figure image'}
                  width={figure.imageWidth || 400} 
                  height={figure.imageHeight || 300} 
                  className={`w-full h-auto object-contain ${figure.imageClassName || ''}`}
                  onError={() => handleImageError(index)}
                />
              </div>
            )}
          </div>
          {figure.caption && <figcaption className={`mt-3 text-sm text-gray-700 text-center ${figure.captionClassName || ''}`}>{figure.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export function Separator({ className }) {
  return <div className={className} />;
}

export function ButtonGroup({ wrapperClassName, buttons }) {
  return (
    <div className={wrapperClassName}>
      {buttons.map((buttonProps, index) => (
        <Button key={index} {...buttonProps} target={buttonProps.href && buttonProps.href.startsWith('http') ? '_blank' : undefined} />
      ))}
    </div>
  );
}

export const componentMap = {
  HeroSplitLayout,
  CustomSection,
  SectionTitle,
  HtmlContent,
  CardGrid,
  Callout,
  IconFeatureGrid,
  StylePreviewCardGrid, 
  ImageCarousel,
  CheckListCardGrid,
  ImageGallery,
  ImageFigureGroup,
  Quote,
  Video: VideoComponent,
  ListItem,
  Button, 
  ButtonGroup,
  Separator,
  MobileScreenLayout,
  MobileScreenGrid,
  FeatureMobileScreens,
  ContentCard,
  Paragraph,
  PlaceholderImage
};

export function BlockRenderer({ 
  block, 
  isEditing, 
  index, // This is the iteration index from the map loop in the parent (page or CustomSection)
  totalBlocks, 
  onMoveBlock, 
  onToggleBlockDeletion, 
  isPendingDeletion, 
  onBlockPropChange, // The main handler from CaseStudyPage: (blockIndex, contentIndex, propPathArray, newValue)
  blockIndex, // The index of this block in CaseStudyPage.editableBlocks
  contentIndex // The index of this item if it's within a CustomSection's content array, otherwise undefined or null
}) {
  const ComponentToRender = componentMap[block.componentName];
  let { id, ...propsFromBlock } = block.props || {}; // Extract id, rest are component props
  let processedProps = { ...propsFromBlock }; // Start with props from the block data

  if (!ComponentToRender) {
    console.warn(`Component ${block.componentName} not found in componentMap.`);
    return <div className="bg-red-200 p-4 my-2">Component not found: {block.componentName}</div>;
  }

  // Icon mapping for components that use it (e.g., IconFeatureGrid items, CheckListCardGrid cards)
  // This will now use the imported iconMap
  if (processedProps.iconName && iconMap[processedProps.iconName]) {
    const IconComponent = iconMap[processedProps.iconName];
    // Ensure iconProps are passed correctly; provide sensible defaults if not present
    const defaultIconProps = { className: 'w-6 h-6' };
    const finalIconProps = { ...defaultIconProps, ...(processedProps.iconProps || {}) };
    processedProps.icon = <IconComponent {...finalIconProps} />;
    // delete processedProps.iconName; // Optionally remove to prevent spreading if not destructured by target
    // delete processedProps.iconProps; // Optionally remove
  } else if (processedProps.iconName) {
    console.warn(`Icon named "${processedProps.iconName}" not found in iconMap for component ${block.componentName}.`);
  }

  // Special handling for IconFeatureGrid data transformation
  if (block.componentName === 'IconFeatureGrid' && block.props.useDerivedCategories) {
    processedProps.items = derivedCategoriesData.map(cat => ({
      ...cat, // name, description
      icon: iconMap[cat.iconName] ? React.createElement(iconMap[cat.iconName], {className: 'w-8 h-8 text-indigo-600'}) : null,
      // title is used as key in IconFeatureGrid, ensure it exists
      title: cat.name // Ensure title is mapped for key prop
    }));
    
    // Default to light blue background if not specified
    if (!processedProps.backgroundColor) {
      processedProps.backgroundColor = 'bg-white';
    }
  }

  // For any IconFeatureGrid, ensure icons have proper sizing and color
  if (block.componentName === 'IconFeatureGrid' && Array.isArray(processedProps.items)) {
    processedProps.items = processedProps.items.map(item => {
      // If icon is already a React element, don't modify it
      if (item.icon && React.isValidElement(item.icon)) {
        return item;
      }
      
      // If item has iconName but no icon, create the icon
      if (item.iconName && iconMap[item.iconName]) {
        return { 
          ...item, 
          icon: React.createElement(iconMap[item.iconName], {
            className: item.iconProps?.className || 'w-8 h-8 text-indigo-600'
          })
        };
      }
      
      return item;
    });
  }

  if (isEditing) {
    processedProps.isEditing = true; // Pass editing mode to the component

    // For CustomSection, we pass the main onBlockPropChange function differently,
    // as it will distribute it to its internal BlockRenderer calls.
    if (ComponentToRender === CustomSection) {
        processedProps.onBlockPropChangeForContent = onBlockPropChange; // Pass the main handler
        processedProps.blockIndexOfParent = blockIndex; // Pass the index of this CustomSection
    } else if (ComponentToRender === SectionTitle) {
      processedProps.onPropChange = (propName, value) => {
        onBlockPropChange(blockIndex, contentIndex, [propName], value);
      };
    } else if (ComponentToRender === HtmlContent) {
      processedProps.onPropChange = (propPathArray, value) => {
        onBlockPropChange(blockIndex, contentIndex, propPathArray, value);
      };
    } else if (ComponentToRender === Callout) {
      processedProps.onPropChange = (propName, value) => {
        onBlockPropChange(blockIndex, contentIndex, [propName], value);
      };
    } else if (ComponentToRender === Quote) {
      processedProps.onPropChange = (propName, value) => {
        onBlockPropChange(blockIndex, contentIndex, [propName], value);
      };
    } else if (ComponentToRender === Button) {
      processedProps.onPropChange = (propName, value) => {
        onBlockPropChange(blockIndex, contentIndex, [propName], value);
      };
    } else if (ComponentToRender === CardGrid) {
      // CardGrid receives the main onBlockPropChange and constructs deeper paths itself
      processedProps.onPropChange = (propPathArray, value) => {
         // propPathArray will be like ['cards', itemIndex, 'propertyName']
        onBlockPropChange(blockIndex, contentIndex, propPathArray, value);
      };
    } else if (ComponentToRender === ImageGallery) {
      processedProps.onItemPropChange = (itemIndex, propName, value) => {
        onBlockPropChange(blockIndex, contentIndex, ['images', itemIndex, propName], value);
      };
    } else if (ComponentToRender === ImageFigureGroup) {
      processedProps.onItemPropChange = (itemIndex, propName, value) => {
        onBlockPropChange(blockIndex, contentIndex, ['figures', itemIndex, propName], value);
      };
    } else if (ComponentToRender === HeroSplitLayout) {
      processedProps.onPropChange = (propPathArray, value) => {
        onBlockPropChange(blockIndex, contentIndex, propPathArray, value);
      };
    }
    // TODO: Add similar handlers for HeroSplitLayout.

    // Clean _isPendingDeletion from props before passing to actual component
    // This is important because the actual display component (e.g., SectionTitle) 
    // doesn't know about _isPendingDeletion and might try to render it or pass it as an HTML attribute.
    if (processedProps._isPendingDeletion) {
      const { _isPendingDeletion, ...restProps } = processedProps;
      processedProps = restProps;
    }
  }

  // Generic wrapper for editing controls, applied if isEditing is true for this block
  if (isEditing && ComponentToRender !== CustomSection) { // CustomSection handles its own editing wrapper
    return (
      <div className="relative py-2 px-2 border-2 border-dashed border-blue-500 my-4 bg-blue-50/50 group">
        <div className="absolute top-2 right-2 z-10 flex flex-col space-y-1 opacity-50 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onMoveBlock(index, 'up')}
            disabled={index === 0}
            className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Move block up"
          >
            <ChevronUpIcon className="h-5 w-5 text-gray-700" />
          </button>
          <button 
            onClick={() => onMoveBlock(index, 'down')}
            disabled={index === totalBlocks - 1}
            className="p-1 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Move block down"
          >
            <ChevronDownIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>
        <div className="absolute top-2 left-2 z-10 opacity-50 group-hover:opacity-100 transition-opacity">
           <DraggableIcon className="h-6 w-6 text-gray-500 cursor-grab" aria-label="Drag to reorder"/>
        </div>
        <ComponentToRender {...processedProps} />
      </div>
    );
  }

  return <ComponentToRender {...processedProps} />;
} 