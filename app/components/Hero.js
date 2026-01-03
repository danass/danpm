'use client'

import { Rocket, Zap, BarChart3 } from 'lucide-react'

export default function Hero() {
    return (
        <section className="mt-16 print:hidden">
            <div className="relative overflow-hidden">
                {/* Main content - light theme */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    {/* Separator */}
                    <div className="border-t border-slate-200 pt-12 mb-8">
                        <h2 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-4 flex items-center gap-3">
                            <span className="h-px w-8 bg-slate-300"></span>
                            Ce que j'apporte
                        </h2>
                    </div>

                    {/* Main Tagline */}
                    <h3 className="text-2xl font-bold tracking-tight md:text-3xl lg:text-4xl text-slate-800 mb-6">
                        Je transforme les systèmes legacy en produits modernes, performants et scalables.
                    </h3>

                    {/* Sub-tagline */}
                    <p className="text-base text-slate-600 font-light leading-relaxed md:text-lg mb-12">
                        Expert en <strong className="text-slate-800">Product Ops</strong> et <strong className="text-slate-800">Engineering</strong>, je fais le pont entre les besoins business complexes et l'excellence technique. De la migration de back-offices critiques à l'optimisation de produits à grande échelle.
                    </p>

                    {/* Key Pillars */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 transition-all duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-6">
                                <Rocket className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">Modernisation & Migration</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-light">
                                Transition fluide de systèmes obsolètes vers des architectures modernes sans interruption de service.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 transition-all duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-6">
                                <Zap className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">Product Ops & IA</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-light">
                                Optimisation des workflows et utilisation de l'IA générative pour accélérer la conception (vitesse ×3).
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 transition-all duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-6">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">Data-Driven Design</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-light">
                                Conception de fonctionnalités basées sur l'analyse de données pour maximiser l'impact utilisateur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
