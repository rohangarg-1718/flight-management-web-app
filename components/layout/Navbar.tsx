export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-white">
                <h1 className="text-xl font-bold">
                    SkyRoute<span className="text-cyan-400"> India</span>
                </h1>

                <div className="hidden gap-6 text-sm text-slate-300 md:flex">
                    <a href="#" className="hover:text-cyan-400">Search</a>
                    <a href="#" className="hover:text-cyan-400">Bookings</a>
                    <a href="#" className="hover:text-cyan-400">Seats</a>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="#auth"
                        className="rounded-xl border border-slate-700 px-4 py-2 text-sm hover:border-cyan-400"
                    >
                        Sign Up
                    </a>

                    <a
                        href="#auth"
                        className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-semibold text-black"
                    >
                        Login
                    </a>
                </div>
            </div>
        </nav>
    );
}