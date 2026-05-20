interface FlightCardProps {
  flightNo: string;
  origin: string;
  destination: string;
  price: number;
}

export default function FlightCard({
  flightNo,
  origin,
  destination,
  price,
}: FlightCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      
      <div className="flex items-center justify-between">
        
        <div>
          <h2 className="text-2xl font-bold">
            {flightNo}
          </h2>

          <p className="mt-2 text-slate-400">
            {origin} → {destination}
          </p>
        </div>

        <div className="text-right">
          <p className="text-cyan-400 text-2xl font-bold">
            ₹{price}
          </p>

          <button className="mt-3 rounded-xl bg-cyan-400 px-5 py-2 font-semibold text-black">
            Book Now
          </button>
        </div>

      </div>

    </div>
  );
}