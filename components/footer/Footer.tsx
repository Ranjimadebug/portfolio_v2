// Extracted from the Contact section so every page (the homepage's Contact
// section included) renders the exact same footer instead of maintaining
// near-duplicate copies that can drift apart over time.
export default function Footer() {
    return (
        <footer className="max-w-7xl mx-auto w-full mt-16 md:mt-24 flex flex-col md:flex-row gap-8 md:gap-0 justify-between items-start md:items-center text-[10px] font-mono text-(--foreground)/40 border-t border-(--border-soft) pt-8 md:pt-12">

            {/* Left */}
            <div className="flex gap-6 md:gap-10 flex-wrap">
                <div>
                    <p className="tracking-widest mb-1 text-(--foreground)/60">LOCATION</p>
                    <p className="text-(--foreground)/70">BENGALURU, IN</p>
                </div>
                <div>
                    <p className="tracking-widest mb-1 text-(--foreground)/60">STATUS</p>
                    <p className="text-emerald-500 animate-pulse">● ONLINE</p>
                </div>
            </div>

            {/* Center */}
            <div className="w-full md:flex-1 text-left md:text-center text-(--foreground)/50 tracking-widest">
                © {new Date().getFullYear()} RANJIMA GHOSH
            </div>

            {/* Right */}
            <div className="text-left md:text-right">
                <p className="tracking-[0.4em] mb-1 text-(--foreground)/60">SYSTEM_VERSION</p>
                <p className="italic text-(--foreground)/50 underline decoration-purple-500/30">
                    TERMINAL_V2.0
                </p>
            </div>

        </footer>
    )
}
