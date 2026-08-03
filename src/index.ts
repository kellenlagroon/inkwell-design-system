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
export type {
  PanelProps,
  SectionHeadingProps,
  EmptyStateProps,
  ToastProps,
  ToastTone,
  ToastItem,
  ToastRegionProps,
} from "./components/ui";
export { Select } from "./components/select";
export type { SelectProps, SelectOption } from "./components/select";
export { Button, ButtonLink, TextButton } from "./components/button";
export type { ButtonProps, ButtonLinkProps, TextButtonProps, ButtonVariant, ButtonSize, ButtonSpinnerPlacement } from "./components/button";
export { IconButton } from "./components/iconButton";
export type { IconButtonProps, IconButtonSize } from "./components/iconButton";
export { Pill } from "./components/pill";
export type { PillProps, PillTone, PillAppearance, PillColors } from "./components/pill";
export { StatusBanner } from "./components/statusBanner";
export type { StatusBannerProps, StatusBannerTone } from "./components/statusBanner";
export { ModalFrame } from "./components/modalFrame";
export type { ModalFrameProps, ModalSize } from "./components/modalFrame";
export { Drawer } from "./components/drawer";
export type { DrawerProps, DrawerSide, DrawerSize, DrawerBodyPadding } from "./components/drawer";
export { Popover, PopoverMenuItem } from "./components/popover";
export type { PopoverProps, PopoverTriggerProps, PopoverMode, PopoverOverflow, PopoverPlacement, PopoverMenuItemProps } from "./components/popover";
export { CheckboxSelect } from "./components/checkboxSelect";
export type { CheckboxSelectProps, CheckboxSelectOption } from "./components/checkboxSelect";
export { SplitButton } from "./components/splitButton";
export type { SplitButtonProps, SplitButtonItem } from "./components/splitButton";
export { Nav } from "./components/nav";
export type { NavProps, NavItem, NavOrientation, NavStyle, NavVariant } from "./components/nav";
export { Sidebar } from "./components/sidebar";
export type { SidebarProps, SidebarSize, SidebarSide } from "./components/sidebar";

// Form primitives
export { FormField, TextInput, Textarea, Checkbox, PasswordInput, FileUpload, FieldGroup } from "./components/forms";
export type {
  FormFieldProps,
  TextInputProps,
  TextareaProps,
  CheckboxProps,
  PasswordInputProps,
  FileUploadProps,
  FieldGroupProps,
} from "./components/forms";

export { Card, CardActions } from "./components/card";
export type { CardProps, CardActionsProps, CardTone, CardVariant, CardPadding } from "./components/card";
export { Badge } from "./components/badge";
export type { BadgeProps, BadgeTone } from "./components/badge";
export { Tabs } from "./components/tabs";
export type { TabsProps, TabItem, TabsStyle } from "./components/tabs";
export { Collapsible } from "./components/collapsible";
export type { CollapsibleProps, CollapsibleStyle } from "./components/collapsible";
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
  TableStyle,
} from "./components/table";
export { List } from "./components/list";
export type { ListProps, ListRowProps, ListDensity, ListStyle } from "./components/list";
export { Spinner } from "./components/spinner";
export type { SpinnerProps, SpinnerSize, SpinnerTone } from "./components/spinner";
export { Skeleton } from "./components/skeleton";
export type { SkeletonProps, SkeletonVariant } from "./components/skeleton";
export { Progress } from "./components/progress";
export type { ProgressProps, ProgressTone, ProgressSize } from "./components/progress";
export { Text, Heading, Link } from "./components/text";
export type { TextProps, HeadingProps, LinkProps, TextTone, TextSize, HeadingLevel, HeadingSize } from "./components/text";
export { Container, Center, Surface, Paper } from "./components/surface";
export type { ContainerProps, CenterProps, SurfaceProps, ContainerSize, SurfaceTone, ResponsivePadding } from "./components/surface";
export { Pagination } from "./components/pagination";
export type { PaginationProps } from "./components/pagination";
export { RichTextSafe } from "./components/richTextSafe";
export type { RichTextSafeProps } from "./components/richTextSafe";
export { StatusSummaryCompact } from "./components/statusSummaryCompact";
export type { StatusSummaryCompactProps } from "./components/statusSummaryCompact";

// Layout primitives
export { Stack, Inline, Grid, ActionGroup } from "./components/layout";
export type {
  StackProps,
  InlineProps,
  GridProps,
  ActionGroupProps,
  ActionGroupAlign,
  ResponsiveColumns,
  SpaceScale,
  AlignItems,
  JustifyContent,
} from "./components/layout";

// Icons
export * from "./components/icons";
