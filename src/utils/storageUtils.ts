const iteneraryKey = "AWE2024_itenerary"
export const getStoredItenerary = (): string[] => {
  const rawItenerary = localStorage.getItem(iteneraryKey)
  if (!rawItenerary) return []

  try {
    const itenerary = JSON.parse(rawItenerary)
    return itenerary
  } catch (error) {
    console.warn('Problem getting itenerary: ', error)
    return []
  }
}
export const setStoredItenerary = (itenerary: string[]) => {
  localStorage.setItem(iteneraryKey, JSON.stringify(itenerary))
}
