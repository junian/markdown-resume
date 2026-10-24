import type { ResumeStorageItem, ResumeStyles } from '~/types'

/**
 * Small declarative schema for validating resume data imported from
 * a local .json file. Each entry lists the fields that must be present
 * with the given type.
 */

const RESUME_STRING_FIELDS = ['name', 'markdown', 'css'] as const
const STYLE_STRING_FIELDS = ['paper', 'themeColor'] as const
const STYLE_NUMBER_FIELDS = ['fontSize', 'lineHeight', 'marginH', 'marginV', 'paragraphSpace'] as const

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const hasFields = (
  obj: Record<string, unknown>,
  fields: readonly string[],
  type: 'string' | 'number',
) => fields.every(field => typeof obj[field] === type)

const isFont = (value: unknown) =>
  isRecord(value) && typeof value.name === 'string'

export const isResumeStyles = (value: unknown): value is ResumeStyles =>
  isRecord(value)
  && hasFields(value, STYLE_STRING_FIELDS, 'string')
  && hasFields(value, STYLE_NUMBER_FIELDS, 'number')
  && isFont(value.fontCJK)
  && isFont(value.fontEN)

export const isValidResume = (value: unknown): value is ResumeStorageItem =>
  isRecord(value)
  && hasFields(value, RESUME_STRING_FIELDS, 'string')
  && (typeof value.update === 'string' || value.update === undefined)
  && isResumeStyles(value.styles)
