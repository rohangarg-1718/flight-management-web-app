"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
  }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => {
      event.preventDefault();

      setDeferredPrompt(
        event as BeforeInstallPromptEvent
      );

      setVisible(true);
    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 rounded-2xl border border-cyan-500/30 bg-slate-900 p-5 shadow-2xl">
      <h3 className="text-lg font-semibold text-white">
        Install SkyRoute India
      </h3>

      <p className="mt-2 text-sm text-slate-400">
        Add this app to your home screen for a faster
        and app-like experience.
      </p>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setVisible(false)}
          className="flex-1 rounded-xl border border-slate-700 px-4 py-2 text-white"
        >
          Later
        </button>

        <button
          onClick={handleInstall}
          className="flex-1 rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-black"
        >
          Install
        </button>
      </div>
    </div>
  );
}