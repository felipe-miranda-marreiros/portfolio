import type { ReactNode } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Icon } from "./Icon";

const describedBy = (...ids: (string | false | undefined)[]) => ids.filter(Boolean).join(" ") || undefined;

const capitalise = (text: string) => `${text[0].toUpperCase()}${text.slice(1)}.`;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p className="ui-field__error" id={`${id}-error`}>
      <Icon name="circleAlert" />
      <span>{capitalise(message)}</span>
    </p>
  );
}

interface TextFieldProps {
  id: string;
  label: ReactNode;
  registration: UseFormRegisterReturn;
  error?: string;
  hint?: string;
  area?: boolean;
  type?: string;
  lang?: string;
  inputMode?: "numeric" | "email" | "url";
  className?: string;
  missing?: string;
}

/** A labelled text field or text area with its hint, error and, in a locale pair, the missing-Locale warning. */
export function TextField({ id, label, registration, error, hint, area, missing, className, ...rest }: TextFieldProps) {
  const control = {
    id,
    className: "ui-input",
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy(hint && `${id}-hint`, missing && `${id}-missing`, error && `${id}-error`),
    ...rest,
    ...registration,
  };
  return (
    <div className={`ui-field ${className ?? ""}`.trim()} data-missing={missing && !error ? "" : undefined}>
      <label className="ui-field__label" htmlFor={id}>
        {label}
      </label>
      {hint && (
        <p className="ui-field__hint" id={`${id}-hint`}>
          {hint}
        </p>
      )}
      {area ? <textarea {...control} /> : <input {...control} />}
      {missing && !error && (
        <p className="ui-locale-pair__missing" id={`${id}-missing`}>
          <Icon name="triangleAlert" />
          <span>{missing}</span>
        </p>
      )}
      <FieldError id={id} message={error} />
    </div>
  );
}

interface LocalePairProps {
  name: string;
  legend: string;
  en: UseFormRegisterReturn;
  pt: UseFormRegisterReturn;
  errors: { en?: string; pt?: string };
  /** True while the pt-BR value is empty: a warning on a Draft, an error once Publish is attempted. */
  ptMissing: boolean;
  area?: boolean;
}

/** One translatable field in both Locales, side by side. */
export function LocalePair({ name, legend, en, pt, errors, ptMissing, area }: LocalePairProps) {
  return (
    <fieldset className="ui-locale-pair ui-form__wide">
      <legend className="ui-locale-pair__legend">{legend}</legend>
      <TextField
        id={`${name}-en`}
        label={<LocaleLabel name="English" code="en" />}
        registration={en}
        error={errors.en}
        lang="en"
        area={area}
      />
      <TextField
        id={`${name}-pt`}
        label={<LocaleLabel name="Portuguese" code="pt-BR" />}
        registration={pt}
        error={errors.pt}
        lang="pt-BR"
        area={area}
        missing={ptMissing ? "Required in pt-BR before this can be Published." : undefined}
      />
    </fieldset>
  );
}

const LocaleLabel = ({ name, code }: { name: string; code: string }) => (
  <>
    {name}{" "}
    <span className="ui-chip" data-variant="outline">
      {code}
    </span>
  </>
);

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface DateFieldProps {
  name: string;
  legend: string;
  month: UseFormRegisterReturn;
  year: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
  children?: ReactNode;
}

/** Month and year of a period; the end date takes a "Present" checkbox as `children`. */
export function DateField({ name, legend, month, year, error, disabled, children }: DateFieldProps) {
  const yearId = `${name}-year`;
  return (
    <fieldset className="ui-date-field">
      <legend className="ui-date-field__legend">{legend}</legend>
      <div className="ui-date-field__inputs">
        <span className="ui-date-field__part">
          <label htmlFor={`${name}-month`}>Month</label>
          <select id={`${name}-month`} className="ui-input ui-date-field__month" disabled={disabled} {...month}>
            {MONTHS.map((label, index) => (
              <option key={label} value={String(index + 1).padStart(2, "0")}>
                {label}
              </option>
            ))}
          </select>
        </span>
        <span className="ui-date-field__part ui-field">
          <label htmlFor={yearId}>Year</label>
          <input
            id={yearId}
            className="ui-input ui-date-field__year"
            inputMode="numeric"
            maxLength={4}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${yearId}-error` : undefined}
            {...year}
          />
          <FieldError id={yearId} message={error} />
        </span>
      </div>
      {children}
    </fieldset>
  );
}
