import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller } from "react-hook-form";

export default function FormInputDropdown ({control,options,label,name,rules,def}) {
  const generateSingleOptions = () => {
    return options.map(({value,label}) => {
      return (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl size={"small"}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select onChange={onChange} value={value ?? options[0].value}>
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
        defaultValue={def}
        rules={rules}
      />
    </FormControl>
  );
};