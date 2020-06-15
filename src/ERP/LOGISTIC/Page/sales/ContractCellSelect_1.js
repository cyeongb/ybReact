import React, { useState } from "react";
import {
  List,
  MenuItem,
  Menu,
  ListItemText,
  ListItem,
  InputLabel,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";

export default function ContractCellSelect() {
  console.log("ContractCellSelect()호출");

  const [status, setStatus] = useState("");
  const [params, setParams] = useState("");
  const options = ["일반수주", "긴급수주"];
  // const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClose = () => {
    setParams(null);
  };
  const handleChange = e => {
    console.log("여긴오나>", e.target.value);

    setStatus(e.target.value);
  };
  return (
    <div>
      <InputLabel id="demo-mutiple-name-label">수주유형</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={status}
        onChange={handleChange}
      >
        <MenuItem id="general" value="일반수주">
          일반수주
        </MenuItem>
        <MenuItem id="urgent" value="긴급수주">
          긴급수주
        </MenuItem>
      </Select>
    </div>
  );
}
