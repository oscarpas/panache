import { HtmlTags } from './html'
import { CssProperties } from './css'

export interface StyleObject extends CssProperties, HtmlTags {
  [MediaQueryOrSelector: string]: StyleObject | any
}

export type StyleGenerator = (props: React.ComponentProps<any>) => StyleObject

export type StyleList = Array<StyleObject|StyleGenerator>
export type Styles = StyleObject | StyleGenerator | StyleList

type ResponsiveValue = [mediaRule: string, cssValue: string]
type ResponsiveDefaultValue = string
export type ResponsiveVariable = Array<ResponsiveDefaultValue | ResponsiveValue>
