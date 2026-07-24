import { FormField, FileUpload } from "./forms";

const SAMPLE_FILE = new File([""], "test.pdf", { type: "application/pdf" });

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
      <FileUpload aria-label="Upload file" label="Choose file" accept=".pdf" invalid validationMessage="File must be a PDF under 5 MB." />
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

function FileItemDemo() {
  return (
    <div style={{ padding: 24, maxWidth: 620 }}>
      <FileUpload
        aria-label="Attachments"
        fileDisplay="item"
        defaultFiles={[SAMPLE_FILE]}
        multiple
        label="Choose files"
      />
    </div>
  );
}

export const StyledFileItems = {
  name: "Styled file items",
  render: () => <FileItemDemo />,
};

export const Dropzone = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 620 }}>
      <FormField label="Attachments" hint="Drag files into the zone or browse from your device.">
        <FileUpload variant="dropzone" fileDisplay="item" multiple label="Add attachments" />
      </FormField>
    </div>
  ),
};
