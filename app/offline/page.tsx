export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-lg rounded-3xl border border-slate-800 bg-slate-900 p-8 text-center">
        <h1 className="text-4xl font-bold text-cyan-400">
          You Are Offline
        </h1>

        <p className="mt-4 text-slate-400">
          Internet connection is unavailable right now.
          Please reconnect to continue booking flights.
        </p>
      </div>
    </div>
  );
}