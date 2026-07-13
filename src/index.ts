/**
 * Inkwell design system — public entry point.
 *
 * Components render against Inkwell's global stylesheet, so consumers must also
 * import the styles once at their app root:
 *
 *   import "@lagroon/inkwell-design-system/styles.css";
 *   import { Button, TextInput } from "@lagroon/inkwell-design-system";
 */

// Core components
export {
  Panel,
  SectionHeading,
  EmptyState,
  Toast,
  ToastRegion,
} from "./components/ui";
export { Select } from "./components/select";
export type { SelectProps, SelectOption } from "./components/select";
export { PopoverMenu } from "./components/popoverMenu";
export type { PopoverMenuProps, PopoverMenuTriggerProps } from "./components/popoverMenu";
export { Button } from "./components/button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/button";
export { IconButton } from "./components/iconButton";
export type { IconButtonProps, IconButtonSize } from "./components/iconButton";
export { Pill } from "./components/pill";
export type { PillProps, PillTone } from "./components/pill";
export { StatusBanner } from "./components/statusBanner";
export type { StatusBannerProps, StatusBannerTone } from "./components/statusBanner";
export { ModalFrame } from "./components/modalFrame";
export type { ModalFrameProps, ModalSize } from "./components/modalFrame";
export { SplitButton } from "./components/splitButton";

// Form primitives
export { FormField, TextInput, Textarea, Checkbox } from "./components/forms";
export type {
  FormFieldProps,
  TextInputProps,
  TextareaProps,
  CheckboxProps,
} from "./components/forms";

export { Card, CardActions } from "./components/card";
export type { CardProps, CardActionsProps, CardTone, CardVariant } from "./components/card";
export { Badge } from "./components/badge";
export type { BadgeProps, BadgeTone } from "./components/badge";
export { Tabs } from "./components/tabs";
export type { TabsProps, TabItem } from "./components/tabs";
export { Collapsible } from "./components/collapsible";
export type { CollapsibleProps } from "./components/collapsible";
export { Tooltip } from "./components/tooltip";
export type { TooltipProps, TooltipPlacement } from "./components/tooltip";
export { Divider } from "./components/divider";
export type { DividerProps } from "./components/divider";
export { Avatar } from "./components/avatar";
export type { AvatarProps, AvatarSize, AvatarShape } from "./components/avatar";
export { Table } from "./components/table";
export type {
  TableProps,
  TableColumn,
  TableSortDirection,
  TableDensity,
  TableAlign,
} from "./components/table";
export { List } from "./components/list";
export type { ListProps, ListRowProps, ListDensity } from "./components/list";
export { Spinner } from "./components/spinner";
export type { SpinnerProps, SpinnerSize, SpinnerTone } from "./components/spinner";
export { Skeleton } from "./components/skeleton";
export type { SkeletonProps, SkeletonVariant } from "./components/skeleton";
export { Progress } from "./components/progress";
export type { ProgressProps, ProgressTone, ProgressSize } from "./components/progress";

// Layout primitives
export { Stack, Inline, Grid } from "./components/layout";
export type {
  StackProps,
  InlineProps,
  GridProps,
  SpaceScale,
  AlignItems,
  JustifyContent,
} from "./components/layout";

// Icons
export * from "./components/icons";
