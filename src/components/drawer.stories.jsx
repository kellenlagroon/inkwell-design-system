import { useState } from "react";
import { Button, Drawer, FormField, TextInput } from "../index";

export default {
  title: "Components/Drawer",
};

export const Playground = {
  args: {
    side: "right",
    size: "md",
  },
  argTypes: {
    side: { control: "inline-radio", options: ["left", "right"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  render: ({ side, size }) => {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ padding: 24 }}>
        <Button onClick={() => setOpen(true)}>Open drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Edit profile" side={side} size={size}>
          <div style={{ display: "grid", gap: 16 }}>
            <FormField label="Company">
              <TextInput placeholder="Acme" />
            </FormField>
            <Button>Save</Button>
          </div>
        </Drawer>
      </div>
    );
  },
};
