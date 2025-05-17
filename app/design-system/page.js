'use client';

import React from 'react';
import SectionTitle from '../components/design-system/SectionTitle';
import Button from '../components/design-system/Button';
import Callout from '../components/design-system/Callout';
import CheckListCard from '../components/design-system/CheckListCard';
import ImageGallery from '../components/design-system/ImageGallery';
import ListItem from '../components/design-system/ListItem';
import Quote from '../components/design-system/Quote';
import FeatureCard from '../components/design-system/FeatureCard';
import CardGrid from '../components/design-system/CardGrid';
import ImageCarousel from '../components/design-system/ImageCarousel';
import HeroSplitLayout from '../components/design-system/HeroSplitLayout';
import StylePreviewCard from '../components/design-system/StylePreviewCard';
import IconFeatureGrid from '../components/design-system/IconFeatureGrid';
import IconFeatureItem from '../components/design-system/IconFeatureItem';

// Helpers from dynamic-page-renderer might be needed for some component props or iconMap
import { iconMap } from '../case-study/dynamic-page-renderer';
import {
  LightBulbIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon, CheckCircleIcon, CodeBracketIcon, 
  UsersIcon, ShieldCheckIcon, LinkIcon, ArrowDownTrayIcon, ChartBarIcon, TableCellsIcon, ComputerDesktopIcon, MapIcon
} from '@heroicons/react/24/outline';

import { HtmlContent, VideoComponent, StylePreviewCardGrid, CheckListCardGrid, ImageFigureGroup, ButtonGroup, Separator } from '../case-study/dynamic-page-renderer';

const FallbackImage = '/he-styles-preview.png';

export default function DesignSystemPage() {
  const commonImageOnError = (e) => {
    e.target.src = FallbackImage;
  };

  const sampleImages = [
    { src: '/case-study-homedetails.png', alt: 'Sample Image 1', caption: 'Home Details', onError: commonImageOnError },
    { src: '/case-study-filtersonly.png', alt: 'Sample Image 2', caption: 'Filters Only', onError: commonImageOnError },
    { src: '/ui-cards-view.png', alt: 'Sample Image 3', caption: 'UI Cards View', onError: commonImageOnError },
  ];
  
  const sampleCarouselImages = [
    { src: "/homes-illustration/loverscocoon.webp", caption: "Style: Lovers Cocoon", alt: "Lovers Cocoon Home", onError: commonImageOnError },
    { src: "/homes-illustration/home-extravaganzza.jpg", caption: "Style: Supercharged Modern", alt: "Supercharged Modern Home", onError: commonImageOnError },
    { src: "/homes-illustration/rustic.webp", caption: "Style: Rustic Charm", alt: "Rustic Home", onError: commonImageOnError },
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <SectionTitle eyebrow="Showcase" className="mb-12 text-center">
        Design System Components
      </SectionTitle>

      {/* SectionTitle */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">SectionTitle</h2>
        <SectionTitle eyebrow="01" className="mb-2">This is a Section Title</SectionTitle>
        <SectionTitle>Title Without Eyebrow</SectionTitle>
      </div>

      {/* Button */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Button</h2>
        <div className="flex gap-4 items-center">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button href="/about">Link Button (Primary)</Button>
          <Button href="/case-study" variant="secondary">Link Button (Secondary)</Button>
          <Button variant="primary" icon={<LinkIcon className="w-5 h-5" />}>Primary With Icon</Button>
          <Button variant="secondary" icon={<CheckCircleIcon className="w-5 h-5" />} iconPosition="right">Secondary Icon Right</Button>
        </div>
      </div>

      {/* Callout */}
      <div className="p-6 border rounded-lg shadow-sm space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Callout</h2>
        <Callout type="info" title="Info Callout" icon={<LightBulbIcon className="w-6 h-6"/>}>This is an informational message.</Callout>
        <Callout type="success" title="Success Callout" icon={<CheckCircleIcon className="w-6 h-6"/>}>The operation was successful.</Callout>
        <Callout type="warning" title="Warning Callout" icon={<ExclamationTriangleIcon className="w-6 h-6"/>}>This is a warning message.</Callout>
        <Callout type="fail" title="Fail/Error Callout" icon={<ExclamationTriangleIcon className="w-6 h-6"/>}>An error occurred.</Callout>
        <Callout type="question" title="Question Callout" icon={<QuestionMarkCircleIcon className="w-6 h-6"/>}>Do you have any questions?</Callout>
        <Callout type="secure" title="Secure Callout" icon={<ShieldCheckIcon className="w-6 h-6"/>}>This information is secure.</Callout>
      </div>
      
      {/* ListItem */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">ListItem</h2>
        <ul className="space-y-2">
          <ListItem text="Simple list item." />
          <ListItem text="List item with custom props." className="text-blue-600 font-medium" />
          <ListItem>List item as children</ListItem>
        </ul>
      </div>
      
      {/* Quote */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Quote</h2>
        <Quote author="John Doe" source="Source Magazine">
          This is an inspiring quote that shares some wisdom. It can span multiple lines and still look great.
        </Quote>
      </div>

      {/* CheckListCard */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">CheckListCard</h2>
        <div className="max-w-md">
        <CheckListCard 
          title="Feature Checklist"
          icon={<CheckCircleIcon className="w-10 h-10 text-green-500" />}
          items={[
            { label: "Feature One", checked: true },
            { label: "Feature Two", checked: true },
            { label: "Feature Three", checked: false },
            { label: "A much longer feature description to check wrapping", checked: true }
          ]}
        />
        </div>
      </div>
      
      {/* StylePreviewCard */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">StylePreviewCard</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StylePreviewCard 
            styleName="Lovers Cocoon" 
            imageUrl="/homes-illustration/loverscocoon.webp" 
            imageAlt="Lovers Cocoon Style"
            onError={commonImageOnError}
          />
          <StylePreviewCard 
            styleName="Rustic Charm" 
            imageUrl="/homes-illustration/rustic.webp" 
            imageAlt="Rustic Charm Style"
            onError={commonImageOnError}
          />
           <StylePreviewCard 
            styleName="Missing Image" 
            imageUrl="/non-existent-image.webp" 
            imageAlt="Non Existent Image"
            onError={commonImageOnError}
          />
        </div>
      </div>

      {/* FeatureCard */}
       <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">FeatureCard</h2>
        <div className="max-w-sm">
          <FeatureCard 
            image="/case-study-homedetails.png"
            badge="Featured"
            title="Amazing Feature"
            description="This card highlights an amazing feature with a badge, title, and description."
            onError={commonImageOnError}
          />
        </div>
      </div>

      {/* CardGrid */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">CardGrid</h2>
        <CardGrid 
          cards={[
            { image: "/case-study-homedetails.png", badge: "Insight", title: "Card 1", description: "Description for card 1.", onError: commonImageOnError },
            { image: "/case-study-filtersonly.png", badge: "Challenge", title: "Card 2", description: "Description for card 2.", onError: commonImageOnError },
            { image: "/ui-cards-view.png", badge: "Solution", title: "Card 3", description: "Description for card 3.", onError: commonImageOnError },
            { image: "/non-existent-image.png", badge: "Fallback", title: "Card 4 (Fallback)", description: "This card will use a fallback image.", onError: commonImageOnError },
          ]}
        />
      </div>

      {/* ImageGallery */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">ImageGallery</h2>
        <ImageGallery images={sampleImages} />
        <h3 className="text-xl font-medium mt-6 mb-2">Gallery with Fallback</h3>
        <ImageGallery images={[...sampleImages, {src: '/broken.png', alt: 'Broken image', caption: 'This uses fallback', onError: commonImageOnError}]} />
      </div>

      {/* ImageCarousel */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">ImageCarousel</h2>
        <div className="max-w-2xl mx-auto">
          <ImageCarousel images={sampleCarouselImages} />
        </div>
         <h3 className="text-xl font-medium mt-6 mb-2">Carousel with Fallback</h3>
         <div className="max-w-2xl mx-auto">
          <ImageCarousel images={[...sampleCarouselImages, {src: '/broken.png', alt: 'Broken image', caption: 'This uses fallback', onError: commonImageOnError}]} />
        </div>
      </div>
      
      {/* IconFeatureItem (usually part of IconFeatureGrid) */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">IconFeatureItem</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <IconFeatureItem 
            icon={<LightBulbIcon className="w-8 h-8 text-indigo-600" />}
            title="Standalone Feature"
            description="This is a single feature item, often used within IconFeatureGrid."
          />
           <IconFeatureItem 
            iconSrc="/icons/lightbulb.png" // Example with iconSrc, will likely fail as path might be wrong
            iconAlt="Lightbulb"
            title="Feature with Image Icon"
            description="This item uses an image source for its icon (path needs to be correct)."
            onError={commonImageOnError}
          />
        </div>
      </div>

      {/* IconFeatureGrid */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">IconFeatureGrid</h2>
        <IconFeatureGrid 
          items={[
            { icon: <LightBulbIcon className="w-8 h-8 text-indigo-600" />, title: "AI Classification", description: "Leverage image recognition for styles." },
            { icon: <TableCellsIcon className="w-8 h-8 text-indigo-600" />, title: "Intuitive Navigation", description: "Easy browsing and filtering." },
            { icon: <UsersIcon className="w-8 h-8 text-indigo-600" />, title: "Collaborative Validation", description: "Team-based AI refinement." },
          ]}
        />
         <h3 className="text-xl font-medium mt-6 mb-2">Grid using iconName (via iconMap)</h3>
         <IconFeatureGrid 
          items={[
            { iconName: "ShieldCheckIcon", iconProps: { className: "w-8 h-8 text-red-500" }, title: "Secure Access", description: "Google OAuth for team members." },
            { iconName: "ArrowDownTrayIcon", title: "Data Export", description: "Export classified data." },
            { iconName: "ChartBarIcon", title: "Data-Driven Discovery", description: "Identify emerging trends.", icon: iconMap["ChartBarIcon"] ? React.createElement(iconMap["ChartBarIcon"], {className: 'w-8 h-8 text-blue-500'}) : null },
          ]}
        />
      </div>

      {/* HeroSplitLayout */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">HeroSplitLayout</h2>
        <HeroSplitLayout
          title="Hero Title Goes Here"
          subtitle="An engaging subtitle to draw attention."
          text="Some descriptive text explaining the main value proposition. This can be a React node for more complex content."
          imageSrc="/case-study-screenshot-prototype.png"
          imageAlt="Hero Image Alt Text"
          imagePosition="right"
          buttons={[
            <Button key="1" variant="primary" href="#">Get Started</Button>,
            <Button key="2" variant="secondary" href="#">Learn More</Button>,
          ]}
          backgroundColor="bg-slate-50"
          onError={commonImageOnError}
        />
        <HeroSplitLayout
          title="Hero with Image Left"
          subtitle="Another example"
          text="Text can also be a simple string, or an array of strings for multiple paragraphs."
          imageSrc="/ui-cards-view.png"
          imageAlt="Hero Image Alt Text"
          imagePosition="left"
          backgroundColor="bg-sky-50"
          className="mt-8"
          onError={commonImageOnError}
        />
      </div>

      {/* --- Components from dynamic-page-renderer.js --- */}
      <SectionTitle eyebrow="Dynamic Page Helpers" className="my-12 text-center">
        Helper Components for Dynamic Rendering
      </SectionTitle>

      {/* HtmlContent */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">HtmlContent</h2>
        <h3 className="text-lg font-medium mt-4 mb-2">Paragraphs:</h3>
        <HtmlContent 
          paragraphs={[
            "This is a simple paragraph.",
            ["This paragraph has ", { format: "strong", text: "bold text" }, " and ", { format: "italic", text: "italic text" }, "."],
          ]}
          className="space-y-2 text-gray-700"
        />
        <h3 className="text-lg font-medium mt-4 mb-2">Elements (p, ul, h2):</h3>
        <HtmlContent 
          elements={[
            { type: "h2", content: "A Subheading via HtmlContent", className: "text-xl font-semibold text-gray-800 mt-4 mb-2" },
            { type: "p", content: ["This is a paragraph within an elements array, with a ", {format: "strong", text: "strong part"}, "."] },
            { 
              type: "ul", 
              className: "list-disc list-inside space-y-1 text-gray-600 pl-4", 
              items: ["List item 1", ["List item 2 with ", {format: "italic", text: "emphasis"}], "List item 3"]
            }
          ]}
          className="space-y-3"
        />
        <h3 className="text-lg font-medium mt-4 mb-2">ListItems prop:</h3>
        <HtmlContent 
            listItems={[
                { text: "ListItem via HtmlContent (simple string)." },
                { text: ["ListItem with ", {"format": "strong", "text": "formatted text"}, " via HtmlContent."] },
                { text: "Another item", props: { className: "text-purple-600" } }
            ]}
            className="space-y-1 text-sm text-gray-500"
        />
      </div>
      
      {/* VideoComponent */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">VideoComponent</h2>
        <div className="max-w-xl mx-auto">
          <VideoComponent 
            containerClassName="aspect-video w-full rounded-lg overflow-hidden shadow-lg border border-gray-200"
            videoClassName="w-full h-full object-cover"
            src="/video.mp4" // Make sure this video exists
            autoPlay={false} // Set to false for design system page to avoid multiple videos playing
            muted={true}
            loop={true}
            playsInline={true}
            controls={true}
            fallbackText="Your browser does not support the video tag."
          />
        </div>
      </div>

      {/* StylePreviewCardGrid (uses StylePreviewCard internally) */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">StylePreviewCardGrid</h2>
        <StylePreviewCardGrid 
          wrapperClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-6"
          styles={[
            { styleName: "Lovers Cocoon", imageUrl: "/homes-illustration/loverscocoon.webp", imageAlt: "Lovers Cocoon", onError: commonImageOnError },
            { styleName: "Sport Court", imageUrl: "/homes-illustration/sportcourt.webp", imageAlt: "Sport Court", onError: commonImageOnError },
            { styleName: "Rustic Charm", imageUrl: "/homes-illustration/rustic.webp", imageAlt: "Rustic Charm", onError: commonImageOnError },
            { styleName: "Full Light", imageUrl: "/homes-illustration/fulllight.webp", imageAlt: "Full Light", onError: commonImageOnError },
            { styleName: "Broken Image Style", imageUrl: "/broken.webp", imageAlt: "Broken Style", onError: commonImageOnError },
          ]}
        />
      </div>
      
      {/* CheckListCardGrid (uses CheckListCard internally) */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">CheckListCardGrid</h2>
        <CheckListCardGrid 
          wrapperClassName="grid md:grid-cols-2 gap-8 items-start my-6"
          cards={[
            { title: "Quality Criteria", iconName: "CheckCircleIcon", iconProps: {className:"w-10 h-10 text-green-500"}, items: [{ label: "Clear Visuals", checked: true }, { label: "Coherent Theme", checked: true }] },
            { title: "User Needs", iconName: "UsersIcon", iconProps: {className:"w-8 h-8 text-blue-500"}, items: [{ label: "Ambiance Grasp", checked: true }, { label: "Aesthetic Filter", checked: true }] }
          ]}
        />
      </div>

      {/* ImageFigureGroup */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">ImageFigureGroup</h2>
        <ImageFigureGroup 
          wrapperClassName="flex flex-col md:flex-row gap-6 items-start justify-center my-6"
          figures={[
            { src: "/validation-1.png", alt: "Validation UI 1", caption: "Main card view.", imageWidth: 250, imageHeight: 180, onError: commonImageOnError },
            { src: "/validation-2.png", alt: "Validation UI 2", caption: "Correction dropdown.", imageWidth: 250, imageHeight: 180, onError: commonImageOnError },
            { src: "/validation-3.png", alt: "Validation UI 3", caption: "Style details example.", imageWidth: 250, imageHeight: 180, onError: commonImageOnError },
            { src: "/broken.png", alt: "Broken Figure", caption: "This uses fallback.", imageWidth: 250, imageHeight: 180, onError: commonImageOnError },
          ]}
        />
      </div>
      
      {/* ButtonGroup (uses Button internally) */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">ButtonGroup</h2>
        <ButtonGroup 
          wrapperClassName="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6"
          buttons={[
            { children: "Primary Action", href: "#", variant: "primary" },
            { children: "Secondary Action", href: "#", variant: "secondary" },
            { children: "External Link", href: "https://example.com", variant: "primary", iconName: "LinkIcon" }
          ]}
        />
      </div>

      {/* Separator */}
      <div className="p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Separator</h2>
        <p>Content before separator.</p>
        <Separator className="my-8 border-t border-dashed border-gray-300" />
        <p>Content after separator (dashed example).</p>
        <Separator className="my-8 border-t-2 border-indigo-500" />
        <p>Content after separator (colored solid example).</p>
      </div>

    </div>
  );
} 