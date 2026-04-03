import { ELanguage } from "../enums"

export function isSupportedLocale(value: string): value is ELanguage {
  return Object.values(ELanguage).includes(value as ELanguage)
}
