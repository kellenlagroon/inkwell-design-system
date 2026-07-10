import { createContext, useContext, useId } from "react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

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

interface FieldContextValue {
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
            {required ? <span className="field-required" aria-hidden="true"> *</span> : null}
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

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Force the invalid state when used outside a `FormField`. */
  invalid?: boolean;
  /** Explicit `aria-describedby`. Falls back to the FormField value. */
  describedBy?: string;
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
  className = "",
  ...props
}: TextInputProps) {
  const field = useContext(FieldContext);
  const resolvedInvalid = invalid || field?.invalid || false;
  const classes = ["input", resolvedInvalid ? "input--invalid" : "", className].filter(Boolean).join(" ");

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
