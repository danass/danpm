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

// Import Heroicons
import {
  LightBulbIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon, MagnifyingGlassIcon, 
  ChartBarIcon, CheckCircleIcon, ArrowDownTrayIcon, MapIcon, LinkIcon, 
  CodeBracketIcon, TableCellsIcon, UsersIcon, ShieldCheckIcon, ComputerDesktopIcon
} from '@heroicons/react/24/outline';

import { ChevronUpIcon, ChevronDownIcon, Bars3Icon } from '@heroicons/react/24/solid';

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

const derivedCategoriesData = [
  { name: formatCategoryName('Styles Ancient.csv'), description: 'Homes with historical character and timeless appeal.', iconName: 'TableCellsIcon' },
  { name: formatCategoryName('Styles Family Friendly.csv'), description: 'Properties suitable for families with children.', iconName: 'TableCellsIcon' },
  { name: formatCategoryName('Styles Supercharged.csv'), description: 'Modern, high-tech, and luxurious homes.', iconName: 'TableCellsIcon' },
  { name: formatCategoryName('Amenities Ski.csv'), description: 'Residences with easy access to ski resorts or amenities.', iconName: 'TableCellsIcon' },
  { name: formatCategoryName('Styles Full light.csv'), description: 'Bright homes with abundant natural light.', iconName: 'TableCellsIcon' },
  { name: formatCategoryName('Styles Lovers cocoon.csv'), description: 'Romantic and cozy getaways for couples.', iconName: 'TableCellsIcon' },
];

export const iconMap = {
  LightBulbIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  MapIcon,
  LinkIcon,
  CodeBracketIcon,
  TableCellsIcon,
  UsersIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  Bars3Icon
};

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
           <Bars3Icon className="h-6 w-6 text-gray-500 cursor-grab" aria-label="Drag to reorder"/>
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
        {paragraphs.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
      </div>
    );
  }
  if (elements) {
    return (
      <div className={className}>
        {elements.map((el, i) => {
          if (el.type === 'p') return <p key={i} dangerouslySetInnerHTML={{ __html: el.content }} />;
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
    <div className={wrapperClassName}>
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
        const IconComponent = card.iconName ? iconMap[card.iconName] : null;
        const iconProps = card.iconProps || {};
        return (
          <CheckListCard 
            key={index} 
            title={card.title} 
            items={card.items} 
            icon={IconComponent ? <IconComponent {...iconProps} /> : null}
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
  onItemPropChange // (itemIndex, propName, value)
}) {
  const handlePropChange = (itemIndex, propName, value) => {
    if (onItemPropChange) {
      onItemPropChange(itemIndex, propName, value);
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
                <Image 
                  src={figure.src}
                  alt={figure.alt || 'Preview'} // Display current alt
                  width={figure.imageWidth || 300} 
                  height={figure.imageHeight || 200} 
                  className={`w-full h-auto ${figure.imageClassName || 'object-contain'}`}
                  onError={(e) => { if (e.currentTarget.src !== '/he-styles-preview.png') e.currentTarget.src = '/he-styles-preview.png'; }}
                />
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
    <div className={wrapperClassName}>
      {figures.map((figure, index) => (
        <figure key={figure.id || index} className={`flex-1 text-center ${figure.figureClassName || 'max-w-xs mx-auto'}`}>
          <div className={figure.imageContainerClassName || 'rounded-lg overflow-hidden shadow-xl border border-gray-200 bg-gray-50 p-2'}>
            <Image 
              src={figure.src}
              alt={figure.alt}
              width={figure.imageWidth || 300} 
              height={figure.imageHeight || 200} 
              className={`w-full h-auto ${figure.imageClassName || 'object-contain'}`}
              onError={(e) => e.target.src = '/he-styles-preview.png'} // Fallback image
            />
          </div>
          {figure.caption && <figcaption className={`mt-2 text-sm text-gray-600 italic ${figure.captionClassName || ''}`}>{figure.caption}</figcaption>}
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
  Separator
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

  // Icon mapping for components that use it (e.g., IconFeatureGrid items)
  if (processedProps.iconName && iconMap[processedProps.iconName]) {
    processedProps.icon = React.createElement(iconMap[processedProps.iconName], { className: 'w-6 h-6' });
  }
  if (Array.isArray(processedProps.items)) {
    processedProps.items = processedProps.items.map(item => {
      if (item.iconName && iconMap[item.iconName]) {
        return { ...item, icon: React.createElement(iconMap[item.iconName], { className: 'w-5 h-5' }) };
      }
      return item;
    });
  }
  if (processedProps.icon && typeof processedProps.icon === 'string' && iconMap[processedProps.icon]) {
     processedProps.icon = React.createElement(iconMap[processedProps.icon], { className: 'w-6 h-6' });
  }
  
  // Special handling for IconFeatureGrid data transformation
  if (block.componentName === 'IconFeatureGrid' && block.props.useDerivedCategories) {
    processedProps.features = derivedCategoriesData.map(cat => ({
      ...cat, // name, description
      icon: iconMap[cat.iconName] ? React.createElement(iconMap[cat.iconName], {className: 'w-8 h-8 mb-2 text-indigo-600'}) : null,
      // title is used as key in IconFeatureGrid, ensure it exists
      title: cat.name // Ensure title is mapped for key prop
    }));
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
           <Bars3Icon className="h-6 w-6 text-gray-500 cursor-grab" aria-label="Drag to reorder"/>
        </div>
        <ComponentToRender {...processedProps} />
      </div>
    );
  }

  return <ComponentToRender {...processedProps} />;
} 