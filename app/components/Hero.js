'use client'

import { Shield, Gauge, Code } from 'lucide-react'

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
                        Je transforme le back-office et les outils internes en levier d'efficacité opérationnelle mesurable.
                    </h3>

                    {/* Sub-tagline */}
                    <p className="text-base text-slate-600 font-light leading-relaxed md:text-lg mb-12">
                        PM <strong className="text-slate-800">Operations</strong> et <strong className="text-slate-800">Product Ops</strong>, je fais le pont entre les besoins support/business et l'exécution technique. Du <strong className="text-slate-800">trust &amp; safety</strong> à l'automatisation du support, jusqu'au code que j'écris moi-même quand c'est le plus rapide.
                    </p>

                    {/* Key Pillars */}
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 transition-all duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 text-blue-600 mb-6">
                                <Shield className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">Trust &amp; Safety</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-light">
                                Automatisation de la lutte anti-fraude et migration vers le Core, sans interruption de service.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 transition-all duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 mb-6">
                                <Gauge className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">Efficacité opérationnelle</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-light">
                                Réduction du temps humain côté support : refund automatisé, recherche de remplacement, Resolution Center.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-slate-50 p-6 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 transition-all duration-300">
                            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 text-purple-600 mb-6">
                                <Code className="h-6 w-6" />
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 mb-3">AI-native &amp; hands-on</h4>
                            <p className="text-sm text-slate-600 leading-relaxed font-light">
                                Outillage IA pour l'équipe produit (Product OS) et développement direct quand c'est le plus rapide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
