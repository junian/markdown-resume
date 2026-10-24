/// <reference types="user-agent-data-types" />

export const isClient = typeof window !== 'undefined'

export const isMac = isClient
  ? /mac/i.test(navigator.userAgentData?.platform || navigator.platform)
  : false

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const copy = (obj: any) => JSON.parse(JSON.stringify(obj))

/**
 * Convert a storage record keyed by id into a list with the id attached.
 * Shared by resume and image storage list functions.
 */
export const storageToList = <T>(
  storage: Record<string, T>,
): Array<T & { id: string }> =>
  Object.entries(storage).map(([id, item]) => ({ id, ...item }))
