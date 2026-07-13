import { Button, PopoverGeneral, Checkbox } from "../index";

export default {
  title: "Components/Popover",
};

export const Playground = {
  render: () => (
    <div style={{ padding: 80 }}>
      <PopoverGeneral
        trigger={(props) => (
          <Button variant="secondary" {...props}>
            Filters
          </Button>
        )}
      >
        <div style={{ display: "grid", gap: 10 }}>
          <Checkbox label="Remote" />
          <Checkbox label="Recently updated" />
          <Button size="sm">Apply</Button>
        </div>
      </PopoverGeneral>
    </div>
  ),
};
