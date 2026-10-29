import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "../../../api/client";
import { experienceList, queryClient } from "../../../api/queries";
import type { Experience } from "../../../api/types";
import { PageHeader } from "../../../components/AppShell";
import { ConfirmDialog, LoadError, StatusBadge } from "../../../components/feedback";
import { Icon } from "../../../components/Icon";
import { useToast } from "../../../components/Toasts";
import { formatPeriod } from "../../../format";

export const Route = createFileRoute("/_app/experience/")({ component: ExperienceList });

const addButton = (
  <Link className="ui-button" to="/experience/$id" params={{ id: "new" }}>
    <Icon name="plus" />
    <span>Add experience</span>
  </Link>
);

function ExperienceList() {
  const list = useQuery(experienceList);
  const toast = useToast();
  const [deleting, setDeleting] = useState<Experience | null>(null);
  const remove = useMutation({
    mutationFn: api.deleteExperience,
    onSuccess: () => {
      toast({ tone: "success", message: "Deleted." });
      queryClient.invalidateQueries({ queryKey: experienceList.queryKey });
    },
    onError: (error) => toast({ tone: "danger", message: `Couldn’t delete. ${error.message}` }),
  });

  return (
    <>
      <PageHeader title="Experience" actions={list.data?.length ? addButton : undefined} />
      <p className="ui-visually-hidden" role="status">
        {list.isPending ? "Loading experience" : list.isSuccess ? "Experience loaded" : ""}
      </p>
      {list.isError ? (
        <LoadError what="experience" onRetry={() => list.refetch()} retrying={list.isFetching} />
      ) : list.data?.length === 0 ? (
        <div className="ui-content-list__empty">
          <strong>No experience yet</strong>
          <p>Add a role to show it on the Portfolio once it’s Published in both Locales.</p>
          {addButton}
        </div>
      ) : (
        <table className="ui-content-list" aria-busy={list.isPending || undefined}>
          <caption className="ui-visually-hidden">Experience</caption>
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Company and period</th>
              <th scope="col">Status</th>
              <th scope="col">
                <span className="ui-visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {list.data?.map((item) => (
              <tr key={item.id}>
                <td className="ui-content-list__title">{item.role.en}</td>
                <td className="ui-content-list__detail">
                  {item.organization} · {formatPeriod(item.start, item.end)}
                </td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
                <td>
                  <div className="ui-content-list__actions">
                    <Link
                      className="ui-button"
                      data-variant="ghost"
                      data-size="sm"
                      to="/experience/$id"
                      params={{ id: item.id }}
                    >
                      <Icon name="pencil" />
                      <span>
                        Edit<span className="ui-visually-hidden"> {item.role.en}</span>
                      </span>
                    </Link>
                    <button
                      type="button"
                      className="ui-button"
                      data-variant="ghost"
                      data-size="sm"
                      aria-label={`Delete ${item.role.en}`}
                      onClick={() => setDeleting(item)}
                    >
                      <Icon name="trash" />
                    </button>
                  </div>
                </td>
              </tr>
            )) ?? <SkeletonRows />}
          </tbody>
        </table>
      )}
      <ConfirmDialog
        open={deleting !== null}
        title={`Delete “${deleting?.role.en}”?`}
        confirm="Delete"
        danger
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) remove.mutate(deleting.id);
          setDeleting(null);
        }}
      >
        <p>It will be removed from the CMS and, if Published, from the Portfolio. This can’t be undone.</p>
      </ConfirmDialog>
    </>
  );
}

const SkeletonRows = () =>
  [0, 1, 2].map((row) => (
    <tr key={row}>
      <td>
        <span className="ui-skeleton" data-shape="line" aria-hidden="true" style={{ width: "12rem" }} />
      </td>
      <td>
        <span className="ui-skeleton" data-shape="line" aria-hidden="true" style={{ width: "14rem" }} />
      </td>
      <td>
        <span className="ui-skeleton" data-shape="line" aria-hidden="true" style={{ width: "5rem" }} />
      </td>
      <td />
    </tr>
  ));
