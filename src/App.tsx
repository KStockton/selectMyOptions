import { useState } from "react";
import { Select } from "./Select";

const options = [
  {
    label: "Frist",
    value: 1,
  },
  {
    label: "Second",
    value: 2,
  },
  {
    label: "Third",
    value: 3,
  },
  {
    label: "Fourth",
    value: 4,
  },
];

function App() {
  const [value, setValue] = useState<typeof options[0] | undefined>(options[2]);
  return (
    <>
      <Select options={options} value={value} onChange={(o) => setValue(o)} />
    </>
  );
}

export default App;
