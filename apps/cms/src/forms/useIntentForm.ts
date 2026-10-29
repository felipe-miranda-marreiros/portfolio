import { zodResolver } from "@hookform/resolvers/zod";
import { type FormEvent, useRef, useState } from "react";
import { type DefaultValues, type FieldValues, get, type Resolver, useForm } from "react-hook-form";
import type { z } from "zod";
import type { Intent } from "../api/types";
import type { Problem } from "../components/feedback";

/** Each validated field's path in the form values, with the element id and the label the error summary uses. */
export type FieldMap = Record<string, { id: string; label: string }>;

/**
 * A form with two submit intents (forms pattern): Save draft checks only what a Draft needs, Publish adds the
 * both-Locales rule. Nothing is validated before the first submit; after it, each field re-checks as it changes.
 */
export function useIntentForm<V extends FieldValues>(
  schema: (intent: Intent) => z.ZodType<V>,
  defaultValues: DefaultValues<V>,
  fields: FieldMap,
) {
  const intent = useRef<Intent>("draft");
  const [attempt, setAttempt] = useState(0);
  const resolver: Resolver<V> = (values, context, options) =>
    zodResolver(schema(intent.current) as never)(values, context, options as never) as never;
  const form = useForm<V>({ resolver, defaultValues, mode: "onSubmit", reValidateMode: "onChange" });

  const error = (path: string) => (get(form.formState.errors, path) as { message?: string } | undefined)?.message;
  const problems: Problem[] = Object.entries(fields).flatMap(([path, field]) => {
    const message = error(path);
    return message ? [{ ...field, message }] : [];
  });

  /** Reads which button submitted the form, then validates for that intent. */
  const onSubmit = (onValid: (values: V, intent: Intent) => void) => (event: FormEvent<HTMLFormElement>) => {
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    intent.current = submitter?.value === "publish" ? "publish" : "draft";
    return form.handleSubmit(
      (values) => onValid(values, intent.current),
      () => setAttempt((count) => count + 1),
    )(event);
  };

  return { form, problems, attempt, onSubmit, error };
}
