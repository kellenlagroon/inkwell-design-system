import { useState } from "react";
import { expect } from "storybook/test";
import {
  ActionGroup,
  Button,
  ButtonLink,
  Card,
  CheckboxSelect,
  Container,
  Drawer,
  EmptyState,
  FieldGroup,
  FileUpload,
  FormField,
  Grid,
  Heading,
  Pagination,
  PasswordInput,
  Select,
  Stack,
  StatusBanner,
  Tabs,
  Text,
  TextInput,
  ToastRegion,
} from "../index";

const MOBILE_VIEWPORTS = {
  mobile320: {
    name: "Mobile 320",
    styles: { width: "320px", height: "568px" },
    type: "mobile",
  },
  mobile375: {
    name: "Mobile 375",
    styles: { width: "375px", height: "812px" },
    type: "mobile",
  },
};

const mobileViewport = (value) => ({ viewport: { value, isRotated: false } });

export default {
  title: "Patterns/Mobile readiness",
  parameters: {
    layout: "fullscreen",
    viewport: { options: MOBILE_VIEWPORTS },
  },
};

const longUrl = "https://example.com/organizations/very-long-organization-name/settings/notifications-and-security";

function MobileCanvas({ children }) {
  return <div style={{ width: "100%", minHeight: "100dvh" }}>{children}</div>;
}

function ReadinessContent() {
  const [tab, setTab] = useState("overview");
  const [page, setPage] = useState(4);
  const [select, setSelect] = useState("");
  const [filters, setFilters] = useState([]);
  return (
    <MobileCanvas>
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
              aria-label="Long option"
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
              <Button>Save all changes</Button>
            </ActionGroup>
          </Card>
        </Grid>
      </Container>
    </MobileCanvas>
  );
}

async function exerciseNarrowControls({ canvas, userEvent }) {
  const securityTab = canvas.getByRole("tab", { name: "Security" });
  await userEvent.click(securityTab);
  await expect(securityTab).toHaveAttribute("aria-selected", "true");

  const selectTrigger = canvas.getByRole("button", { name: "Long option" });
  await userEvent.click(selectTrigger);
  await expect(canvas.getByRole("listbox")).toBeVisible();
  await userEvent.keyboard("{Escape}");
  await expect(canvas.queryByRole("listbox")).not.toBeInTheDocument();
  await expect(selectTrigger).toHaveFocus();
}

export const Width320 = {
  globals: mobileViewport("mobile320"),
  render: () => <ReadinessContent />,
  play: exerciseNarrowControls,
};

export const Width375 = {
  globals: mobileViewport("mobile375"),
  render: () => <ReadinessContent />,
  play: exerciseNarrowControls,
};

function DrawerInteractionFixture() {
  const [open, setOpen] = useState(false);
  return (
    <MobileCanvas>
      <Container>
        <Button onClick={() => setOpen(true)}>Open mobile drawer</Button>
      </Container>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Mobile keyboard check"
        footer={<ActionGroup><Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button><Button>Apply</Button></ActionGroup>}
      >
        <FormField label="Filter name"><TextInput /></FormField>
      </Drawer>
    </MobileCanvas>
  );
}

export const DrawerKeyboardBehavior = {
  globals: mobileViewport("mobile375"),
  render: () => <DrawerInteractionFixture />,
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole("button", { name: "Open mobile drawer" });
    await userEvent.click(trigger);
    await expect(canvas.getByRole("dialog", { name: "Mobile keyboard check" })).toBeVisible();
    await userEvent.keyboard("{Escape}");
    await expect(canvas.queryByRole("dialog", { name: "Mobile keyboard check" })).not.toBeInTheDocument();
    await expect(trigger).toHaveFocus();
    await userEvent.click(trigger);
  },
};

export const LoadingAndDisabledActions = {
  globals: mobileViewport("mobile320"),
  render: () => (
    <MobileCanvas>
      <Container>
        <Card>
          <Stack gap="lg">
            <Heading level={1} size="md">Loading and disabled actions</Heading>
            <ActionGroup>
              <Button loading loadingLabel="Saving changes">Save changes</Button>
              <Button variant="secondary" disabled>Unavailable action</Button>
              <ButtonLink href="#mobile-readiness" disabled>Disabled link action</ButtonLink>
            </ActionGroup>
          </Stack>
        </Card>
      </Container>
    </MobileCanvas>
  ),
};

export const EmptyAndErrorStates = {
  globals: mobileViewport("mobile320"),
  render: () => (
    <MobileCanvas>
      <Container>
        <Stack gap="lg">
          <Card>
            <FormField label="Organization name" error="Enter an organization name before continuing." required>
              <TextInput defaultValue="" />
            </FormField>
            <FormField label="Archived workspace name" hint="Archived workspaces cannot be changed.">
              <TextInput disabled value="Workspace unavailable" readOnly />
            </FormField>
            <FormField label="Supporting document" error="This file type is not supported.">
              <FileUpload disabled placeholder="very-long-invalid-filename-with-details.exe" />
            </FormField>
          </Card>
          <EmptyState>
            <Heading level={2} size="md">No matching results</Heading>
            <Text>Try removing a filter or changing the search terms.</Text>
            <Button variant="secondary">Clear all filters</Button>
          </EmptyState>
        </Stack>
      </Container>
    </MobileCanvas>
  ),
};

export const NarrowToast = {
  globals: mobileViewport("mobile320"),
  render: () => (
    <MobileCanvas>
      <ToastRegion toasts={[{ id: "saved", tone: "success", message: "A long notification wraps inside the safe-area-aware region." }]} />
    </MobileCanvas>
  ),
};
