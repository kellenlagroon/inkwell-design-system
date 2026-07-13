import { FormField, FileUpload } from "./forms";

export default {
  title: "Components/FileUpload/Features",
};

export const Default = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 460 }}>
      <FormField label="Resume" hint="PDF or Word document.">
        <FileUpload label="Choose file" accept=".pdf,.doc,.docx" />
      </FormField>
    </div>
  ),
};

export const ErrorState = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 460 }}>
      <FormField label="Resume" error="Upload a PDF under 5 MB.">
        <FileUpload label="Replace file" accept=".pdf" validationMessage="Current file is too large." />
      </FormField>
    </div>
  ),
};

export const Disabled = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 460 }}>
      <FormField label="Resume">
        <FileUpload label="Choose file" disabled />
      </FormField>
    </div>
  ),
};

