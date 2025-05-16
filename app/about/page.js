'use client'
import Image from 'next/image';
import SectionTitle from '../components/design-system/SectionTitle';
import Button from '../components/design-system/Button';
import { BriefcaseIcon, AcademicCapIcon, SparklesIcon, LinkIcon } from '@heroicons/react/24/outline';



function Section({ children, className = '' }) {
  return <section className={`w-full max-w-3xl mx-auto px-4 py-8 md:py-12 ${className}`}>{children}</section>;
}

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
            <Button variant="primary" onClick={() => window.open('https://www.linkedin.com/in/daniel-assayag', '_blank')}>LinkedIn</Button>
            <Button variant="secondary" onClick={() => window.open('https://github.com/danass', '_blank')}>Github</Button>
            {/* <Button variant="secondary" onClick={() => window.open('https://api.assayag.org/uploads/CV_Daniel_Assayag_2023_0f5aec0fdb.pdf', '_blank')}>Portfolio (PDF)</Button> */}
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
         <SectionTitle eyebrow="04" titleColor="text-gray-900">Let's Connect</SectionTitle>
         <p className="text-lg mb-6">Interested in learning more or collaborating? Feel free to reach out.</p>
        <div className="flex justify-center gap-4">
            <Button variant="primary" onClick={() => window.location.href = 'mailto:dseyag+pm@gmail.com'}>Email Me</Button>
            <Button variant="secondary" onClick={() => window.open('https://www.linkedin.com/in/daniel-assayag', '_blank')}>LinkedIn</Button>
        </div>
      </Section>
    </div>
  );
}

const ExperienceItem = ({ icon, company, roles, location, description }) => (
  <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex-shrink-0 pt-1">{icon}</div>
    <div>
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{company}</h3>
      {roles.map(role => (
        <p key={role.title} className="text-md text-indigo-700 font-medium">{role.title} <span className="text-sm text-gray-500">({role.duration})</span></p>
      ))}
      <p className="text-sm text-gray-500 mb-2">{location}</p>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </div>
  </div>
);

const EducationItem = ({ icon, institution, degree, duration }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="flex-shrink-0 pt-1">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900">{institution}</h3>
      <p className="text-indigo-700">{degree}</p>
      <p className="text-sm text-gray-500">{duration}</p>
    </div>
  </div>
);

const SkillItem = ({ icon, skill }) => (
    <div className="flex items-center gap-3 p-3 bg-white rounded-md shadow-sm">
        {icon}
        <span>{skill}</span>
    </div>
); 