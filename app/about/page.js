'use client'
import Image from 'next/image';
import SectionTitle from '../components/design-system/SectionTitle';
import Button from '../components/design-system/Button';
import Section from '../components/design-system/Section';
import ExperienceItem from '../components/design-system/ExperienceItem';
import EducationItem from '../components/design-system/EducationItem';
import SkillItem from '../components/design-system/SkillItem';
import { BriefcaseIcon, AcademicCapIcon, SparklesIcon, LinkIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center font-sans text-gray-800">
      <Section className="text-center">
        <Image 
          src="/avatar-daniel.jpg" 
          alt="Daniel Assayag" 
          width={128} 
          height={128} 
          className="rounded-full mx-auto mb-6 shadow-lg"
          priority
        />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Daniel Assayag</h1>
        <p className="text-xl text-gray-600 mb-8">Product Manager with a passion for user-centric design and innovative solutions.</p>
        <div className="flex justify-center gap-3">
            <Button variant="primary" href="https://www.linkedin.com/in/daniel-assayag" target="_blank" rel="noopener noreferrer">LinkedIn</Button>
            <Button variant="secondary" href="https://github.com/danass" target="_blank" rel="noopener noreferrer">Github</Button>
            {/* <Button variant="secondary" href="https://api.assayag.org/uploads/CV_Daniel_Assayag_2023_0f5aec0fdb.pdf" target="_blank" rel="noopener noreferrer">Portfolio (PDF)</Button> */}
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="01" titleColor="text-gray-900">Experience</SectionTitle>
        <div className="space-y-8">
          <ExperienceItem
            icon={<BriefcaseIcon className="w-8 h-8 text-indigo-600" />}
            company="HomeExchange"
            roles={[
              { title: 'Product Manager', duration: 'Feb 2025 - Present' },
              { title: 'Product Manager, HomeExchange Collection', duration: 'Jul 2023 - Present' },
              { title: 'Founder (Diplome project)', duration: 'Jul 2023 - Present' } // Assuming "Diplome" was a project leading to a founder role
            ]}
            location="Paris, Île-de-France, France"
            description="Leading product initiatives, focusing on user experience and strategic growth for HomeExchange and its premium Collection tier. Driving innovation from concept to launch."
          />
          <ExperienceItem
            icon={<BriefcaseIcon className="w-8 h-8 text-indigo-600" />}
            company="Villette Makerz"
            roles={[{ title: 'Head of Training / Program Creator', duration: 'Jan 2020 - Sep 2021' }]}
            location="Paris, France"
            description="Created and managed the 'Circular Economy Design' program. Taught design thinking and making principles to aspiring creators."
          />
          <ExperienceItem
            icon={<BriefcaseIcon className="w-8 h-8 text-indigo-600" />}
            company="Université de Paris (Learning Planet Institute - CRI)"
            roles={[{ title: 'FabLab Manager & Instructor', duration: 'Jul 2017 - Jan 2020' }]}
            location="Paris, France"
            description="Managed the FabLab, providing training in digital fabrication tools and methodologies. Taught a 'Learning by Doing' course to Master and Bachelor students."
          />
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="02" titleColor="text-gray-900">Education</SectionTitle>
        <div className="space-y-6">
          <EducationItem
            icon={<AcademicCapIcon className="w-8 h-8 text-indigo-600" />}
            institution="Beaux-Arts de Paris"
            degree="Diplôme National Supérieur d'Expression Plastique (DNSEP) - Master's Degree equivalent (Honors Mention)"
            duration="2010 - 2015"
          />
          <EducationItem
            icon={<AcademicCapIcon className="w-8 h-8 text-indigo-600" />}
            institution="Ironhack"
            degree="UI/UX Design Bootcamp"
            duration="Oct 2024 - Feb 2025 (Expected)"
          />
          <EducationItem
            icon={<AcademicCapIcon className="w-8 h-8 text-indigo-600" />}
            institution="GOBELINS, l'école de l'image"
            degree="Photography & Post-production (CCIP)"
            duration="2008 - 2010"
          />
           <EducationItem
            icon={<AcademicCapIcon className="w-8 h-8 text-indigo-600" />}
            institution="Université Paris-Sorbonne"
            degree="Licence, Modern Literature"
            duration="2005 - 2008"
          />
        </div>
      </Section>

      <Section>
        <SectionTitle eyebrow="03" titleColor="text-gray-900">Key Skills</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <SkillItem icon={<SparklesIcon className="w-6 h-6 text-indigo-500" />} skill="User Research & Analysis" />
            <SkillItem icon={<SparklesIcon className="w-6 h-6 text-indigo-500" />} skill="User Interface (UI) Design" />
            <SkillItem icon={<SparklesIcon className="w-6 h-6 text-indigo-500" />} skill="Product Strategy & Roadmapping" />
            <SkillItem icon={<SparklesIcon className="w-6 h-6 text-indigo-500" />} skill="Agile Methodologies" />
            <SkillItem icon={<SparklesIcon className="w-6 h-6 text-indigo-500" />} skill="Prototyping & Wireframing" />
            <SkillItem icon={<SparklesIcon className="w-6 h-6 text-indigo-500" />} skill="Design Thinking" />
        </div>
      </Section>

      <Section className="text-center pb-16">
         {/* eslint-disable-next-line react/no-unescaped-entities */}
         <SectionTitle eyebrow="04" titleColor="text-gray-900">Let's Connect</SectionTitle>
         <p className="text-lg mb-6">Interested in learning more or collaborating? Feel free to reach out.</p>
        <div className="flex justify-center gap-4">
            <Button variant="primary" href="mailto:dseyag+pm@gmail.com">Email Me</Button>
            <Button variant="secondary" href="https://www.linkedin.com/in/daniel-assayag" target="_blank" rel="noopener noreferrer">LinkedIn</Button>
        </div>
      </Section>
    </div>
  );
} 