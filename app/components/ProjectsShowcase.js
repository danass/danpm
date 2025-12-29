'use client'

import { ExternalLink } from 'lucide-react'

export default function ProjectsShowcase() {
    const projects = [
        {
            name: "danpm.com",
            description: "CV interactif en React/Next.js avec mode édition, versions courtes/longues, et export PDF.",
            url: "https://danpm.com",
            category: "Portfolio"
        },
        {
            name: "textpad.cloud",
            description: "Éditeur de texte décentralisé sur IPFS avec persistance permanente, gestion de folders, et publication de blog.",
            url: "https://textpad.cloud",
            category: "Vibe Coding"
        },
        {
            name: "instapan.pics",
            description: "Transformez vos photos panoramiques en carrousels Instagram avec zoom 2x et export vidéo.",
            url: "https://instapan.pics",
            category: "Vibe Coding"
        },
        {
            name: "diplome.app",
            description: "Solution SaaS d'authentification et certification de diplômes (Next.js/PostgreSQL).",
            url: "https://diplome.app",
            category: "SaaS"
        },
        {
            name: "HE Explore Styles",
            description: "Exploration de styles pour HomeExchange",
            url: "https://he-explore-styles.vercel.app/",
            category: "HomeExchange"
        },
        {
            name: "HE Toolbox",
            description: "Boîte à outils interne HomeExchange",
            url: "https://he-toolbox.vercel.app/",
            category: "HomeExchange"
        }
    ]

    return (
        <section className="mt-16 print:hidden">
            <div className="border-t border-slate-200 pt-10">
                <h2 className="text-2xl font-semibold text-slate-800 mb-8 flex items-center gap-3">
                    <span className="h-px w-8 bg-slate-300"></span>
                    Projets & Applications
                </h2>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, idx) => (
                        <a
                            key={idx}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative backdrop-blur-sm bg-white/80 rounded-xl border border-slate-200/50 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-3">
                                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                                    {project.category}
                                </span>
                                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                            </div>

                            <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {project.name}
                            </h3>

                            <p className="text-sm text-slate-600 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="mt-4 text-xs text-blue-600 font-medium group-hover:underline">
                                Visiter →
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}
