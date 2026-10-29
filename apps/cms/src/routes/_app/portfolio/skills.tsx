import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../api/client";
import { experienceList, queryClient, skillList } from "../../../api/queries";
import type { Skill } from "../../../api/types";
import { PageHeader, PORTFOLIO } from "../../../components/AppShell";
import { ConfirmDialog, LoadError } from "../../../components/feedback";
import { TextField } from "../../../components/fields";
import { Icon, Spinner } from "../../../components/Icon";
import { useToast } from "../../../components/Toasts";
import "../../../styles/skills.css";

export const Route = createFileRoute("/_app/portfolio/skills")({ component: SkillsPage });

const schema = z.object({ name: z.string().trim().min(1, "enter the technology’s name") });

const refresh = () => queryClient.invalidateQueries({ queryKey: skillList.queryKey });

function SkillsPage() {
  const skills = useQuery(skillList);
  const roles = useQuery(experienceList);
  const toast = useToast();
  const [deleting, setDeleting] = useState<Skill | null>(null);
  const { register, handleSubmit, formState, reset, setError, setFocus } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "" },
  });

  const add = useMutation({
    mutationFn: (name: string) => api.addSkill(name),
    onSuccess: (skill) => {
      reset();
      setFocus("name");
      toast({ tone: "success", message: `Added ${skill.name}.` });
      refresh();
    },
    onError: (failure) => setError("name", { message: failure.message.replace(/\.$/, "") }),
  });
  const move = useMutation({
    mutationFn: ({ id, offset }: { id: string; offset: -1 | 1 }) => api.moveSkill(id, offset),
    onSettled: refresh,
  });
  const remove = useMutation({
    mutationFn: (skill: Skill) => api.deleteSkill(skill.id),
    onSuccess: () => {
      toast({ tone: "success", message: "Deleted." });
      refresh();
    },
    onError: (failure, skill) =>
      toast({ tone: "danger", message: `Couldn’t delete ${skill.name}. ${failure.message}` }),
  });

  const usedIn = (id: string) => roles.data?.filter((role) => role.stack.includes(id)).length;

  return (
    <>
      <PageHeader title="Skills" crumbs={[PORTFOLIO]} />
      <p className="skills__lede">
        The technologies you work with. The Portfolio’s Stack band shows them in this order.
      </p>
      <form className="skills__add" noValidate onSubmit={handleSubmit(({ name }) => add.mutate(name))}>
        <TextField
          id="name"
          label="Technology"
          registration={register("name")}
          error={formState.errors.name?.message}
        />
        <button type="submit" className="ui-button" data-variant="secondary" aria-busy={add.isPending || undefined}>
          {add.isPending ? <Spinner /> : <Icon name="plus" />}
          <span>{add.isPending ? "Adding…" : "Add skill"}</span>
        </button>
      </form>
      <p className="ui-visually-hidden" role="status">
        {skills.isPending ? "Loading skills" : skills.isSuccess ? "Skills loaded" : ""}
      </p>
      {skills.isError ? (
        <LoadError what="skills" onRetry={() => skills.refetch()} retrying={skills.isFetching} />
      ) : skills.data?.length === 0 ? (
        <div className="ui-content-list__empty">
          <strong>No skills yet</strong>
          <p>Add the technologies you want hiring teams to see first, such as React or TypeScript.</p>
        </div>
      ) : (
        <table className="ui-content-list" aria-busy={skills.isPending || undefined}>
          <caption className="ui-visually-hidden">Skills, in Portfolio order</caption>
          <thead>
            <tr>
              <th scope="col">Technology</th>
              <th scope="col">Used in</th>
              <th scope="col">
                <span className="ui-visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {skills.data?.map((skill, index, all) => (
              <tr key={skill.id}>
                <td className="ui-content-list__title">{skill.name}</td>
                <td className="ui-content-list__detail">{roleCount(usedIn(skill.id))}</td>
                <td>
                  <div className="ui-content-list__actions">
                    <IconButton
                      icon="arrowUp"
                      label={`Move ${skill.name} up`}
                      disabled={index === 0 || move.isPending}
                      onClick={() => move.mutate({ id: skill.id, offset: -1 })}
                    />
                    <IconButton
                      icon="arrowDown"
                      label={`Move ${skill.name} down`}
                      disabled={index === all.length - 1 || move.isPending}
                      onClick={() => move.mutate({ id: skill.id, offset: 1 })}
                    />
                    <IconButton icon="trash" label={`Delete ${skill.name}`} onClick={() => setDeleting(skill)} />
                  </div>
                </td>
              </tr>
            )) ??
              [0, 1, 2].map((row) => (
                <tr key={row}>
                  <td>
                    <span className="ui-skeleton" data-shape="line" aria-hidden="true" style={{ width: "8rem" }} />
                  </td>
                  <td>
                    <span className="ui-skeleton" data-shape="line" aria-hidden="true" style={{ width: "5rem" }} />
                  </td>
                  <td />
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <ConfirmDialog
        open={deleting !== null}
        title={`Delete “${deleting?.name}”?`}
        confirm="Delete"
        danger
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (deleting) remove.mutate(deleting);
          setDeleting(null);
        }}
      >
        <p>It will leave the Stack band on the Portfolio. Skills still used in a role can’t be deleted.</p>
      </ConfirmDialog>
    </>
  );
}

const roleCount = (count: number | undefined) =>
  count === undefined ? "–" : count === 0 ? "No roles" : `${count} ${count === 1 ? "role" : "roles"}`;

function IconButton({
  icon,
  label,
  disabled,
  onClick,
}: {
  icon: "arrowUp" | "arrowDown" | "trash";
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="ui-button"
      data-variant="ghost"
      data-size="sm"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      <Icon name={icon} />
    </button>
  );
}
