import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/styles/index.css";
import { AppRouterProvider } from "./app/providers/AppRouterProvider/ui/AppRouterProvider.tsx";
import { StoreProvider } from "./app/providers/StoreProvider/index.ts";

async function enableMocking() {
  // Закомментил, для того, чтобы залить с раб. mock-backend в github pages
  // if (process.env.NODE_ENV !== "development") {
  //   return;
  // }
  // @ts-expect-error Прописал т.к. это требуется для работы mock-backend
  const { worker } = await import("../mocks/browser.js");
  return worker.start({
    serviceWorker: {
      url: `/${
        import.meta.env.VITE_BUILD_MODE === "gh-pages" ? "test-task-users/" : ""
      }mockServiceWorker.js`,
    },
  });
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
