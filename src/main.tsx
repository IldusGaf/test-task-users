import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import { AppRouterProvider } from "./app/providers/AppRouterProvider/ui/AppRouterProvider.tsx";
import { StoreProvider } from "./app/providers/StoreProvider/index.ts";

async function enableMocking() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }
  // @ts-ignore
  const { worker } = await import("../mocks/browser.js");
  return worker.start();
}

enableMocking().then(() =>
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <StoreProvider>
        <AppRouterProvider />
      </StoreProvider>
    </StrictMode>
  )
);
