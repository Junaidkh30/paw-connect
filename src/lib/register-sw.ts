export function registerServiceWorker() {
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          // Check for updates
          reg.addEventListener("updatefound", () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.addEventListener("statechange", () => {
                if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {
                  console.log("PawConnect cache updated. New content ready on next reload.");
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn("ServiceWorker registration failed:", err);
        });
    });
  }
}
