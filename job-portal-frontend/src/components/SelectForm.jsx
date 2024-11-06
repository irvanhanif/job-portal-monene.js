import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SelectForm = ({ label, name, placeholder, list }) => {
  return (
    <Select name={name}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {list?.map((item) => (
            <SelectItem
              key={name === "role" ? item : item?.id}
              value={name === "role" ? item : item?.id}>
              {name === "role" ? item : item?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectForm;
