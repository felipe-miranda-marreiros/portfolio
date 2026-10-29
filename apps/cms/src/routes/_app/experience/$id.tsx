import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "../../../api/client";
import { experienceItem, experienceList, queryClient, skillList } from "../../../api/queries";
import type { Experience, Intent } from "../../../api/types";
import { PageHeader } from "../../../components/AppShell";
import { ConfirmDialog, ErrorSummary, LoadError, StatusBadge } from "../../../components/feedback";
import { DateField, LocalePair, TextField } from "../../../components/fields";
import { FormSkeleton, SubmitButtons, UnsavedChanges } from "../../../components/form";
import { useToast } from "../../../components/Toasts";
import {
  type ExperienceValues,
  experienceFields,
  experienceSchema,
  toInput,
  toValues,
} from "../../../forms/experience";
import { useIntentForm } from "../../../forms/useIntentForm";

export const Route = createFileRoute("/_app/experience/$id")({ component: ExperiencePage });

function ExperiencePage() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const item = useQuery({ ...experienceItem(id), enabled: !isNew });

  if (isNew || item.data) return <ExperienceForm key={id} item={item.data} />;
  return (
    <>
      <PageHeader title="Experience" />
      {item.isError ? (
        <LoadError what="this experience" onRetry={() => item.refetch()} retrying={item.isFetching} />
      ) : (
        <FormSkeleton what="experience" />
      )}
    </>
  );
}

function ExperienceForm({ item }: { item?: Experience }) {
  const navigate = useNavigate();
  const toast = useToast();
  const skills = useQuery(skillList);
  const { form, problems, attempt, onSubmit, error } = useIntentForm(
    experienceSchema,
    toValues(item),
    experienceFields,
  );
  const { register, watch, reset } = form;
  const [confirming, setConfirming] = useState<ExperienceValues | null>(null);

  const save = useMutation({
    mutationFn: ({ values, intent }: { values: ExperienceValues; intent: Intent }) =>
      api.saveExperience(item?.id, toInput(values), intent),
    onSuccess: (saved, { values, intent }) => {
      reset(values);
      queryClient.setQueryData(experienceItem(saved.id).queryKey, saved);
      queryClient.invalidateQueries({ queryKey: experienceList.queryKey });
      toast({ tone: "success", message: intent === "publish" ? "Published." : "Saved as Draft." });
      if (!item) navigate({ to: "/experience/$id", params: { id: saved.id }, replace: true, ignoreBlocker: true });
    },
    onError: (failure, variables) =>
      toast({
        tone: "danger",
        message: `Couldn’t ${variables.intent === "publish" ? "publish" : "save"}. ${failure.message}`,
        action: { label: "Retry", run: () => save.mutate(variables) },
      }),
  });

  const present = watch("present");
  const summaryEn = watch("summary.en");
  const title = watch("role.en").trim() || item?.role.en || "New experience";

  return (
    <>
      <PageHeader
        title={item ? item.role.en : "New experience"}
        status={<StatusBadge status={item?.status ?? "draft"} />}
        actions={<SubmitButtons form="experience-form" pending={save.isPending ? save.variables.intent : null} />}
      />
      <form
        id="experience-form"
        className="ui-form"
        noValidate
        onSubmit={onSubmit((values, intent) =>
          intent === "publish" ? setConfirming(values) : save.mutate({ values, intent }),
        )}
      >
        <ErrorSummary problems={problems} attempt={attempt} />
        <div className="ui-form__grid">
          <LocalePair
            name="role"
            legend="Role"
            en={register("role.en")}
            pt={register("role.pt")}
            errors={{ en: error("role.en"), pt: error("role.pt") }}
            ptMissing={!watch("role.pt").trim()}
          />
          <TextField
            id="organization"
            label="Company"
            registration={register("organization")}
            error={error("organization")}
          />
          <TextField
            id="location"
            label="Location"
            hint="City, or Remote."
            registration={register("location")}
            error={error("location")}
          />
          <DateField
            name="start"
            legend="Start"
            month={register("startMonth")}
            year={register("startYear")}
            error={error("startYear")}
          />
          <DateField
            name="end"
            legend="End"
            month={register("endMonth")}
            year={register("endYear")}
            error={error("endYear")}
            disabled={present}
          >
            <label className="ui-checkbox">
              <input type="checkbox" id="end-present" {...register("present", { deps: ["endYear"] })} /> Present (I
              still work here)
            </label>
          </DateField>
          <fieldset className="ui-checkbox-group ui-form__wide">
            <legend className="ui-checkbox-group__legend">Stack (optional)</legend>
            {skills.data?.map((skill) => (
              <label key={skill.id} className="ui-checkbox">
                <input type="checkbox" value={skill.id} {...register("stack")} /> {skill.name}
              </label>
            ))}
            {skills.isError && <p>Couldn’t load your skills. Reload the page to choose them.</p>}
          </fieldset>
          <LocalePair
            name="summary"
            legend="Summary (optional)"
            en={register("summary.en")}
            pt={register("summary.pt")}
            errors={{ en: error("summary.en"), pt: error("summary.pt") }}
            ptMissing={Boolean(summaryEn.trim()) && !watch("summary.pt").trim()}
            area
          />
        </div>
      </form>
      <ConfirmDialog
        open={confirming !== null}
        title={`Publish “${title}”?`}
        confirm="Publish"
        onCancel={() => setConfirming(null)}
        onConfirm={() => {
          if (confirming) save.mutate({ values: confirming, intent: "publish" });
          setConfirming(null);
        }}
      >
        <p>It will appear on the Portfolio in English and Portuguese.</p>
      </ConfirmDialog>
      <UnsavedChanges dirty={form.formState.isDirty} />
    </>
  );
}
