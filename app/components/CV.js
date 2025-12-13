import Header from './Header'
import Experience from './Experience'
import Skills from './Skills'
import Education from './Education'
import Certifications from './Certifications'
import Languages from './Languages'
import AboutCV from './AboutCV'
import Activities from './Activities'
import ProfileSection from './ProfileSection'

export default function CV({ defaultCollapsed = false }) {
  return (
    <article 
      className="w-full print:shadow-none print:rounded-none"
      itemScope 
      itemType="https://schema.org/Person"
    >
      <div className="max-w-7xl mx-auto px-8 py-12 print:p-0 print:max-w-full print:px-0 print:py-0">
        <div className="print-avoid-break">
          <Header />
          
          <div className="mt-12 space-y-10 print:mt-0.5 print:space-y-4">
            <ProfileSection />

            <Experience defaultCollapsed={defaultCollapsed} />
            <Skills defaultCollapsed={defaultCollapsed} />
            <Education />
            <Certifications />
            <Languages />
            <Activities />
          </div>
        </div>
        <AboutCV />
      </div>
    </article>
  )
}
