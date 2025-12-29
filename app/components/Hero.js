'use client'

import { Rocket, Zap, BarChart3, ArrowRight, ExternalLink } from 'lucide-react'

export default function Hero() {
    return (
        <section className="mb-16 print:hidden">
            <div className="relative overflow-hidden bg-slate-900 text-white">
                {/* Animated background highlights */}
                <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-8 py-12 md:px-12 md:py-16">
                    {/* Main Tagline */}
                    <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                        <span className="block text-slate-400 text-lg font-medium tracking-widest uppercase mb-4">Daniel Assayag — Product Manager</span>
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Je transforme les systèmes legacy en produits modernes, performants et scalables.
                        </span>
                    </h1>

                    {/* Sub-tagline */}
                    <p className="mt-8 text-lg text-slate-300 font-light leading-relaxed md:text-xl">
                        Expert en <strong>Product Ops</strong> et <strong>Engineering</strong>, je fais le pont entre les besoins business complexes et l'excellence technique. De la migration de back-offices critiques à l'optimisation de produits à grande échelle.
                    </p>

                    {/* Key Pillars */}
                    <div className="mt-16">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-8 flex items-center gap-3">
                            <span className="h-px w-8 bg-slate-700"></span>
                            Ce que j'apporte
                        </h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 mb-6">
                                    <Rocket className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Modernisation & Migration</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    Transition fluide de systèmes obsolètes vers des architectures modernes sans interruption de service (ex: 200 utilisateurs internes chez HomeExchange).
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 mb-6">
                                    <Zap className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Product Ops & IA</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    Optimisation des workflows (Slack/Jira) et utilisation de l'IA générative pour accélérer la conception et la production de spécifications (vitesse x3).
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/5 p-6 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 mb-6">
                                    <BarChart3 className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-semibold mb-3">Data-Driven Design</h3>
                                <p className="text-sm text-slate-400 leading-relaxed font-light">
                                    Conception de fonctionnalités basées sur l'analyse de données (SQL, Metabase) pour maximiser l'impact utilisateur et business.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Social Proof / Projets */}
                    <div className="mt-16 pt-12 border-t border-white/10">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-8 flex items-center gap-3">
                            <span className="h-px w-8 bg-slate-700"></span>
                            Social Proof / Projets
                        </h2>
                        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
                            <div className="flex-1">
                                <h4 className="text-blue-400 font-semibold mb-2 flex items-center gap-2">
                                    HomeExchange <ArrowRight className="h-4 w-4" />
                                </h4>
                                <p className="text-sm text-slate-300 font-light">
                                    Migration BO legacy (4M comptes, 260k clients actifs). Roadmap stratégique, frameworks Impact/Effort, discovery utilisateur. Funnel optimisé (87% complétion, +25% exposition).
                                </p>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-indigo-400 font-semibold mb-2 flex items-center gap-2">
                                    Diplome (SaaS) <ArrowRight className="h-4 w-4" />
                                </h4>
                                <p className="text-sm text-slate-300 font-light">
                                    Création d'un système d'authentification/certification sécurisé (Next.js/PostgreSQL).
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6">
                        <p className="text-xl text-slate-200 font-medium">Une problématique de système complexe à résoudre ?</p>
                        <a
                            href="mailto:dan@danpm.com"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-blue-500/25 active:scale-95"
                        >
                            Parlons-en <ExternalLink className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
