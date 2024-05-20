import { Select, SelectItem } from "@nextui-org/react"

export default function SelectedOption({ label, data, selectChange, formData }) {
  return (
    <Select
      label={
        label
      }
      onChange={(e) => {
        selectChange(e.target.value);
      }}
      className="max-w-[170px]"
      selectedKeys={[formData]}
    >
      {
        data.map((data) => {
          return (
            <SelectItem key={data.label} value={data.value}>{data.label}</SelectItem>
          )
        })
      }
    </Select>
  )
}

