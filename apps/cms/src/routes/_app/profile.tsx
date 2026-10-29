import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "../../api/client";
import { profileQuery, queryClient } from "../../api/queries";
import type { Intent, Profile } from "../../api/types";
import { PageHeader } from "../../components/AppShell";
import { ConfirmDialog, ErrorSummary, LoadError, StatusBadge } from "../../components/feedback";
import { LocalePair, TextField } from "../../components/fields";
import { FormSkeleton, SubmitButtons, UnsavedChanges } from "../../components/form";
import { PortraitUpload } from "../../components/PortraitUpload";
import { useToast } from "../../components/Toasts";
import { type ProfileValues, profileFields, profileSchema, toInput, toValues } from "../../forms/profile";
import { useIntentForm } from "../../forms/useIntentForm";

export const Route = createFileRoute("/_app/profile")({ component: ProfilePage });

function ProfilePage() {
  const profile = useQuery(profileQuery);
  if (profile.data) return <ProfileForm profile={profile.data} />;
  return (
    <>
      <PageHeader title="Profile" />
      {profile.isError ? (
        <LoadError what="your profile" onRetry={() => profile.refetch()} retrying={profile.isFetching} />
      ) : (
        <FormSkeleton what="profile" />
      )}
    </>
  );
}

function ProfileForm({ profile }: { profile: Profile }) {
  const toast = useToast();
  const { form, problems, attempt, onSubmit, error } = useIntentForm(profileSchema, toValues(profile), profileFields);
  const { register, watch, setValue, reset } = form;
  const [confirming, setConfirming] = useState<ProfileValues | null>(null);

  const save = useMutation({
    mutationFn: ({ values, intent }: { values: ProfileValues; intent: Intent }) =>
      api.saveProfile(toInput(values), intent),
    onSuccess: (saved, { values, intent }) => {
      reset(values);
      queryClient.setQueryData(profileQuery.queryKey, saved);
      toast({ tone: "success", message: intent === "publish" ? "Published." : "Saved as Draft." });
    },
    onError: (failure, variables) =>
      toast({
        tone: "danger",
        message: `Couldn’t ${variables.intent === "publish" ? "publish" : "save"}. ${failure.message}`,
        action: { label: "Retry", run: () => save.mutate(variables) },
      }),
  });

  const pair = (name: "greeting" | "role" | "lead", legend: string, area = false) => (
    <LocalePair
      name={name}
      legend={legend}
      en={register(`${name}.en`)}
      pt={register(`${name}.pt`)}
      errors={{ en: error(`${name}.en`), pt: error(`${name}.pt`) }}
      ptMissing={!watch(`${name}.pt`).trim()}
      area={area}
    />
  );

  return (
    <>
      <PageHeader
        title="Profile"
        status={<StatusBadge status={profile.status} />}
        actions={<SubmitButtons form="profile-form" pending={save.isPending ? save.variables.intent : null} />}
      />
      <form
        id="profile-form"
        className="ui-form"
        noValidate
        onSubmit={onSubmit((values, intent) =>
          intent === "publish" ? setConfirming(values) : save.mutate({ values, intent }),
        )}
      >
        <ErrorSummary problems={problems} attempt={attempt} />
        <div className="ui-form__grid">
          <TextField id="name" label="Full name" registration={register("name")} error={error("name")} />
          <TextField
            id="short-name"
            label="Short name"
            hint="The name you go by. Your portrait sits after it in the introduction."
            registration={register("shortName")}
            error={error("shortName")}
          />
          {pair("greeting", "Greeting")}
          {pair("role", "Role")}
          {pair("lead", "Statement", true)}
          <div className="ui-field ui-form__wide">
            <span className="ui-field__label">Portrait (optional)</span>
            <PortraitUpload
              value={watch("portrait")}
              initials={initialsOf(watch("name"))}
              onChange={(url) => setValue("portrait", url, { shouldDirty: true })}
            />
          </div>
          <TextField
            id="email"
            label="Email"
            type="email"
            inputMode="email"
            registration={register("email")}
            error={error("email")}
          />
          <TextField
            id="github"
            label="GitHub (optional)"
            type="url"
            inputMode="url"
            registration={register("github")}
            error={error("github")}
          />
          <TextField
            id="linkedin"
            label="LinkedIn (optional)"
            type="url"
            inputMode="url"
            registration={register("linkedin")}
            error={error("linkedin")}
          />
        </div>
      </form>
      <ConfirmDialog
        open={confirming !== null}
        title="Publish your profile?"
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

const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .filter((_, index, all) => index === 0 || index === all.length - 1)
    .join("");
