import { createContext, type ReactNode, useCallback, useContext, useState } from "react";
import { Icon } from "./Icon";

type Tone = "success" | "danger";

interface Toast {
  id: number;
  tone: Tone;
  message: string;
  action?: { label: string; run: () => void };
}

type Show = (toast: Omit<Toast, "id">) => void;

const ToastContext = createContext<Show>(() => {});

/** Shows a toast. Success toasts leave after 5s; danger toasts stay until dismissed, since they ask for an action. */
export const useToast = () => useContext(ToastContext);

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const dismiss = useCallback((id: number) => setToasts((all) => all.filter((toast) => toast.id !== id)), []);
  const show = useCallback<Show>(
    (toast) => {
      const id = ++nextId;
      setToasts((all) => [...all, { ...toast, id }]);
      if (toast.tone === "success") setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={show}>
      {children}
      <ol className="ui-toast-region" aria-live="polite">
        {toasts.map((toast) => (
          <li key={toast.id} className="ui-toast" data-tone={toast.tone}>
            <Icon name={toast.tone === "danger" ? "circleAlert" : "circleCheck"} />
            <p className="ui-toast__message">{toast.message}</p>
            {toast.action && (
              <button
                type="button"
                className="ui-button"
                data-variant="secondary"
                data-size="sm"
                onClick={() => {
                  dismiss(toast.id);
                  toast.action?.run();
                }}
              >
                {toast.action.label}
              </button>
            )}
            <button
              type="button"
              className="ui-button"
              data-variant="ghost"
              data-size="sm"
              aria-label="Dismiss"
              onClick={() => dismiss(toast.id)}
            >
              <Icon name="x" />
            </button>
          </li>
        ))}
      </ol>
    </ToastContext.Provider>
  );
}
