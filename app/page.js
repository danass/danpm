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
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 pt-12 md:pt-20 pb-12 md:pb-24 font-sans text-gray-800">
      
      {/* Daniel Assayag Intro Section */}
      <div className="w-full max-w-4xl mb-16 md:mb-24 px-4 text-center md:text-left">
        <nav className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-10 items-center text-sm">
          <a href="#case-studies-section" className="font-semibold text-gray-800 hover:text-black lowercase bg-gray-200 hover:bg-gray-300 py-1.5 px-4 rounded-lg cursor-pointer shadow-sm">
            Work & Portfolio
          </a>
        </nav>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-8 mx-auto md:mx-0 text-gray-900">
          Daniel Assayag
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mb-10 mx-auto md:mx-0">
          Product Manager at{' '}
          <a href="https://homeexchange.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-semibold hover:underline">
            HomeExchange
          </a>,
          <br className="hidden md:block" /> focused on crafting user-centered digital experiences.
        </p>
        

        <div className="mt-8 flex flex-wrap justify-start gap-4">
          <Button variant="primary" onClick={() => window.open('https://www.linkedin.com/in/daniel-assayag/', '_blank')} className="text-sm sm:text-base">
            <UserCircleIcon className="h-5 w-5 mr-2" /> LinkedIn
          </Button>
          <Button variant="secondary" onClick={() => router.push('/about')} className="text-sm sm:text-base"> 
            <InformationCircleIcon className="h-5 w-5 mr-2" /> About Me
          </Button>
          {/* Add other relevant links here if needed */}
        </div>


        {/* Apps Section (Simplified) */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Apps</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/top" className="text-lg text-blue-600 hover:underline">
                /top
              </Link>
              <span className="ml-3 text-gray-700">- A tool for creating and sharing ranked lists.</span>
            </li>
            {/* Add other projects here if needed */}
          </ul>
        </section>
      </div>

      

      {/* Design Case Studies Section */}
      <header id="case-studies-section" className="mb-12 w-full max-w-4xl text-center md:text-left">
        <SectionTitle subtitle="Portfolio & Product Thinking">Design Product Stories</SectionTitle>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto md:mx-0">
          A collection of product design projects, exploring research, ideation, and impact.
        </p>
      </header>

      <main className="w-full max-w-4xl">
        <div className="grid grid-cols-1 gap-10">
          {caseStudies.map((study) => (
            <Link href={study.href} key={study.title} passHref legacyBehavior>
              <a className="block bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 group">
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
                       <Button variant="secondary" className="group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-colors">
                         Read Case Study &rarr;
                       </Button>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </main>
      
      {/* You can add a footer or other sections here */}
    </div>
  );
}
