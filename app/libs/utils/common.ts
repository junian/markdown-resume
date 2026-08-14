/// <reference types="user-agent-data-types" />

export const isClient = typeof window !== 'undefined'

export const isMac = isClient
  ? /mac/i.test(navigator.userAgentData?.platform || navigator.platform)
  : false

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const copy = (obj: any) => JSON.parse(JSON.stringify(obj))
