'use client';
import Link from 'next/link';
import Image from 'next/image';
import SectionTitle from './components/design-system/SectionTitle';
import Button from './components/design-system/Button';
import { UserCircleIcon, CodeBracketIcon, PencilSquareIcon, SparklesIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

const caseStudies = [
  {
    title: 'Understanding Users Through Their Homes: A Product Design Case Study',
    description: 'Exploring how visual data analysis of homes led to a new tool for understanding HomeExchange Collection users.',
    href: '/case-study',
    imageUrl: '/homes-illustration/home-volumes.jpeg',
    imageAlt: 'Preview of HomeExchange Collection styles tool interface with card grid view'
  },
  // Add more case studies here in the future
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-16 sm:pt-20 md:pt-28 pb-12 md:pb-24 font-sans text-gray-800">
      
      {/* Daniel Assayag Intro Section */}
      <div className="w-full max-w-4xl mb-20 md:mb-28 px-4 text-center md:text-left">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-6 mx-auto md:mx-0 text-gray-900">
          Daniel Assayag
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 max-w-2xl mb-10 mx-auto md:mx-0">
          Product Manager at{' '}
          <a href="https://homeexchange.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            HomeExchange
          </a>,
          <br className="hidden sm:block" /> focused on crafting user-centered digital experiences.
        </p>
        
        <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
          <Button variant="primary" onClick={() => window.open('https://www.linkedin.com/in/daniel-assayag/', '_blank')} className="text-sm sm:text-base">
            <UserCircleIcon className="h-5 w-5 mr-2" /> LinkedIn
          </Button>
          <Button variant="secondary" onClick={() => router.push('/about')} className="text-sm sm:text-base"> 
            <InformationCircleIcon className="h-5 w-5 mr-2" /> About Me
          </Button>
        </div>
      </div>

      {/* Design Case Studies Section (Moved Up) */}
      <header id="work-portfolio" className="mb-12 md:mb-16 w-full max-w-4xl text-center md:text-left px-4">
        <SectionTitle subtitle="Portfolio & Product Thinking">Design Product Stories</SectionTitle>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
          A collection of product design projects, exploring research, ideation, and impact.
        </p>
      </header>

      <main className="w-full max-w-4xl px-4 mb-20 md:mb-28">
        <div className="grid grid-cols-1 gap-10 md:gap-12">
          {caseStudies.map((study) => (
            <Link href={study.href} key={study.title} className="block bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group">
              <div className="md:flex items-stretch">
                <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden">
                  <Image
                    src={study.imageUrl} 
                    alt={study.imageAlt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="md:w-7/12 p-6 py-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed">
                    {study.description}
                  </p>
                  <div className="mt-auto pt-2">
                     <Button variant="secondary" tabIndex={-1} className="group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors pointer-events-none">
                       Read Case Study &rarr;
                     </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Apps Section (Simplified & Polished - Moved Down) */}
      <section className="w-full max-w-4xl mb-20 md:mb-28 px-4 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-8 text-gray-800">Mini Projects & Tools</h2>
        <div className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto md:mx-0">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/top" className="text-xl font-semibold text-blue-600 hover:text-blue-700 hover:underline">
                /top
              </Link>
              <p className="text-gray-600 mt-1">A micro-app for creating and sharing ranked lists.</p>
            </div>
            <CodeBracketIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        {/* Add other projects here if needed, perhaps in a grid or list */}
      </section>
    </div>
  );
}
