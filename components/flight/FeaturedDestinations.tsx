const airplaneImages = [
  "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529074963764-98f45c47344b?q=80&w=1400&auto=format&fit=crop",
];

const destinations = [
  {
    city: "Delhi",
    route: "Delhi → Mumbai",
    price: "₹4,999",
    image: airplaneImages[0],
  },
  {
    city: "Mumbai",
    route: "Mumbai → Bengaluru",
    price: "₹5,799",
    image: airplaneImages[1],
  },
  {
    city: "Jaipur",
    route: "Delhi → Jaipur",
    price: "₹2,999",
    image: airplaneImages[2],
  },
];

export default function FeaturedDestinations() {
  return (
    <div className="mt-16">
      <div className="mb-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900">
        <div
          className="min-h-[320px] bg-cover bg-center p-6 md:p-10"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(2,6,23,0.95), rgba(2,6,23,0.65), rgba(2,6,23,0.15)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop')",
          }}
        >
          <div className="max-w-xl">
            <p className="mb-4 inline-block rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              Fast • Safe • Reliable
            </p>

            <h2 className="text-4xl font-bold md:text-5xl">
              Fly Across India With Confidence
            </h2>

            <p className="mt-4 text-slate-300">
              Book domestic flights with realtime seat availability, easy
              cancellation, and smooth booking management.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div
            className="h-64 rounded-2xl bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=1400&auto=format&fit=crop')",
            }}
          />

          <div>
            <p className="text-sm font-semibold text-cyan-400">
              Limited Time Offer
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              Take Off To New Adventures
            </h3>

            <p className="mt-3 text-slate-400">
              Save up to 25% on selected domestic routes with instant booking
              confirmation and live seat updates.
            </p>

            <div className="mt-5 inline-block rounded-2xl border border-dashed border-cyan-400 px-6 py-4">
              <p className="text-slate-400">Use Code</p>
              <p className="text-2xl font-bold text-cyan-400">FLYINDIA25</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-semibold text-cyan-400">
          Domestic Offers
        </p>
        <h2 className="text-3xl font-bold">Featured Indian Routes</h2>
        <p className="mt-2 text-slate-400">
          Explore popular Indian routes with stylish flight booking experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {destinations.map((destination) => (
          <div
            key={destination.route}
            className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
          >
            <div
              className="h-56 bg-cover bg-center transition duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${destination.image})` }}
            />

            <div className="p-5">
              <h3 className="text-2xl font-semibold">{destination.city}</h3>
              <p className="mt-1 text-slate-400">{destination.route}</p>
              <p className="mt-4 font-bold text-cyan-400">
                Starting from {destination.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}