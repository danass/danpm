'use client'

import Header from './Header'
import Experience from './Experience'
import Skills from './Skills'
import Education from './Education'
import Additional from './Additional'
import AboutCV from './AboutCV'
import ProfileSection from './ProfileSection'
import Hero from './Hero'
import GlassCard from './GlassCard'
import ProjectsShowcase from './ProjectsShowcase'
import { useCollapse } from '../contexts/CollapseContext'

export default function CV() {
  const { isCollapsed, isCompact } = useCollapse()

  return (
    <article
      className="w-full print:shadow-none print:rounded-none relative"
      itemScope
      itemType="https://schema.org/Person"
    >
      <div className={`max-w-7xl mx-auto ${isCompact ? 'px-6 py-6' : 'px-8 py-12'} print:p-0 print:max-w-full print:px-0 print:py-0`}>
        {/* CV Content for PDF export - excludes Hero and ProjectsShowcase */}
        <div id="cv-pdf-content">
          <GlassCard className={`${isCompact ? 'p-6' : 'p-10'} print:bg-white print:shadow-none print:border-none print:p-0`}>
            <div className="print-avoid-break">
              <Header />

              <div className={`mt-12 ${isCompact ? 'space-y-5' : 'space-y-10'}`}>
                <ProfileSection />

                <Experience defaultCollapsed={isCollapsed} />
                <Skills defaultCollapsed={isCollapsed} />
                <Education />
                <Additional />
              </div>
            </div>
            <AboutCV />
          </GlassCard>
        </div>

        {/* Below CV - not included in PDF */}
        <div className="pdf-exclude">
          <ProjectsShowcase />
          <Hero />
        </div>
      </div>
    </article>
  )
}
