import { createContext, useContext, useId, useRef, useState } from "react";
import type { ChangeEvent, DragEvent, HTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import { IconEye, IconFile, IconTrash } from "./icons";

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
  const classes = ["checkbox", invalid ? "checkbox--invalid" : "", props.disabled ? "checkbox--disabled" : "", className].filter(Boolean).join(" ");

  return (
    <label className={classes} htmlFor={resolvedId}>
      <input
        id={resolvedId}
        type="checkbox"
        className="checkbox-input"
        aria-invalid={invalid || undefined}
        {...props}
      />
      <span className="checkbox-control" aria-hidden="true">
        <svg viewBox="0 0 12 10" fill="none">
          <path d="m1 5 3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
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
  /** Stack trigger and filename. `mobile` stacks only on narrow viewports. */
  layout?: "inline" | "stacked" | "mobile";
  /** Render a bordered drag-and-drop target instead of a trigger button. */
  variant?: "trigger" | "dropzone";
  /** Show selected files as inline text or styled file rows. */
  fileDisplay?: "inline" | "item";
  /** Files shown on first render, useful for preselected or existing attachments. */
  defaultFiles?: File[];
  /** Show remove controls for selected files. */
  clearable?: boolean;
  /** Called whenever files are selected, removed, or cleared. */
  onFilesChange?: (files: File[]) => void;
  /** Called after all selected files are cleared. */
  onClear?: () => void;
}

/** Native file input with trigger, dropzone, and selected-file display options. */
export function FileUpload({
  id,
  label = "Choose file",
  placeholder = "No file selected",
  validationMessage,
  invalid = false,
  describedBy,
  layout = "mobile",
  variant = "trigger",
  fileDisplay = "inline",
  defaultFiles = [],
  clearable = true,
  className = "",
  onChange,
  onFilesChange,
  onClear,
  ...props
}: FileUploadProps) {
  const field = useFieldContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>(defaultFiles);
  const [isDragging, setIsDragging] = useState(false);
  const resolvedInvalid = invalid || field?.invalid || false;
  const resolvedId = id ?? field?.id;

  function setSelectedFiles(nextFiles: File[]) {
    setFiles(nextFiles);
    onFilesChange?.(nextFiles);
  }

  function syncInputFiles(nextFiles: File[]) {
    const input = inputRef.current;
    if (!input) return;
    if (nextFiles.length === 0) {
      input.value = "";
      return;
    }
    if (typeof DataTransfer === "undefined") return;
    const transfer = new DataTransfer();
    nextFiles.forEach((file) => transfer.items.add(file));
    input.files = transfer.files;
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedFiles(Array.from(event.target.files ?? []));
    onChange?.(event);
  }

  function removeFile(index: number) {
    const nextFiles = files.filter((_, fileIndex) => fileIndex !== index);
    syncInputFiles(nextFiles);
    setSelectedFiles(nextFiles);
    if (nextFiles.length === 0) onClear?.();
  }

  function clearFiles() {
    syncInputFiles([]);
    setSelectedFiles([]);
    onClear?.();
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    if (props.disabled) return;
    setIsDragging(false);
    const droppedFiles = Array.from(event.dataTransfer.files);
    setSelectedFiles(props.multiple ? droppedFiles : droppedFiles.slice(0, 1));
  }

  const filename = files.map((file) => file.name).join(", ");

  return (
    <div className={["file-upload", `file-upload--${layout}`, resolvedInvalid ? "file-upload--invalid" : "", className].filter(Boolean).join(" ")}>
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
      {variant === "dropzone" ? (
        <div
          className={["file-upload-dropzone", isDragging ? "file-upload-dropzone--dragging" : "", props.disabled ? "file-upload-dropzone--disabled" : ""].filter(Boolean).join(" ")}
          role="button"
          tabIndex={props.disabled ? -1 : 0}
          aria-label={typeof label === "string" ? label : "Choose files"}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragEnter={(event) => {
            event.preventDefault();
            if (!props.disabled) setIsDragging(true);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <IconFile className="file-upload-dropzone-icon" />
          <span className="file-upload-dropzone-label">{label}</span>
          <span className="file-upload-dropzone-hint">Drag and drop, or click to browse</span>
        </div>
      ) : (
        <div className="file-upload-row">
          <button type="button" className="secondary-button" onClick={() => inputRef.current?.click()} disabled={props.disabled}>
            {label}
          </button>
          {fileDisplay === "inline" ? (
            <span className={["file-upload-name", filename ? "" : "file-upload-name--empty"].filter(Boolean).join(" ")}>
              {filename || placeholder}
            </span>
          ) : null}
          {fileDisplay === "inline" && clearable && files.length > 0 ? (
            <button type="button" className="file-upload-clear" onClick={clearFiles} disabled={props.disabled}>Clear</button>
          ) : null}
        </div>
      )}
      {fileDisplay === "item" && files.length > 0 ? (
        <div className="file-upload-list" aria-label="Selected files">
          {files.map((file, index) => (
            <div className="file-upload-item" key={`${file.name}-${file.lastModified}-${index}`}>
              <IconFile className="file-upload-item-icon" />
              <span className="file-upload-item-name">{file.name}</span>
              {clearable ? (
                <button type="button" className="file-upload-remove" onClick={() => removeFile(index)} disabled={props.disabled} aria-label={`Remove ${file.name}`}>
                  <IconTrash />
                </button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
      {validationMessage ? <div className="file-upload-validation">{validationMessage}</div> : null}
    </div>
  );
}

export interface FieldGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Number of columns before responsive collapse. */
  columns?: 2 | 3 | 4;
  /** Breakpoint below which fields collapse to one column. */
  collapseBelow?: "sm" | "md" | "never";
  children?: ReactNode;
}

/** Responsive grouping for related fields and aligned form actions. */
export function FieldGroup({ columns = 2, collapseBelow = "md", className = "", children, ...props }: FieldGroupProps) {
  return (
    <div className={["field-group", `field-group--${columns}`, collapseBelow !== "never" ? `field-group--collapse-${collapseBelow}` : "", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
