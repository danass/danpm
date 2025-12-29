export default function GlassCard({ children, className = '' }) {
    return (
        <div className={`relative backdrop-blur-sm bg-white/60 rounded-2xl border border-white/20 shadow-xl print:backdrop-blur-none print:bg-white print:border-none print:shadow-none print:rounded-none ${className}`}>
            {children}
        </div>
    )
}
