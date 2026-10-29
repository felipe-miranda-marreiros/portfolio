import { type ReactNode, useEffect, useRef } from "react";
import type { Status } from "../api/types";
import { Icon } from "./Icon";

export function StatusBadge({ status }: { status: Status }) {
  return status === "published" ? (
    <span className="ui-status" data-status="published">
      <Icon name="check" />
      <span>Published</span>
    </span>
  ) : (
    <span className="ui-status" data-status="draft">
      Draft
    </span>
  );
}

/** The error pattern for a page or list that couldn't load: what happened, and a retry. */
export function LoadError({ what, onRetry, retrying }: { what: string; onRetry: () => void; retrying: boolean }) {
  return (
    <div className="ui-message" data-tone="danger" role="alert">
      <Icon name="circleAlert" />
      <p className="ui-message__title">Couldn’t load {what}</p>
      <div className="ui-message__body">
        <p>The API didn’t answer. Nothing was lost.</p>
        <button
          type="button"
          className="ui-button"
          data-variant="secondary"
          data-size="sm"
          aria-busy={retrying || undefined}
          onClick={onRetry}
        >
          <Icon name="loader" className="ui-button__spinner" />
          <span>{retrying ? "Trying again…" : "Try again"}</span>
        </button>
      </div>
    </div>
  );
}

export interface Problem {
  id: string;
  label: string;
  message: string;
}

/** The form error summary: lists problems in page order and takes focus, since the Owner has to act on it. */
export function ErrorSummary({ problems, attempt }: { problems: Problem[]; attempt: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (attempt) ref.current?.focus();
  }, [attempt]);
  if (!problems.length) return null;
  const noun = problems.length === 1 ? "There is 1 problem" : `There are ${problems.length} problems`;
  return (
    <div
      ref={ref}
      className="ui-message ui-error-summary"
      data-tone="danger"
      role="alert"
      tabIndex={-1}
      aria-labelledby="error-summary-title"
    >
      <Icon name="circleAlert" />
      <p className="ui-message__title" id="error-summary-title">
        {noun} with this entry
      </p>
      <div className="ui-message__body">
        <ul>
          {problems.map((problem) => (
            <li key={problem.id}>
              <a
                className="ui-link"
                href={`#${problem.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  document.getElementById(problem.id)?.focus();
                }}
              >
                {problem.label}: {problem.message}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** A modal confirmation on the native `<dialog>`, opened while `open` is true. Cancel takes initial focus. */
export function ConfirmDialog({
  open,
  title,
  children,
  confirm,
  danger = false,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  children: ReactNode;
  confirm: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog?.open) dialog?.showModal();
    if (!open && dialog?.open) dialog.close();
  }, [open]);
  return (
    <dialog ref={ref} className="ui-dialog" aria-labelledby="dialog-title" onClose={onCancel}>
      <h2 className="ui-dialog__title" id="dialog-title">
        {title}
      </h2>
      <div className="ui-dialog__body">{children}</div>
      <div className="ui-dialog__actions">
        {/* biome-ignore lint/a11y/noAutofocus: the dialog pattern puts initial focus on the safe choice. */}
        <button type="button" className="ui-button" data-variant="ghost" autoFocus onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="ui-button" data-variant={danger ? "danger" : undefined} onClick={onConfirm}>
          {confirm}
        </button>
      </div>
    </dialog>
  );
}
