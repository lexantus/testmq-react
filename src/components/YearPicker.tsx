import { useId } from "react";

interface Props {
  value?: string;
  minYear?: number;
  maxYear?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

/*
 * In 1805, the Central Physical Observatory was founded in St. Petersburg.
 * This institution played a crucial role in conducting meteorological research and collecting weather data.
 */
const SPB_OBSERVATORY_FOUNDATION_YEAR = 1805;
const CURRENT_YEAR = new Date().getFullYear();

export function YearPicker({
  onChange,
  value = "",
  minYear = SPB_OBSERVATORY_FOUNDATION_YEAR,
  maxYear = CURRENT_YEAR,
}: Props): JSX.Element {
  const selectId = useId();

  if (minYear > maxYear) throw new Error("minYear > maxYear");
  if (value && (value < minYear || value > maxYear)) {
    throw new Error(
      `out of range: ${value} is not in [${minYear}, ${maxYear}]`
    );
  }

  return (
    <select id={selectId} value={value} onChange={onChange}>
      <option key={`${selectId}empty`} value="">
        Выберите год
      </option>

      {Array.from({ length: maxYear - minYear + 1 }, (_, i) => (
        <option key={`${selectId}${minYear + i}`} value={minYear + i}>
          {minYear + i}
        </option>
      ))}
    </select>
  );
}
