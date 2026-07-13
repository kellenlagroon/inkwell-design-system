import { createContext, useContext, useId, useRef, useState } from "react";
import type { ChangeEvent, HTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { IconEye } from "./icons";

/**
 * Form primitives for Inkwell.
 *
 * Each control wraps a native element — which already carries Inkwell's field
 * styling via global CSS — with a typed API. `FormField` is the shared wrapper
 * that owns the control's `id` and forwards the accessibility wiring
 * (`aria-describedby`, `aria-invalid`, `required`) to whichever control it wraps.
 *
 * A control placed inside a `FormField` inherits that wiring automatically; the
 * same control used standalone still works with explicit props.
 */

export interface FieldContextValue {
  /** Control id, shared with the label's `htmlFor`. */
  id: string;
  /** Space-joined ids of hint/error text, for `aria-describedby`. */
  describedBy?: string;
  /** Whether the field is in an error state. */
  invalid: boolean;
  /** Whether the field is required. */
  required?: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

export function useFieldContext() {
  return useContext(FieldContext);
}

export interface FormFieldProps {
  /** Visible label text. */
  label?: ReactNode;
  /** Helper text shown below the control. */
  hint?: ReactNode;
  /** Error text; sets the field invalid and replaces the hint. */
  error?: ReactNode;
  /** Explicit control id. Auto-generated when omitted. */
  htmlFor?: string;
  /** Marks the field required (visual marker + inherited by the control). */
  required?: boolean;
  /** Extra class names on the field wrapper. */
  className?: string;
  /** The control (TextInput, Textarea, Select, …). */
  children: ReactNode;
}

/**
 * Labelled field wrapper. Owns the control's id and forwards hint/error wiring
 * to whichever Inkwell control it wraps.
 */
export function FormField({
  label,
  hint,
  error,
  htmlFor,
  required = false,
  className = "",
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const id = htmlFor ?? generatedId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  const invalid = Boolean(error);

  const classes = ["field", invalid ? "field--invalid" : "", className].filter(Boolean).join(" ");

  return (
    <FieldContext.Provider value={{ id, describedBy, invalid, required }}>
      <div className={classes}>
        {label ? (
          <label className="field-label" htmlFor={id}>
            {label}
            {required ? <span className="field-required" aria-hidden="true">*</span> : null}
          </label>
        ) : null}
        {children}
        {hint && !error ? (
          <p className="field-hint" id={hintId}>{hint}</p>
        ) : null}
        {error ? (
          <p className="field-error" id={errorId} role="alert">{error}</p>
        ) : null}
      </div>
    </FieldContext.Provider>
  );
}

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Force the invalid state when used outside a `FormField`. */
  invalid?: boolean;
  /** Explicit `aria-describedby`. Falls back to the FormField value. */
  describedBy?: string;
  /** Control height/density. `md` is the default and adds no modifier. */
  size?: "sm" | "md" | "lg";
}

/**
 * Single-line text input. Inherits field wiring when rendered inside a
 * `FormField`; all native input props pass through.
 */
export function TextInput({
  id,
  type = "text",
  invalid = false,
  describedBy,
  size = "md",
  className = "",
  ...props
}: TextInputProps) {
  const field = useContext(FieldContext);
  const resolvedInvalid = invalid || field?.invalid || false;
  const classes = [
    "input",
    size !== "md" ? `input--${size}` : "",
    resolvedInvalid ? "input--invalid" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <input
      id={id ?? field?.id}
      type={type}
      className={classes}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy ?? field?.describedBy}
      required={field?.required}
      {...props}
    />
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Force the invalid state when used outside a `FormField`. */
  invalid?: boolean;
  /** Explicit `aria-describedby`. Falls back to the FormField value. */
  describedBy?: string;
}

/**
 * Multi-line text input. Same field-wiring behaviour as {@link TextInput}.
 */
export function Textarea({
  id,
  rows = 4,
  invalid = false,
  describedBy,
  className = "",
  ...props
}: TextareaProps) {
  const field = useContext(FieldContext);
  const resolvedInvalid = invalid || field?.invalid || false;
  const classes = ["textarea", resolvedInvalid ? "input--invalid" : "", className].filter(Boolean).join(" ");

  return (
    <textarea
      id={id ?? field?.id}
      rows={rows}
      className={classes}
      aria-invalid={resolvedInvalid || undefined}
      aria-describedby={describedBy ?? field?.describedBy}
      required={field?.required}
      {...props}
    />
  );
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  /** Inline label text. */
  label?: ReactNode;
  /** Force the invalid state. */
  invalid?: boolean;
}

/**
 * Checkbox with an inline label. Unlike {@link TextInput}, the checkbox owns its
 * own label rather than pairing with a stacked `FormField` label, so it stays
 * self-contained.
 */
export function Checkbox({ id, label, invalid = false, className = "", ...props }: CheckboxProps) {
  const generatedId = useId();
  const resolvedId = id ?? generatedId;
  const classes = ["checkbox", props.disabled ? "checkbox--disabled" : "", className].filter(Boolean).join(" ");

  return (
    <label className={classes} htmlFor={resolvedId}>
      <input
        id={resolvedId}
        type="checkbox"
        className="checkbox-input"
        aria-invalid={invalid || undefined}
        {...props}
      />
      {label ? <span className="checkbox-label">{label}</span> : null}
    </label>
  );
}

export type PasswordInputProps = Omit<TextInputProps, "type"> & {
  /** Accessible label for the reveal control. */
  revealLabel?: string;
  /** Accessible label when hiding the password again. */
  hideLabel?: string;
};

/** Password input with a visibility toggle and FormField wiring. */
export function PasswordInput({
  revealLabel = "Show password",
  hideLabel = "Hide password",
  autoComplete = "current-password",
  className = "",
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password-input">
      <TextInput
        {...props}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        className={["password-input-control", className].filter(Boolean).join(" ")}
      />
      <button
        type="button"
        className="password-input-toggle"
        aria-label={visible ? hideLabel : revealLabel}
        aria-pressed={visible}
        onClick={() => setVisible((value) => !value)}
      >
        <IconEye />
      </button>
    </div>
  );
}

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "placeholder"> {
  /** Visible trigger label. */
  label?: ReactNode;
  /** Placeholder shown before a file is selected. */
  placeholder?: ReactNode;
  /** Optional validation or helper slot rendered below the trigger row. */
  validationMessage?: ReactNode;
  /** Force the invalid state when used outside a FormField. */
  invalid?: boolean;
  /** Explicit aria-describedby. Falls back to FormField value. */
  describedBy?: string;
}

/** Hidden native file input with an Inkwell-styled trigger and filename display. */
export function FileUpload({
  id,
  label = "Choose file",
  placeholder = "No file selected",
  validationMessage,
  invalid = false,
  describedBy,
  className = "",
  onChange,
  ...props
}: FileUploadProps) {
  const field = useFieldContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState<string>("");
  const resolvedInvalid = invalid || field?.invalid || false;
  const resolvedId = id ?? field?.id;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setFilename(event.target.files?.[0]?.name ?? "");
    onChange?.(event);
  }

  return (
    <div className={["file-upload", resolvedInvalid ? "file-upload--invalid" : "", className].filter(Boolean).join(" ")}>
      <input
        {...props}
        ref={inputRef}
        id={resolvedId}
        type="file"
        className="file-upload-input"
        aria-invalid={resolvedInvalid || undefined}
        aria-describedby={describedBy ?? field?.describedBy}
        required={field?.required}
        onChange={handleChange}
      />
      <div className="file-upload-row">
        <button type="button" className="secondary-button button--sm" onClick={() => inputRef.current?.click()} disabled={props.disabled}>
          {label}
        </button>
        <span className={["file-upload-name", filename ? "" : "file-upload-name--empty"].filter(Boolean).join(" ")}>
          {filename || placeholder}
        </span>
      </div>
      {validationMessage ? <div className="file-upload-validation">{validationMessage}</div> : null}
    </div>
  );
}

export interface FieldGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns before responsive collapse. */
  columns?: 2 | 3 | 4;
  children?: ReactNode;
}

/** Responsive grouping for related fields and aligned form actions. */
export function FieldGroup({ columns = 2, className = "", children, ...props }: FieldGroupProps) {
  return (
    <div className={["field-group", `field-group--${columns}`, className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
