'use client'

// import ImageGallery from '../components/design-system/ImageGallery'; // Removed import
import Callout from '../components/design-system/Callout';
import Quote from '../components/design-system/Quote';
import Button from '../components/design-system/Button';
import ListItem from '../components/design-system/ListItem';
import SectionTitle from '../components/design-system/SectionTitle';
import CheckListCard from '../components/design-system/CheckListCard';
import CardGrid from '../components/design-system/CardGrid';
import FeatureCard from '../components/design-system/FeatureCard';
import ImageCarousel from '../components/design-system/ImageCarousel';
import HeroSplitLayout from '../components/design-system/HeroSplitLayout';
import StylePreviewCard from '../components/design-system/StylePreviewCard';
import IconFeatureGrid from '../components/design-system/IconFeatureGrid';
import ImageGallery from '../components/design-system/ImageGallery'; // Re-added temporarily to ensure it's correctly used or removed
import { LightBulbIcon, ExclamationTriangleIcon, QuestionMarkCircleIcon, MagnifyingGlassIcon, ChartBarIcon, CheckCircleIcon, ArrowDownTrayIcon, MapIcon, LinkIcon, CodeBracketIcon, TableCellsIcon, UsersIcon, ShieldCheckIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// Réutilise Section, SectionTitle, CardGrid, FeatureCard, Avatar, Testimonial, Hero, CallToAction depuis use-case/page.js

function Section({ children, className = '' }) {
  return <section className={`w-full max-w-5xl mx-auto px-4 md:px-0 ${className}`}>{children}</section>;
}

// Helper for category names from CSV
function formatCategoryName(csvFileName) {
  return csvFileName
    .replace('Collection Image Similarity - ', '')
    .replace('.csv', '')
    .replace(/Styles|Amenities/g, '$& ') // Add space after Styles/Amenities
    .trim();
}

const derivedCategories = [
  { name: formatCategoryName('Styles Ancient.csv'), description: 'Homes with historical character and timeless appeal.', icon: <TableCellsIcon className="w-5 h-5 text-gray-500" /> },
  { name: formatCategoryName('Styles Family Friendly.csv'), description: 'Properties suitable for families with children.', icon: <TableCellsIcon className="w-5 h-5 text-gray-500" /> },
  { name: formatCategoryName('Styles Supercharged.csv'), description: 'Modern, high-tech, and luxurious homes.', icon: <TableCellsIcon className="w-5 h-5 text-gray-500" /> },
  { name: formatCategoryName('Amenities Ski.csv'), description: 'Residences with easy access to ski resorts or amenities.', icon: <TableCellsIcon className="w-5 h-5 text-gray-500" /> },
  { name: formatCategoryName('Styles Full light.csv'), description: 'Bright homes with abundant natural light.', icon: <TableCellsIcon className="w-5 h-5 text-gray-500" /> },
  { name: formatCategoryName('Styles Lovers cocoon.csv'), description: 'Romantic and cozy getaways for couples.', icon: <TableCellsIcon className="w-5 h-5 text-gray-500" /> },
];

export default function CaseStudyPage() {
  const introText = (
    <>
      <p>Project Context: HomeExchange Collection and the need to better understand users.</p>
      <p>My role and intention: to design a bridge between visual data and the teams.</p>
      <p>Problem: How can we make sense of home images to better understand our user profiles?</p>
      <p>Objectives: Create a tool to analyze, classify, validate, export — for the team's benefit.</p>
    </>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans">
      {/* 1. Introduction with HeroSplitLayout */}
      <HeroSplitLayout 
        title="Understanding Our Users Through Their Homes"
        subtitle="A Research Tool for HomeExchange Collection"
        text={introText}
        imageSrc="/case-study-screenshot-prototype.png"
        imageAlt="Screenshot of the HomeExchange Collection styles tool interface"
        imagePosition="right"
        backgroundColor="bg-gray-50"
        className="mb-20 md:mb-32 pt-12 md:pt-0"
      />

      {/* Video Section - Moved here */}
      <Section className="mb-12 md:mb-16 w-full -mt-16 md:-mt-20 relative z-0">
        <div className="aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-200">
          <video 
            className="w-full h-full object-cover"
            src="/video.mov" 
            autoPlay 
            muted 
            loop 
            playsInline 
            controls
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </Section>

      {/* 2. The initial intuition - CardGrid will be moved inside here */}
      <Section className="mb-20">
        <SectionTitle eyebrow="01">The Initial Intuition</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>Why can homes be a key to understanding personas?</p>
          <p>Initial observation: aesthetic diversity, weak signals in images.</p>
          <p>First hypothesis: can we identify coherent home styles and make them meaningful?</p>
        </div>
        
        {/* CardGrid moved here */}
        <div className="my-12 md:my-16"> {/* Added wrapper div for spacing */}
          <CardGrid
            cards={[
              {
                image: '/case-study-homedetails.png',
                badge: 'Initial Insight',
                title: 'The Styles Intuition',
                description: 'Homes as a reflection of our members\' personalities and expectations.'
              },
              {
                image: '/case-study-filtersonly.png',
                badge: 'Main Challenge',
                title: 'From Image to Data',
                description: 'Transforming the visual richness of homes into actionable data for the team.'
              },
              {
                image: '/ui-cards-view.png', 
                badge: 'Designed Solution',
                title: 'The Navigation Tool',
                description: 'An interface to explore, validate, and export style classifications.'
              }
            ]}
          />
        </div>

        <Callout 
          type="info" 
          title="Insight"
          icon={<LightBulbIcon className="w-6 h-6" />}
        >
          Insight: &quot;A very contemporary house with a mirror pool in the Landes region evokes a very different type of user than a renovated English cottage in Brittany.&quot;
        </Callout>
      </Section>

      {/* 3. Data collection & exploration */}
      <Section className="mb-20">
        <SectionTitle eyebrow="02">Data Collection & Exploration</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-6"> {/* Increased space-y for better readability */}
          <p>The journey began by understanding the landscape of available data. What raw materials did we have to work with? This involved an inventory of:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <ListItem text="Vast quantities of home photographs submitted by users." />
            <ListItem text="Associated metadata: textual descriptions, declared amenities, and existing (often broad) categorizations." />
            <ListItem text="Geolocational data, offering context about the home's environment." />
          </ul>
          <p>Our initial toolkit for sifting through this information included:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <ListItem text="Spreadsheet software (Excel/Google Sheets) for initial data organization and pattern spotting." />
            <ListItem text="Design tools (Figma) for manual image visualization, grouping, and moodboarding." />
            <ListItem text="Collaboration platforms (Notion, Google Drive) for sharing findings and documentation." />
          </ul>
          <p>Early explorations revealed a wide spectrum of home types, but also significant challenges. The primary hurdles included:</p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <ListItem text="Visual 'noise': Inconsistent image quality, staging, and lighting conditions." />
            <ListItem text="Data disparities: Variable levels of detail in descriptions and metadata." />
            <ListItem text="Subjectivity: The inherent difficulty in objectively categorizing aesthetic and experiential qualities." />
          </ul>
        </div>
        <Callout 
          type="info" 
          title="Key Insight"
          icon={<LightBulbIcon className="w-6 h-6" />}
          className="mb-8" // Added margin bottom
        >
          A critical early realization was the highly variable quality of user-submitted photos. Many were stunning, but others were poorly lit, cluttered, or didn't effectively showcase the home's style. This highlighted the need for robust filtering, cleaning, and potentially a guided upload process in the future to ensure data quality for analysis.
        </Callout>
        <Callout 
          type="fail" 
          title="Early Obstacle" // Changed title for clarity
          icon={<ExclamationTriangleIcon className="w-6 h-6" />}
        >
          Initial attempts to use existing metadata for fine-grained style classification proved insufficient. Tags were often too broad or inconsistently applied, leading to noisy and unreliable groupings. This underscored the necessity of deriving insights directly from the visual content of the images themselves.
        </Callout>
      </Section>

      {/* 4. Creation of visual categories */}
      <Section className="mb-20">
        <SectionTitle eyebrow="03">Visual Categories: Giving Meaning to Images</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>The first crucial step was to move beyond simple metadata and truly <span className="font-semibold">see</span> the homes through the eyes of our users. This involved manually sifting through thousands of photos to identify recurring visual themes and atmospheres that define different home styles.</p>
          <p>We started by creating broad categories based on common search terms and intuitive groupings (e.g., "beachfront," "city apartment," "rustic charm"). Then, we refined these into more evocative and specific "HomeExchange Styles." Each style was defined by a set of visual characteristics, example images, and a descriptive name that resonated with potential desires of our members.</p>
        </div>

        {/* START: IconFeatureGrid - Updated for App Features */}
        <IconFeatureGrid 
          className="my-12"
          items={[
            {
              icon: <LightBulbIcon className="w-8 h-8 text-indigo-600" />,
              title: 'AI-Powered Style Classification',
              description: 'Leverage image recognition (CLIP, ResNet) to automatically categorize homes into nuanced visual styles, moving beyond manual tagging.' 
            },
            {
              icon: <TableCellsIcon className="w-8 h-8 text-indigo-600" />,
              title: 'Intuitive Navigation Interface',
              description: 'Provide internal teams (CRM, Sales, Product) with a web-based tool to easily browse, filter, and visualize home style classifications.'
            },
            {
              icon: <UsersIcon className="w-8 h-8 text-indigo-600" />,
              title: 'Collaborative Validation Loop',
              description: 'Enable teams to validate or refute AI-generated classifications (True/False), directly contributing to the retraining and refinement of the algorithm.'
            },
            {
              icon: <ShieldCheckIcon className="w-8 h-8 text-indigo-600" />,
              title: 'Secure Team Access & Data Protection',
              description: 'Implement Google OAuth with domain restriction to ensure that the tool and its sensitive user data are accessible only by authorized internal personnel.'
            },
            {
              icon: <ArrowDownTrayIcon className="w-8 h-8 text-indigo-600" />,
              title: 'Targeted Data Export',
              description: 'Allow teams to export classified home data and insights in usable formats (e.g., CSV) for targeted marketing campaigns, product development, and sales strategies.'
            },
            {
              icon: <ChartBarIcon className="w-8 h-8 text-indigo-600" />,
              title: 'Data-Driven Category Discovery',
              description: 'Continuously analyze image data and validation feedback to identify emerging trends and automatically suggest new, relevant home style categories.'
            }
          ]}
        />
        {/* END: IconFeatureGrid Integration */}

        <div className="text-lg text-gray-700 mb-8 space-y-4 mt-10">
          <p>This initial taxonomy, although informal, became our first framework for trying to understand our users' lifestyles and aspirations through the aesthetics of their homes. Here are a few examples of the styles identified:</p>
        </div>

        {/* Style Previews */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
          <StylePreviewCard 
            styleName="Lovers Cocoon"
            imageUrl="/homes-illustration/loverscocoon.webp"
            imageAlt="Preview of Lovers Cocoon style home"
          />
          <StylePreviewCard 
            styleName="Sport court"
            imageUrl="/homes-illustration/sportcourt.webp"
            imageAlt="Preview of Supercharged Modern style home with a sport court"
          />
          <StylePreviewCard 
            styleName="Rustic Charm"
            imageUrl="/homes-illustration/rustic.webp"
            imageAlt="Preview of Rustic Charm style home"
          />
          <StylePreviewCard 
            styleName="Full Light "
            imageUrl="/homes-illustration/fulllight.webp"
            imageAlt="Preview of Full Light style home"
          />
        </div>
        
        <ImageCarousel 
          className="my-12"
          images={[
            { src: '/homes-illustration/loverscocoon.webp', caption: 'Style: Lovers Cocoon', alt: 'Lovers Cocoon Home' },
            { src: '/homes-illustration/home-extravaganzza.jpg', caption: 'Style: Supercharged Modern', alt: 'Supercharged Modern Home' },
            { src: '/homes-illustration/rustic.webp', caption: 'Style: Rustic Charm', alt: 'Rustic Home' },
            { src: '/homes-illustration/fulllight.webp', caption: 'Style: Full Light', alt: 'Full Light Home' },
            
            { src: '/homes-illustration/ancient.webp', caption: 'Style: Ancient Influences', alt: 'Home with Ancient Influences' },
            { src: '/homes-illustration/chalet.webp', caption: 'Style: Cozy Chalet', alt: 'Chalet Style Home' },
            { src: '/homes-illustration/home-loverscocoon.jpg', caption: 'Style: Lovers Cocoon', alt: 'Lovers Cocoon Home Detail' },
            { src: '/homes-illustration/home-privateparadise.jpg', caption: 'Style: Private Paradise', alt: 'Private Paradise Home' },
            { src: '/homes-illustration/home-privatepool.jpg', caption: 'Style: Private Pool Oasis', alt: 'Home with Private Pool' },
            { src: '/homes-illustration/home-volumes.jpeg', caption: 'Style: Volumes Houses', alt: 'Home with Voluminous Spaces' },
            { src: '/homes-illustration/privateland.webp', caption: 'Style: Expansive Private Land', alt: 'Home on Private Land' },
            { src: '/homes-illustration/sportcourt.webp', caption: 'Style: Sport Court Feature', alt: 'Home with Sport Court' },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <CheckListCard 
            title="Quality Criteria for a Category"
            icon={<CheckCircleIcon className="w-10 h-10 text-green-500" />}
            items={[
              { label: 'Clear Visual Distinction', checked: true },
              { label: 'Strong Internal Coherence', checked: true },
              { label: 'Easily Understandable', checked: true },
              { label: 'Business Relevance', checked: true },
              { label: 'Scalability Potential', checked: false },
            ]}
          />
          <CheckListCard 
            title="User Needs Addressed by Styles"
            icon={<UsersIcon className="w-8 h-8 text-blue-500"/>}
            items={[
                { label: "Quickly grasp the ambiance of a home", checked:true },
                { label: "Filter based on aesthetic preferences", checked:true },
                { label: "Discover homes matching a desired lifestyle", checked:true },
                { label: "Inspire travel and exchange possibilities", checked:true }

            ]}
          />
        </div>
        <Callout 
          type="question" 
          title="Question"
          icon={<QuestionMarkCircleIcon className="w-6 h-6" />}
        >
          Challenge: &quot;How to create a taxonomy that is both inspiring for users and practical for internal teams? How to balance creativity with rigor?&quot;
        </Callout>
      </Section>

      {/* 5. The shift to automation: AI & image classification */}
      <Section className="mb-20">
        <SectionTitle eyebrow="04">The Leap to Automation: Machine Learning for Style Recognition</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>Manual categorization was a necessary starting point, but not scalable for the entire HomeExchange Collection. The next crucial step was to explore how Artificial Intelligence, specifically machine learning and computer vision, could automate and enhance this process.</p>
          <p><strong>Approach:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong>Model Selection:</strong> Researched and experimented with various image recognition models (e.g., CLIP, ResNet) known for their ability to understand image content and context.</li>
            <li><strong>Training Data:</strong> Utilized the manually curated and validated home styles as the initial training dataset. The quality of this data was key.</li>
            <li><strong>Feature Extraction:</strong> The models learned to identify visual patterns, textures, color palettes, objects, and architectural elements associated with each style.</li>
            <li><strong>Classification & Confidence Scoring:</strong> For any given home image, the AI could predict its most likely style(s) and provide a confidence score for each prediction.</li>
          </ul>
        </div>
        <Callout 
          type="info" 
          title="Technological Empowerment"
          icon={<CodeBracketIcon className="w-6 h-6" />}
        >
          AI acted as a powerful accelerator, enabling us to process and classify thousands of images far more rapidly than humanly possible, while also uncovering subtle patterns that might have been missed.
        </Callout>
      </Section>

      {/* 6. Design of the navigation tool - THIS IS SECTION 05 in the UI */}
      <Section className="mb-20">
        <SectionTitle eyebrow="05">Initial Prototype: From Excel to Web App</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>The initial insights from the manual categorization and data exploration were promising but clearly not scalable. The first step towards a more robust solution was to move away from disparate spreadsheets and visual boards.</p>
          <p>We envisioned a simple web application that could serve as a centralized platform for our internal teams. The primary goal was to provide an intuitive interface to:</p>
          <ul className="list-disc list-inside space-y-2 mb-6 my-8">
            <ListItem text="View homes and their AI-suggested style classifications." />
            <ListItem text="Manually validate or correct these classifications." />
            <ListItem text="Filter and search homes based on styles or other criteria." />
            <ListItem text="Potentially export lists of homes for specific campaigns." />
          </ul>
          <p>This first prototype was basic, focusing on core functionality rather than polished design. It was essential to get a working tool into the hands of the teams quickly to gather feedback and iterate.</p>
        </div>
        <ImageGallery 
          images={[
            { src: '/case-study-screenshot-excel.png', caption: 'Early data in spreadsheets', alt: 'Excel Screenshot' },
            { src: '/case-study-screenshot-prototype.png', caption: 'First web app prototype', alt: 'Prototype Screenshot' },
          ]}
        />
        <Callout 
          type="info"
          title="Proof of Concept"
          icon={<ComputerDesktopIcon className="w-6 h-6" />}
        >
          The first prototype, though rudimentary, proved the viability of a dedicated tool and generated crucial early feedback from the CRM and Sales teams.
        </Callout>
      </Section>

      {/* 7. Integration into team practices */}
      <Section className="mb-20">
        <SectionTitle eyebrow="06">Data-Driven Category Refinement</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>While manual curation provided the foundational understanding of home styles, the ambition was to create a scalable and evolving system. We leveraged the data itself to uncover and refine categories. By analyzing the naming patterns of internal CSV datasets (e.g., <code className="text-sm bg-gray-100 p-1 rounded">Collection Image Similarity - Styles Ancient.csv</code>), we could programmatically extract potential style and amenity tags.</p>
          <p>This approach allowed for a more dynamic and comprehensive taxonomy, reflecting the diverse characteristics present in the HomeExchange Collection. The system was designed to adapt as new data became available, ensuring our understanding of user preferences remained current.</p>
        </div>
        <IconFeatureGrid 
          className="my-12"
          items={derivedCategories.map(category => ({
            icon: category.icon,
            title: category.name,
            description: category.description,
          }))}
        />
        <Callout 
          type="info"
          title="Future Vision"
          icon={<MagnifyingGlassIcon className="w-6 h-6" />}
        >
          The aspiration was to eventually use these data-derived tags to automatically suggest relevant icons or visual cues in the UI, further enhancing the browsing experience for internal teams and, potentially, for members.
        </Callout>
      </Section>

      {/* 8. Towards a continuous learning tool - Renumbered from 07 by user, actual 07 is Competitor Insights */}
      <Section className="mb-20">
        <SectionTitle eyebrow="07">Learning from the Landscape: Competitor Insights</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>To ensure our approach was grounded and to identify potential best practices (and pitfalls to avoid), we analyzed how other platforms handle visual search, categorization, and presentation of homes. This included looking at direct competitors in the home exchange space, as well as leaders in travel and real estate who excel at visual storytelling.</p>
          <p>Key observations included:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>The importance of high-quality, aspirational imagery.</li>
            <li>Varied approaches to tagging and filtering by style or amenities.</li>
            <li>Some platforms used very granular categories, others broader themes.</li>
            <li>A trend towards more immersive visual browsing experiences.</li>
          </ul>
          <p>This analysis revealed an opportunity for HomeExchange Collection to differentiate by offering a more curated, evocative, and visually rich way for internal teams to understand and segment homes based on nuanced styles that resonate with member aspirations.</p>
        </div>
        <ImageGallery 
          images={[
            { src: '/competitors/competitor-screenshot-1.png', caption: 'Example of a competitor platform\'s search interface', alt: 'Competitor Screenshot 1' },
            { src: '/competitors/competitor-screenshot-2.png', caption: 'Competitor platform amenities filtering', alt: 'Competitor Screenshot 2' },
            { src: '/competitors/competitor-screenshot-3.png', caption: 'Visual style presentation on another travel site', alt: 'Competitor Screenshot 3' },
            { src: '/competitors/competitor-screenshot-4.png', caption: 'Detailed property page from a real estate leader', alt: 'Competitor Screenshot 4' },
            { src: '/competitors/competitor-screenshot-5.png', caption: 'User review interface highlighting home features', alt: 'Competitor Screenshot 5' },
          ]}
        />
        <Callout 
          type="info" 
          title="Key Takeaway"
          icon={<MagnifyingGlassIcon className="w-6 h-6" />}
        >
          Competitor analysis reinforced the value of visual data but also highlighted the need for HomeExchange Collection to develop a unique classification system tailored to its specific user base and inventory.
        </Callout>
      </Section>

      {/* 9. Personal assessment and reflective design */}
      <Section className="mb-20">
        <SectionTitle eyebrow="08">Team Synergy: The Collaborative Validation Interface</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>A core principle of the tool was to blend AI efficiency with human expertise. The classifications made by the image recognition models were not final; they were starting points. To refine accuracy and ensure the system learned from nuanced human understanding, a collaborative validation interface was designed.</p>
          <p>This interface allowed members of the CRM, Sales, and Product teams to easily review AI-suggested style tags for individual homes. They could:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>View the primary images of a home alongside its AI-assigned style categories.</li>
            <li>Confirm (True) or reject (False) each AI suggestion with a simple click.</li>
            <li>Optionally add notes or suggest alternative categories if a classification was deemed incorrect.</li>
          </ul>
          <p>The interface provided clear visual cues for these actions, as well as ways to integrate this validation step into their existing home exploration workflows, for instance, through a modal view when examining a home in detail.</p>
          <p>This feedback loop was crucial. Each validation or correction directly contributed to a dataset used for retraining and fine-tuning the AI models, creating a system that became smarter and more aligned with expert human perception over time.</p>
        </div>

        {/* New image presentation for validation UI examples */}
        <div className="my-12 flex flex-col sm:flex-row justify-around items-start gap-6 sm:gap-4">
          <figure className="flex-1 text-center max-w-xs mx-auto">
            <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 bg-gray-50 p-2">
              <Image 
                src="/validation-1.png"
                alt="Validation UI - Accept Action"
                width={300} 
                height={200} // Adjust height as needed, or keep it proportional
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-2 text-sm text-gray-600 italic">1. Accept AI classification.</figcaption>
          </figure>

          <figure className="flex-1 text-center max-w-xs mx-auto">
            <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 bg-gray-50 p-2">
              <Image 
                src="/validation-2.png"
                alt="Validation UI - Reject Action"
                width={300} 
                height={200} 
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-2 text-sm text-gray-600 italic">2. Reject AI classification.</figcaption>
          </figure>

          <figure className="flex-1 text-center max-w-xs mx-auto">
            <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 bg-gray-50 p-2">
              <Image 
                src="/validation-3.png"
                alt="Validation UI - Modal in Detail View"
                width={300} 
                height={200} 
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-2 text-sm text-gray-600 italic">3. Validation options in home detail modal.</figcaption>
          </figure>
        </div>

        <Callout 
          type="success" 
          title="Continuous Improvement"
          icon={<CheckCircleIcon className="w-6 h-6" />}
        >
          The validation interface transformed the tool from a static classification system into a dynamic learning platform, ensuring long-term accuracy and relevance through continuous team input.
        </Callout>
      </Section>

      {/* 10. Annexes */}
      <Section className="mb-20">
        <SectionTitle eyebrow="09">The Heart of the Tool: Navigation & Visualization Design</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>With a growing understanding of styles and AI capabilities, the focus shifted to designing the core user experience of the internal navigation tool. The goal was to empower teams to explore, analyze, and utilize the classified home data effectively.</p>
          <p>Key design principles included:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong>Intuitive Filtering & Search:</strong> Allow users to easily find homes based on specific styles, AI confidence scores, or other relevant metadata.</li>
            <li><strong>Clear Visual Presentation:</strong> Prominently display home images, their assigned styles, and confidence levels in an easy-to-scan format.</li>
            <li><strong>Seamless Validation Access:</strong> Integrate the validation process smoothly within the browsing experience.</li>
            <li><strong>Actionable Insights:</strong> Make it simple to select groups of homes and export data for targeted campaigns or further analysis.</li>
          </ul>
          <p>Wireframes and interactive prototypes (Figma) were used extensively to iterate on layouts, user flows, and component designs, ensuring the tool was both powerful and user-friendly.</p>
        </div>
        <ImageCarousel 
          className="my-12"
          images={[
            { src: '/ui-cards-view.png', caption: 'Card-based view for browsing classified homes', alt: 'Tool UI - Cards View' },
            { src: '/ui-search-bar.png', caption: 'Advanced search and filtering capabilities', alt: 'Tool UI - Search Bar' },
            { src: '/ui-detail-view.png', caption: 'Detailed view of a single home with style information', alt: 'Tool UI - Detail View' },
          ]}
        />
        <div className="mt-12 text-center">
          <Button variant="secondary" onClick={() => window.open('https://www.figma.com/proto/LIb5OUNDL1Y6a811vAtHTX/HE---Styles-Tool?type=design&node-id=1-2&t=yVI6GkxsYYV8tA4t-1&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=1%3A2', '_blank')}>
            View Figma Prototype
          </Button>
        </div>
      </Section>

      {/* REFINED SECTION: Google Auth for Security */}
      <Section className="mb-20">
        <SectionTitle eyebrow="10">Ensuring Secure Access: Google Authentication</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>As the tool evolved from a conceptual prototype to a functional internal application, data security and controlled access became paramount. The classified home data, while anonymized, represented valuable internal insights that needed protection.</p>
          <p>Initially, the prototype might have been shared via less secure means for quick feedback. However, for broader internal adoption by CRM, Sales, and Product teams, a robust authentication mechanism was essential. We opted for Google OAuth for several reasons:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong>Familiarity & Ease of Use:</strong> Most team members already had Google accounts through the company.</li>
            <li><strong>Robust Security:</strong> Leveraging Google's established security infrastructure.</li>
            <li><strong>Domain Restriction:</strong> Critically, we configured OAuth to only allow users with company-specific email domains (e.g., <code className="text-sm bg-gray-100 p-1 rounded">@homeexchange.com</code>). This ensured that only authorized employees could access the tool.</li>
          </ul>
          <p>The implementation involved a simple login flow and clear logout options, secured by Google.</p>
        </div>
        
        {/* Updated image presentation for Google Auth section */}
        <div className="my-12 flex flex-col sm:flex-row justify-around items-start gap-6 sm:gap-4">
          <figure className="flex-1 text-center max-w-xs mx-auto">
            <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 bg-gray-50 p-2">
              <Image 
                src="/ui-oauth-flow.png" 
                alt="Google OAuth Sign-in Flow"
                width={300} 
                height={200} 
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-2 text-sm text-gray-600 italic">1. Google Sign-in prompt.</figcaption>
          </figure>

          <figure className="flex-1 text-center max-w-xs mx-auto">
            <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200 bg-gray-50 p-2">
              <Image 
                src="/ui-oauth-bar.png"
                alt="Authenticated User Profile/Logout UI Element"
                width={300} 
                height={200} 
                className="w-full h-auto object-contain"
              />
            </div>
            <figcaption className="mt-2 text-sm text-gray-600 italic">2. Authenticated user access bar.</figcaption>
          </figure>
        </div>

        <Callout 
          type="secure"
          title="Data Protection Achieved"
          icon={<ShieldCheckIcon className="w-6 h-6" />}
        >
          By integrating Google OAuth with domain restriction, we provided a seamless and secure access experience for internal teams, safeguarding sensitive company data while facilitating tool adoption.
        </Callout>
      </Section>

      {/* SEPARATOR */}
      <div className="w-full max-w-5xl mx-auto my-16 border-t border-gray-200"></div>
      {/* END REFINED SECTION: Google Auth for Security */}

      {/* 12. Team Integration & Feedback */}
      <Section className="mb-20">
        <SectionTitle eyebrow="11">Team Integration & Feedback: Bridging Tech and Operations</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>The true measure of the tool's success was its adoption by the CRM, Sales, and Product teams and the tangible impact it had on their workflows. The rollout involved training sessions, documentation, and an open channel for feedback.</p>
          <p><strong>Initial Reactions & Adoption:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Positive reception to the intuitive interface and the ability to visually explore home styles.</li>
            <li>Sales and CRM teams began using style insights to better understand member preferences and tailor communications.</li>
            <li>Product teams used the data to inform discussions about site features and content strategy related to home discovery.</li>
          </ul>
          <p><strong>Feedback & Iterative Improvements:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li>Requests for more granular filtering options and the ability to combine style tags.</li>
            <li>Desire for direct export to CRM tools or marketing platforms.</li>
            <li>Feedback on specific AI classifications, further fueling the model retraining loop.</li>
          </ul>
        </div>
        <Quote
          text="This tool finally gives us a way to speak a common language about home aesthetics. It's invaluable for aligning our marketing messages with the actual character of our homes."
          author="Member of the Marketing Team"
          className="my-10"
        />
      </Section>

      {/* SEPARATOR */}
      <div className="w-full max-w-5xl mx-auto my-16 border-t border-gray-200"></div>

      {/* Section 13: Continuous Learning & Future Iterations */}
      <Section className="mb-20">
        <SectionTitle eyebrow="12">Continuous Learning & Future Iterations</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>The project was envisioned not as a one-time delivery but as an evolving platform. The data, the AI models, and the user interface were all designed with continuous improvement in mind.</p>
          <p><strong>Planned Future Enhancements:</strong></p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong>Automated Tagging for New Listings:</strong> Integrating the AI classification directly into the new home onboarding process.</li>
            <li><strong>Trend Analysis:</strong> Developing dashboards to track the popularity and evolution of home styles over time.</li>
            <li><strong>Personalized Recommendations:</strong> Exploring how style data could eventually power personalized home recommendations for members on the main platform.</li>
            <li><strong>Integration with External Data:</strong> Potentially linking home styles with neighborhood characteristics or local points of interest.</li>
          </ul>
        </div>
        <Callout 
          type="info"
          title="A Living System"
          icon={<ChartBarIcon className="w-6 h-6" />}
        >
          The HomeExchange Styles tool was built to adapt and grow, reflecting new data, evolving user needs, and advancements in AI technology, ensuring its long-term value to the organization.
        </Callout>
      </Section>

      {/* SEPARATOR */}
      <div className="w-full max-w-5xl mx-auto my-16 border-t border-gray-200"></div>

      {/* Section 14: Personal Reflection & Key Learnings */}
      <Section className="mb-20">
        <SectionTitle eyebrow="13">Personal Reflection & Key Learnings</SectionTitle>
        <div className="text-lg text-gray-700 mb-8 space-y-4">
          <p>This project was a significant learning experience, blending user research, data analysis, AI exploration, and iterative design. Key takeaways for me included:</p>
          <ul className="list-disc list-inside ml-4 space-y-2">
            <li><strong>The Power of Visual Data:</strong> Unlocking insights hidden within images can lead to a much deeper understanding of users.</li>
            <li><strong>Human-AI Collaboration:</strong> The most effective systems often combine the strengths of AI (scale, pattern recognition) with human expertise (nuance, contextual understanding).</li>
            <li><strong>Iterative Development:</strong> Starting small, validating assumptions, and building incrementally is crucial, especially when dealing with new technologies.</li>
            <li><strong>Cross-Functional Impact:</strong> A well-designed internal tool can have far-reaching benefits, improving efficiency and decision-making across multiple teams.</li>
          </ul>
        </div>
        <Quote
          text="Bridging the gap between raw data and actionable team insights is one of the most rewarding challenges in product design. This project solidified my passion for creating tools that empower users through information."
          author="Daniel Assayag, Product Manager"
          className="my-10"
        /> 
      </Section>

      {/* SEPARATOR */}
      <div className="w-full max-w-5xl mx-auto my-16 border-t border-gray-200"></div>
      
      {/* Section 15: Annexes & Call to Action - No Eyebrow */}
      <Section className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore More or Get in Touch</h2>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for exploring this case study. If you're interested in discussing product design, user research, or how AI can transform user understanding, I'd love to connect.
        </p>
        <div className="flex justify-center space-x-4">
          <Button href="/about" variant="primary">About Me</Button>
          <Button href="mailto:dseyag+pm@gmail.com" variant="secondary">Contact Me</Button> 
        </div>
      </Section>

      <div className="w-full max-w-5xl mx-auto my-16 border-t border-gray-200"></div>
      

    </div>
  );
} 