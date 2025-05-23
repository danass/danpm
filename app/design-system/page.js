'use client';

import React, { Suspense } from 'react';
import DebugHighlightWrapper from '../components/dev/DebugHighlightWrapper';

// Design System Components
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
import MobileScreenLayout from '../components/design-system/MobileScreenLayout';
import MobileScreenGrid from '../components/design-system/MobileScreenGrid';
import FeatureMobileScreens from '../components/design-system/FeatureMobileScreens';
import TextSection from '../components/design-system/TextSection';
import ContentCard from '../components/design-system/ContentCard';
import Paragraph from '../components/design-system/Paragraph';
import PlaceholderImage from '../components/design-system/PlaceholderImage';
import Section from '../components/design-system/Section';
import ExperienceItem from '../components/design-system/ExperienceItem';
import EducationItem from '../components/design-system/EducationItem';
import SkillItem from '../components/design-system/SkillItem';
import ImageCard from '../components/design-system/ImageCard';

// Helpers & Components from dynamic-page-renderer
// Note: CheckListCardGrid is imported here, but CheckListCard itself should be direct.
// Make sure CheckListCard is NOT in the import list below
import { iconMap, HtmlContent, StylePreviewCardGrid, CheckListCardGrid, ImageFigureGroup, ButtonGroup, Separator } from '../case-study/dynamic-page-renderer'; 

// Heroicons
import {
  LightBulbIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon, CheckCircleIcon, CodeBracketIcon,
  UsersIcon, ShieldCheckIcon, LinkIcon, ArrowDownTrayIcon, ChartBarIcon, TableCellsIcon, ComputerDesktopIcon, MapIcon,
  BriefcaseIcon, AcademicCapIcon, SparklesIcon
} from '@heroicons/react/24/outline';

// Add a fallback component for Suspense
function DesignSystemFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-xl font-semibold text-gray-700">Loading Design System...</p>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <Suspense fallback={<DesignSystemFallback />}>
      <DesignSystemContent />
    </Suspense>
  );
}

// Move the main content to a separate component
function DesignSystemContent() {
  const sampleImages = [
    { src: '/case-study-homedetails.png', alt: 'Sample Image 1', caption: 'Home Details' },
    { src: '/case-study-filtersonly.png', alt: 'Sample Image 2', caption: 'Filters Only' },
    { src: '/ui-cards-view.png', alt: 'Sample Image 3', caption: 'UI Cards View' },
  ];
  const sampleCarouselImages = [
    { src: "/homes-illustration/loverscocoon.webp", caption: "Style: Lovers Cocoon", alt: "Lovers Cocoon Home" },
    { src: "/homes-illustration/home-extravaganzza.jpg", caption: "Style: Supercharged Modern", alt: "Supercharged Modern Home" },
    { src: "/homes-illustration/rustic.webp", caption: "Style: Rustic Charm", alt: "Rustic Home" },
  ];
  const sampleMobileScreens = [
    { title: "Suivez vos voyages étape par étape", subtitle: "Consultez le programme détaillé de votre voyage", description: "avec toutes vos réservations.", imageSrc: "/case-study-homedetails.png", imageAlt: "Travel app details screen" },
    { title: "Un message ne s&apos;exprime pas qu&apos;avec des mots", subtitle: "Partage de photos, vidéos et offres personnalisées : la messagerie évolue.", imageSrc: "/case-study-filtersonly.png", imageAlt: "Messaging screen" },
    { title: "Votre profil fait peau neuve", subtitle: "Modifiez votre profil, partagez vos voyages passés et retrouvez des connaissances.", imageSrc: "/ui-cards-view.png", imageAlt: "Profile screen" }
  ];
  const featureMobileScreensData = [
    { title: "Modifiez vos annonces en toute simplicité", description: "Ajustez facilement le lieu, les prix et autres informations sur la page Annonces.", imageSrc: "/case-study-homedetails.png", imageAlt: "Property edit screen" },
    { title: "Un aperçu de vos performances", description: "Obtenez un aperçu rapide de vos revenus et informations en haut de l'écran.", imageSrc: "/case-study-filtersonly.png", imageAlt: "Performance dashboard screen" }
  ];
  const sampleExperience = { icon: <BriefcaseIcon className="w-8 h-8 text-indigo-600" />, company: "Sample Company Inc.", roles: [{ title: 'Senior Product Manager', duration: 'Jan 2022 - Present' }, { title: 'Product Manager', duration: 'Jun 2020 - Dec 2021' }], location: "San Francisco, CA", description: "Led product strategy and execution for a suite of B2B SaaS products." };
  const sampleEducation = { icon: <AcademicCapIcon className="w-8 h-8 text-indigo-600" />, institution: "University of Example", degree: "M.S. in Human-Computer Interaction", duration: "2018 - 2020" };
  const sampleSkills = [ { icon: <SparklesIcon className="w-6 h-6 text-indigo-500" />, skill: "Product Discovery" }, { icon: <SparklesIcon className="w-6 h-6 text-indigo-500" />, skill: "UX Research" }, { icon: <SparklesIcon className="w-6 h-6 text-indigo-500" />, skill: "Agile Leadership" }];

  // Helper for repeated section wrapper
  const ComponentShowcase = ({ title, children }) => (
    <div className="p-6 border rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">{title}</h2>
      {/* <DebugHighlightWrapper componentName={title}> */}
        {children}
      {/* </DebugHighlightWrapper> */}
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12 space-y-16"> {/* Increased main spacing */}
      <header className="text-center my-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Minimalist Design System</h1>
        <Paragraph textSize="text-xl" textColor="text-gray-600" className="max-w-3xl mx-auto">
          Welcome to the component library. This page showcases the reusable UI elements that form the building blocks of this application. Each component is designed to be flexible, accessible, and aligned with a modern, clean aesthetic.
        </Paragraph>
      </header>

      {/* --- Section 01: Core Elements / Atoms --- */}
      <section>
        <SectionTitle eyebrow="01" titleColor="text-gray-800" className="mb-10 text-center">Core Elements</SectionTitle>
        <div className="space-y-10"> {/* Spacing between showcases */}
          <ComponentShowcase title="SectionTitle">
            <DebugHighlightWrapper componentName="SectionTitle">
              <SectionTitle eyebrow="Eyebrow Example" className="mb-3">This is a Section Title</SectionTitle>
            </DebugHighlightWrapper>
            <DebugHighlightWrapper componentName="SectionTitle">
              <SectionTitle>Title Without Eyebrow</SectionTitle>
            </DebugHighlightWrapper>
          </ComponentShowcase>
          
          <ComponentShowcase title="Paragraph">
            <div className="max-w-2xl space-y-4">
              <DebugHighlightWrapper componentName="Paragraph">
                <Paragraph>This is a default paragraph with standard styling.</Paragraph>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Paragraph">
                <Paragraph textColor="text-indigo-700" textSize="text-lg" spacing="mb-6">This paragraph has custom text color, size, and spacing.</Paragraph>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Paragraph">
                <Paragraph textColor="text-gray-500" textSize="text-sm" className="italic">A smaller, gray, italic paragraph.</Paragraph>
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Button">
            <div className="flex flex-wrap gap-4 items-center">
              <DebugHighlightWrapper componentName="Button">
                <Button variant="primary">Primary Button</Button>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Button">
                <Button variant="secondary">Secondary Button</Button>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Button">
                <Button variant="ghost">Ghost Button</Button>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Button">
                <Button href="/about">Link Button</Button>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Button">
                <Button variant="primary" icon={<LinkIcon className="w-5 h-5" />}>Icon Left</Button>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Button">
                <Button variant="secondary" icon={<CheckCircleIcon className="w-5 h-5" />} iconPosition="right">Icon Right</Button>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Button">
                <Button variant="primary" icon={<LinkIcon className="w-5 h-5" />} />
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="ListItem">
            <ul className="space-y-2 max-w-md">
              <DebugHighlightWrapper componentName="ListItem">
                <ListItem text="Simple list item." />
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="ListItem">
                <ListItem text="List item with custom props." className="text-blue-600 font-medium" />
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="ListItem">
                <ListItem>List item as children</ListItem>
              </DebugHighlightWrapper>
            </ul>
          </ComponentShowcase>
        </div>
      </section>

      {/* --- Section 02: Layout Components --- */}
      <section>
        <SectionTitle eyebrow="02" titleColor="text-gray-800" className="mt-20 mb-10 text-center">Layout Components</SectionTitle>
        <div className="space-y-10">
          <ComponentShowcase title="Section (Wrapper)">
            <DebugHighlightWrapper componentName="Section">
              <Section className="bg-slate-100 !py-8 !max-w-none rounded-lg">
                <h3 className="text-xl font-semibold text-center text-slate-700">This content is inside a &apos;Section&apos; component.</h3>
                <Paragraph className="text-center text-slate-600 mt-2 max-w-xl mx-auto">It provides consistent max-width, horizontal padding, and vertical padding for content blocks, ensuring visual rhythm.</Paragraph>
              </Section>
            </DebugHighlightWrapper>
          </ComponentShowcase>

          <ComponentShowcase title="TextSection">
            <DebugHighlightWrapper componentName="TextSection">
              <TextSection title="Default Text Section" subtitle="With a clear title and engaging subtitle." />
            </DebugHighlightWrapper>
            <DebugHighlightWrapper componentName="TextSection">
              <TextSection title="Centered & Styled" subtitle="This one is centered with a custom background color." textAlign="text-center" backgroundColor="bg-sky-50" className="mt-6 rounded-lg p-6" />
            </DebugHighlightWrapper>
          </ComponentShowcase>
          
          <ComponentShowcase title="HeroSplitLayout">
            <DebugHighlightWrapper componentName="HeroSplitLayout">
              <HeroSplitLayout
                title="Engaging Hero Title Here"
                subtitle="An impactful subtitle to immediately capture user attention and convey value."
                text="Some descriptive text explaining the main value proposition. This could also be a React node for more complex content structures, like a list or a small form."
                imageSrc="/case-study-screenshot-prototype.png"
                imageAlt="Abstract representation of product interface"
                imagePosition="right"
                ctaButton={{ text: "Learn More", href:"#", variant: "primary"}}
                backgroundColor="bg-gray-50"
                className="rounded-xl overflow-hidden"
              />
            </DebugHighlightWrapper>
          </ComponentShowcase>
        </div>
      </section>

      {/* --- Section 03: Informational & Feedback --- */}
      <section>
        <SectionTitle eyebrow="03" titleColor="text-gray-800" className="mt-20 mb-10 text-center">Informational & Feedback</SectionTitle>
        <div className="space-y-10">
          <ComponentShowcase title="Callout">
            <div className="space-y-4">
              <DebugHighlightWrapper componentName="Callout">
                <Callout type="info" title="Informational Callout" icon={<LightBulbIcon className="w-6 h-6" />}>This is an informational message to guide the user.</Callout>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Callout">
                <Callout type="success" title="Success!" icon={<CheckCircleIcon className="w-6 h-6" />}>The operation was completed successfully.</Callout>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Callout">
                <Callout type="warning" title="Warning Advisory" icon={<ExclamationTriangleIcon className="w-6 h-6" />}>Consider this important warning before proceeding.</Callout>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="Callout">
                <Callout type="fail" title="Error / Failure" icon={<ExclamationTriangleIcon className="w-6 h-6" />}>Something went wrong, and the action could not be completed.</Callout>
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="Quote">
            <DebugHighlightWrapper componentName="Quote">
              <Quote author="A Wise Person" source="Their Life Experience" className="max-w-2xl">
                This is an inspiring quote that shares some wisdom. It can span multiple lines and still look great, providing a moment of reflection or emphasis.
              </Quote>
            </DebugHighlightWrapper>
          </ComponentShowcase>
          
          <ComponentShowcase title="PlaceholderImage">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <DebugHighlightWrapper componentName="PlaceholderImage">
                <div className="aspect-video bg-gray-100 rounded-md"><PlaceholderImage message="Default" /></div>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="PlaceholderImage">
                <div className="aspect-square bg-gray-100 rounded-md"><PlaceholderImage message="Device" icon="device" /></div>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="PlaceholderImage">
                <div className="h-32 bg-gray-100 rounded-md"><PlaceholderImage message="Document" icon="document" /></div>
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="PlaceholderImage">
                <div className="w-full h-24 bg-gray-100 rounded-md"><PlaceholderImage message="Error" icon="error" /></div>
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>
        </div>
      </section>

      {/* --- Section 04: Card Components --- */}
      <section>
        <SectionTitle eyebrow="04" titleColor="text-gray-800" className="mt-20 mb-10 text-center">Card Components</SectionTitle>
        <div className="space-y-10">
          <ComponentShowcase title="ContentCard">
            <div className="grid md:grid-cols-2 gap-6">
              <DebugHighlightWrapper componentName="ContentCard">
                <ContentCard title="Informative Content" subtitle="Key details summarized" description="This card is ideal for presenting concise blocks of information with a clear hierarchy." />
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="ContentCard">
                <ContentCard title="Styled Content Card" subtitle="With custom background" description="Backgrounds and text alignment can be adjusted for varied presentation needs." backgroundColor="bg-indigo-50" textAlign="text-left" />
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="FeatureCard">
            <div className="max-w-sm"> {/* Constrain width for single card demo */}
              <DebugHighlightWrapper componentName="FeatureCard">
                <FeatureCard image="/case-study-homedetails.png" badge="New Feature" title="Interactive Home Previews" description="Explore home details with our new interactive preview mode, offering a richer visual experience." />
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>
          
          <ComponentShowcase title="StylePreviewCard (Used in StylePreviewCardGrid)">
             <Paragraph textColor="text-gray-600" textSize="text-sm" className="mb-4">Individual StylePreviewCards are typically used within a StylePreviewCardGrid (shown under &apos;Dynamic Helpers&apos;). Here&apos;s how one looks:</Paragraph>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="max-w-xs"> {/* Wrap for consistent sizing in demo */}
                <DebugHighlightWrapper componentName="StylePreviewCard">
                  <StylePreviewCard styleName="Lovers Cocoon" imageUrl="/homes-illustration/loverscocoon.webp" imageAlt="Lovers Cocoon Style" />
                </DebugHighlightWrapper>
              </div>
            </div>
          </ComponentShowcase>
          
          <ComponentShowcase title="CheckListCard (Used in CheckListCardGrid)">
             <Paragraph textColor="text-gray-600" textSize="text-sm" className="mb-4">Individual CheckListCards are typically used within a CheckListCardGrid (shown under &apos;Dynamic Helpers&apos;). Here&apos;s how one looks:</Paragraph>
            <div className="max-w-md">
              <DebugHighlightWrapper componentName="CheckListCard">
                <CheckListCard items={[{ label: "Item One Checked" }, { label: "Item Two Checked" }, { label: "A much longer item description to verify text wrapping and visual balance within the card." }]} />
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>

          <ComponentShowcase title="CardGrid">
            <DebugHighlightWrapper componentName="CardGrid">
              <CardGrid cards={[
                  { image: "/case-study-homedetails.png", badge: "Insight", title: "Overlapping Card 1", description: "Presents key information with an engaging visual stack." },
                  { image: "/case-study-filtersonly.png", badge: "Challenge", title: "Overlapping Card 2", description: "Highlights a challenge or a problem statement effectively." },
                  { image: "/ui-cards-view.png", badge: "Solution", title: "Overlapping Card 3", description: "Showcases a solution or a positive outcome." },
                  { image: "/placeholder-image.png", badge: "Fallback", title: "Card with Fallback", description: "Demonstrates graceful image error handling." },
              ]} />
            </DebugHighlightWrapper>
          </ComponentShowcase>
        </div>
      </section>

      {/* --- Section 05: Media Display --- */}
      <section>
        <SectionTitle eyebrow="05" titleColor="text-gray-800" className="mt-20 mb-10 text-center">Media Display</SectionTitle>
        <div className="space-y-10">
          <ComponentShowcase title="ImageGallery">
            <DebugHighlightWrapper componentName="ImageGallery">
              <ImageGallery images={sampleImages} />
            </DebugHighlightWrapper>
            <h3 className="text-xl font-medium mt-8 mb-3 text-gray-700">Gallery with Fallback Image</h3>
            <DebugHighlightWrapper componentName="ImageGallery">
              <ImageGallery images={[...sampleImages, {src: '/this-image-is-intentionally-missing.webp', alt: 'Broken image example', caption: 'This image will use fallback'}]} />
            </DebugHighlightWrapper>
          </ComponentShowcase>

          <ComponentShowcase title="ImageCarousel">
            <div className="max-w-2xl mx-auto">
              <DebugHighlightWrapper componentName="ImageCarousel">
                <ImageCarousel images={sampleCarouselImages} navOutside={true} />
              </DebugHighlightWrapper>
            </div>
            <h3 className="text-xl font-medium mt-8 mb-3 text-gray-700">Carousel with Fallback & Inside Nav</h3>
            <div className="max-w-xl mx-auto">
              <DebugHighlightWrapper componentName="ImageCarousel">
                <ImageCarousel images={[...sampleCarouselImages, {src: '/this-image-is-intentionally-missing.webp', alt: 'Broken image example', caption: 'This image uses fallback'}]} navOutside={false} />
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>
          
          <ComponentShowcase title="ImageFigureGroup">
            <DebugHighlightWrapper componentName="ImageFigureGroup">
              <ImageFigureGroup figures={[
                { src: '/case-study-homedetails.png', caption: 'Caption for Image 1' },
                { src: '/case-study-filtersonly.png', caption: 'Another caption for Image 2' },
                { src: '/ui-cards-view.png', caption: 'And a final one for Image 3' },
              ]} />
            </DebugHighlightWrapper>
          </ComponentShowcase>
        </div>
      </section>

      {/* --- Section 06: Mobile-focused Components --- */}
      <section>
        <SectionTitle eyebrow="06" titleColor="text-gray-800" className="mt-20 mb-10 text-center">Mobile-focused Components</SectionTitle>
        <div className="space-y-10">
          <ComponentShowcase title="MobileScreenLayout">
            <DebugHighlightWrapper componentName="MobileScreenLayout">
              <MobileScreenLayout
                title="Organisez vos séjours"
                subtitle="Un aperçu de toutes vos réservations, passées et à venir."
                imageSrc="/case-study-homedetails.png"
                imageAlt="Mobile screen showing travel plans"
              />
            </DebugHighlightWrapper>
          </ComponentShowcase>
          
          <ComponentShowcase title="MobileScreenGrid">
            <DebugHighlightWrapper componentName="MobileScreenGrid">
              <MobileScreenGrid screens={sampleMobileScreens} />
            </DebugHighlightWrapper>
          </ComponentShowcase>

          <ComponentShowcase title="FeatureMobileScreens">
            <DebugHighlightWrapper componentName="FeatureMobileScreens">
              <FeatureMobileScreens 
                features={featureMobileScreensData}
                title="Host tools on the go"
                description="Access essential hosting features directly from the Airbnb app, anytime and anywhere."
                link={{ href: "#", text: "Explore hosting tools"}}
              />
            </DebugHighlightWrapper>
          </ComponentShowcase>
        </div>
      </section>
      
      {/* --- Section 07: Specialized Content & Info Display --- */}
      <section>
        <SectionTitle eyebrow="07" titleColor="text-gray-800" className="mt-20 mb-10 text-center">Specialized Content & Info Display</SectionTitle>
        <div className="space-y-10">
          <ComponentShowcase title="IconFeatureItem (Standalone)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
              <DebugHighlightWrapper componentName="IconFeatureItem">
                <IconFeatureItem icon={<LightBulbIcon className="w-10 h-10 text-indigo-600" />} title="Innovative Idea" description="A single feature item highlighting a key concept or service." />
              </DebugHighlightWrapper>
              <DebugHighlightWrapper componentName="IconFeatureItem">
                <IconFeatureItem icon={<ComputerDesktopIcon className="w-10 h-10 text-sky-600" />} title="Tech Integration" description="Showcases use of specific technology or platform features." />
              </DebugHighlightWrapper>
            </div>
          </ComponentShowcase>
          
          <ComponentShowcase title="IconFeatureGrid">
            <DebugHighlightWrapper componentName="IconFeatureGrid">
              <IconFeatureGrid items={[
                  { icon: <LightBulbIcon className="w-10 h-10 text-indigo-500" />, title: "Smart Classification", description: "Leverage AI image recognition for accurate style tagging." },
                  { icon: <TableCellsIcon className="w-10 h-10 text-indigo-500" />, title: "Intuitive Interface", description: "User-friendly browsing, filtering, and data interaction." },
                  { icon: <UsersIcon className="w-10 h-10 text-indigo-500" />, title: "Collaborative Input", description: "Team-based AI model refinement and validation workflows." },
                   { iconName: "ShieldCheckIcon", iconProps:{className:"w-10 h-10 text-indigo-500"}, title: "Secure & Reliable", description: "Built with security and data integrity as top priorities." },
                ]} backgroundColor="bg-slate-50" />
            </DebugHighlightWrapper>
          </ComponentShowcase>

          <ComponentShowcase title="ExperienceItem">
            <DebugHighlightWrapper componentName="ExperienceItem">
              <ExperienceItem {...sampleExperience} />
            </DebugHighlightWrapper>
          </ComponentShowcase>

          <ComponentShowcase title="EducationItem">
            <DebugHighlightWrapper componentName="EducationItem">
              <EducationItem {...sampleEducation} />
            </DebugHighlightWrapper>
          </ComponentShowcase>

          <ComponentShowcase title="SkillItem">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {sampleSkills.map((skill, index) => (
                <DebugHighlightWrapper key={index} componentName="SkillItem">
                  <SkillItem {...skill} />
                </DebugHighlightWrapper>
              ))}
              <SkillItem icon={<CodeBracketIcon className="w-6 h-6 text-teal-500"/>} skill="React & Next.js"/>
            </div>
          </ComponentShowcase>
        </div>
      </section>
      
      {/* --- Section 08: Dynamic Rendering Helpers --- */}
      <section>
        <SectionTitle eyebrow="08" titleColor="text-gray-800" className="mt-20 mb-10 text-center">Dynamic Rendering Helpers</SectionTitle>
        <div className="space-y-10">
          <ComponentShowcase title="HtmlContent">
            <DebugHighlightWrapper componentName="HtmlContent">
              <HtmlContent html="<p>This is <strong>HTML</strong> rendered from a string. Useful for CMS content. It supports basic tags like <em>italics</em>, <b>bold</b>, and <a href=&apos;#&apos; class=&apos;text-blue-600 hover:underline&apos;>links</a>.</p><ul><li>Item 1</li><li>Item 2</li></ul>" />
            </DebugHighlightWrapper>
          </ComponentShowcase>
          
          <ComponentShowcase title="StylePreviewCardGrid">
            <DebugHighlightWrapper componentName="StylePreviewCardGrid">
              <StylePreviewCardGrid styles={[
                { styleName: "Bohemian Rhapsody", imageUrl: "/homes-illustration/home-extravaganzza.jpg", imageAlt: "Bohemian Style" },
                { styleName: "Minimalist Dream", imageUrl: "/homes-illustration/minimalist.webp", imageAlt: "Minimalist Style" },
                { styleName: "Coastal Escape", imageUrl: "/homes-illustration/loverscocoon.webp", imageAlt: "Coastal Style" },
                { styleName: "Urban Jungle", imageUrl: "/homes-illustration/rustic.webp", imageAlt: "Urban Style" },
              ]} />
            </DebugHighlightWrapper>
          </ComponentShowcase>
          
          <ComponentShowcase title="CheckListCardGrid">
            <DebugHighlightWrapper componentName="CheckListCardGrid">
              <CheckListCardGrid cards={[
                  { title: "Feature Set A", items: [{ label: "Sub-feature A1" }, { label: "Sub-feature A2"}] },
                  { title: "Feature Set B", items: [{ label: "Sub-feature B1" }, { label: "Sub-feature B2"}, {label: "Sub-feature B3"}] },
              ]} />
            </DebugHighlightWrapper>
          </ComponentShowcase>

          <ComponentShowcase title="ButtonGroup">
            <DebugHighlightWrapper componentName="ButtonGroup">
              <ButtonGroup buttons={[
                { text: 'Primary Action', variant: 'primary', href: '#', iconName: 'ArrowDownTrayIcon' },
                { text: 'Secondary', variant: 'secondary', href: '#' },
                { text: 'Ghost Link', variant: 'ghost', href: '#', iconName: 'LinkIcon', iconPosition: 'right' },
              ]} />
            </DebugHighlightWrapper>
          </ComponentShowcase>

          <ComponentShowcase title="Separator">
            <Paragraph>Content before separator.</Paragraph>
            <DebugHighlightWrapper componentName="Separator">
              <Separator />
            </DebugHighlightWrapper>
            <Paragraph>Content after separator.</Paragraph>
          </ComponentShowcase>
        </div>
      </section>

      <ComponentShowcase title="ImageCard">
        <DebugHighlightWrapper componentName="ImageCard">
          <div className="max-w-md mx-auto">
            <ImageCard
              imageSrc="/case-study-homedetails.png"
              imageAlt="Sample image card"
              title="Design System Components"
              subtitle="A collection of reusable UI elements built with Next.js and Tailwind CSS"
            />
          </div>
        </DebugHighlightWrapper>
      </ComponentShowcase>

    </div>
  );
} 