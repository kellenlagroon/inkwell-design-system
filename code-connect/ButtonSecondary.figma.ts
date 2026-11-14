// url=https://www.figma.com/design/TeLw1zTEVZIqCPR1AjuVPp/Inkwell-Design-System?node-id=7-84
// source=src/components/button.tsx
// component=Button
import figma from 'figma'

const instance = figma.selectedInstance
const label = instance.getString('Label')
const size = instance.getEnum('Size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' })
const disabled = instance.getEnum('State', {
  Default: false,
  Hover: false,
  Focused: false,
  Disabled: true,
})

export default {
  example: figma.code`<Button variant="secondary" size="${size}"${disabled ? " disabled" : ""}>${label}</Button>`,
  imports: ['import { Button } from "@lagroon/inkwell-design-system"'],
  id: 'inkwell-button-secondary',
}
