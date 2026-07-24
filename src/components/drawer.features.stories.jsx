import { useState } from "react";
import { Button, Drawer, FormField, TextInput } from "../index";

export default {
  title: "Components/Drawer/Features",
};

function DrawerDemo(props) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ minHeight: 360, padding: 24 }}>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Edit profile" {...props}>
        <div style={{ display: "grid", gap: 16 }}>
          <FormField label="Company">
            <TextInput defaultValue="Inkwell" />
          </FormField>
          <Button>Save</Button>
        </div>
      </Drawer>
    </div>
  );
}

export const RightSide = {
  render: () => <DrawerDemo side="right" />,
};

export const LeftSide = {
  render: () => <DrawerDemo side="left" />,
};

export const Sizes = {
  render: () => (
    <div style={{ padding: 24, display: "flex", gap: 12 }}>
      <span className="subtle">Use the playground controls to compare sm, md, and lg sizes.</span>
    </div>
  ),
};

export const CustomLayout = {
  name: "Custom header and full-bleed body",
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ minHeight: 360, padding: 24 }}>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          ariaLabel="Preferences"
          bodyPadding="none"
          header={(
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
              <div>
                <strong>Preferences</strong>
                <div className="subtle">Manage your settings</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>Done</Button>
            </div>
          )}
          footer={<div style={{ display: "flex", justifyContent: "flex-end" }}><Button>Save changes</Button></div>}
        >
          <div style={{ padding: 24, display: "grid", gap: 16 }}>
            <FormField label="Display name">
              <TextInput defaultValue="Taylor" />
            </FormField>
            <FormField label="Email address">
              <TextInput defaultValue="taylor@example.com" />
            </FormField>
          </div>
        </Drawer>
      </div>
    );
  },
};
