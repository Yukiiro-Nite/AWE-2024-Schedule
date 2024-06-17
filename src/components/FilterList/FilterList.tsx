import { useCallback, useEffect, useRef } from "react"

export interface FilterListProps {
  items: string[],
  displayName: string,
  name: string,
  onChange: (selectedItems: string[]) => void
}

export const FilterList = (props: FilterListProps) => {
  const {
    items,
    displayName,
    name,
    onChange
  } = props
  const fieldsetRef = useRef<HTMLFieldSetElement>(null)

  const handleChange = useCallback(() => {
    if (fieldsetRef.current === null) return

    const selectedItems = Array.from(fieldsetRef.current.elements)
      .filter(el => (el as HTMLInputElement).checked)
      .map(el => (el as HTMLInputElement).value)

    onChange(selectedItems)
  }, [onChange])

  useEffect(() => {
    handleChange()
  }, [items, handleChange])

  return (
    <fieldset
      ref={fieldsetRef}
      className="FilterList"
      onChange={handleChange}
    >
      <legend>{displayName}</legend>
      <ul>
        {items.map(item => (
          <li key={item}>
            <label>
              <input type="checkbox" name={name} value={item} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  )
}