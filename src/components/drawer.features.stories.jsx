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
      <Drawer open={open} onClose={() => setOpen(false)} title="Application" {...props}>
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

