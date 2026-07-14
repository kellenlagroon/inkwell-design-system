import { useState } from "react";
import {
  ActionGroup,
  Button,
  Card,
  CheckboxSelect,
  Container,
  Drawer,
  FieldGroup,
  FileUpload,
  FormField,
  Grid,
  Heading,
  Pagination,
  PasswordInput,
  Select,
  StatusBanner,
  Tabs,
  Text,
  TextInput,
  ToastRegion,
} from "../index";

export default {
  title: "Patterns/Mobile readiness",
  parameters: { layout: "fullscreen" },
};

const longUrl = "https://example.com/organizations/very-long-organization-name/settings/notifications-and-security";

function MobileFixture({ width, children }) {
  return <div style={{ width, maxWidth: "100%", minHeight: "100vh", margin: "0 auto", borderInline: "1px solid var(--line-soft)" }}>{children}</div>;
}

function ReadinessContent({ width }) {
  const [tab, setTab] = useState("overview");
  const [page, setPage] = useState(4);
  const [select, setSelect] = useState("");
  const [filters, setFilters] = useState([]);
  return (
    <MobileFixture width={width}>
      <Container>
        <Grid columns={{ base: 1, md: 2, lg: 3 }} gap="lg">
          <Card>
            <Heading level={1} size="lg">Narrow production interface</Heading>
            <Text>Long content wraps safely: {longUrl}</Text>
            <StatusBanner tone="warning" message="A deliberately long status message remains readable without colliding with its dismiss action." onDismiss={() => {}} />
          </Card>
          <Card>
            <FieldGroup columns={2}>
              <FormField label="A very long account email label" hint="Hints and errors wrap at 320px and remain associated.">
                <TextInput defaultValue="person-with-a-long-name@example.com" />
              </FormField>
              <FormField label="Password" error="Use at least twelve characters, including a symbol.">
                <PasswordInput defaultValue="password" />
              </FormField>
            </FieldGroup>
            <FormField label="Resume or supporting document">
              <FileUpload placeholder="No file selected; very-long-filenames-are-truncated-safely.pdf" />
            </FormField>
            <Select
              value={select}
              onChange={setSelect}
              placeholder="Choose a long option"
              options={[{ value: "one", label: "A long option label that wraps without overflowing" }, { value: "disabled", label: "Disabled option", disabled: true }]}
            />
          </Card>
          <Card>
            <Tabs
              value={tab}
              onChange={setTab}
              aria-label="Account sections"
              tabs={["overview", "activity", "notifications", "permissions", "security"].map((value) => ({ value, label: value[0].toUpperCase() + value.slice(1) }))}
            />
            <CheckboxSelect
              searchable
              label="Programs"
              value={filters}
              onChange={setFilters}
              options={Array.from({ length: 8 }, (_, index) => ({ value: String(index), label: `Long filter option ${index + 1}` }))}
            />
            <Pagination page={page} pageCount={18} onPageChange={setPage} />
            <ActionGroup>
              <Button variant="secondary">Cancel this operation</Button>
              <Button loading={false}>Save all changes</Button>
            </ActionGroup>
          </Card>
        </Grid>
      </Container>
    </MobileFixture>
  );
}

export const Width320 = { render: () => <ReadinessContent width={320} /> };
export const Width375 = { render: () => <ReadinessContent width={375} /> };

export const MobileDrawerSheet = {
  render: () => (
    <MobileFixture width={375}>
      <Drawer
        open
        onClose={() => {}}
        title="Filters and display options"
        maxHeight="85dvh"
        footer={<ActionGroup><Button variant="secondary">Clear</Button><Button>Apply filters</Button></ActionGroup>}
      >
        <Text>{Array.from({ length: 18 }, () => "Scrollable drawer content. ").join("")}</Text>
      </Drawer>
    </MobileFixture>
  ),
};

export const NarrowToast = {
  render: () => (
    <MobileFixture width={320}>
      <ToastRegion toasts={[{ id: "saved", tone: "success", message: "A long notification wraps inside the safe-area-aware region." }]} />
    </MobileFixture>
  ),
};
