import { useState, useEffect } from "react";
import { YearPicker } from "./YearPicker";

interface Props {
  startYear: string;
  endYear: string;
  onChange: (event: { start: string; end: string }) => void;
}

export function YearInterval({
  startYear,
  endYear,
  onChange,
}: Props): JSX.Element {
  const [start, setStart] = useState<string>(startYear);
  const [end, setEnd] = useState<string>(endYear);

  useEffect(() => {
    if (start > end) {
      setEnd(start);
    }
    onChange({ start, end });
  }, [start, end]);

  return (
    <fieldset>
      <legend>за период</legend>
      <YearPicker
        value={start}
        onChange={(event) => setStart(event.target.value)}
      />
      <YearPicker
        value={end}
        onChange={(event) => setEnd(event.target.value)}
      />
    </fieldset>
  );
}
