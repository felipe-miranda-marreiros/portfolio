import { useBlocker } from "@tanstack/react-router";
import type { Intent } from "../api/types";
import { ConfirmDialog } from "./feedback";
import { Spinner } from "./Icon";

/** Save draft and Publish for the app shell header, tied to the form by id; the pending one shows its spinner. */
export function SubmitButtons({ form, pending }: { form: string; pending: Intent | null }) {
  return (
    <>
      <button
        type="submit"
        form={form}
        value="draft"
        className="ui-button"
        data-variant="secondary"
        aria-busy={pending === "draft" || undefined}
      >
        <Spinner />
        <span>{pending === "draft" ? "Saving…" : "Save draft"}</span>
      </button>
      <button
        type="submit"
        form={form}
        value="publish"
        className="ui-button"
        aria-busy={pending === "publish" || undefined}
      >
        <Spinner />
        <span>{pending === "publish" ? "Publishing…" : "Publish"}</span>
      </button>
    </>
  );
}

/** Field-shaped skeletons while an item loads, announced once. */
export function FormSkeleton({ what }: { what: string }) {
  return (
    <div className="ui-form" aria-busy="true">
      <p className="ui-visually-hidden" role="status">
        Loading {what}
      </p>
      <div className="ui-form__grid" aria-hidden="true">
        {["ui-form__wide", "", "", "", ""].map((className, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of placeholder blocks that never reorders.
          <div key={index} className={className}>
            <span className="ui-skeleton" data-shape="line" style={{ width: "8rem" }} />
            <span className="ui-skeleton" data-shape="block" style={{ height: "var(--size-control-md)" }} />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Asks before leaving a form with unsaved changes, in the app and when closing the tab.
 * Read `isDirty` from `formState` while rendering: react-hook-form only tracks state that a render reads.
 */
export function UnsavedChanges({ dirty }: { dirty: boolean }) {
  const blocker = useBlocker({ shouldBlockFn: () => dirty, enableBeforeUnload: () => dirty, withResolver: true });
  return (
    <ConfirmDialog
      open={blocker.status === "blocked"}
      title="Leave without saving?"
      confirm="Leave"
      danger
      onCancel={() => blocker.reset?.()}
      onConfirm={() => blocker.proceed?.()}
    >
      <p>Your changes on this page haven’t been saved.</p>
    </ConfirmDialog>
  );
}
