import React, { Component, Children } from "react";
import {
  List,
  MenuItem,
  Menu,
  ListItemText,
  ListItem,
  InputLabel,
} from "@material-ui/core";
import Select from "@material-ui/core/Select";

export default class ContractCellSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status1: "일반수주",
      status2: "긴급수주",
      statusName: "",
    };
  }

 

    handleChange = e => {
      console.log("e.target.value >>", e.target.value);

      this.setState({
        statusName: e.target.value,
      });
      console.log("여기도 일반수주 나오나?>>", this.state.statusName);
    };

    contractSubmit = e => {
      console.log("===============contractSubmit()==================");

      this.props.onSubmit(this.state.statusName);
    };
  

  render() {
    console.log("===== ContractCellSelect 호출 =====");
    console.log("여긴 오나");
    console.log("statusname 좀 나와라 >>> ", this.state.statusName);

    console.log("일반수주?>", this.state.status1); // 일반수주 나옴
    //console.log("type?>>", typeof this.state.status1);

    return (
      <div>
        <form onSubmit={this.contractSubmit}>
          <InputLabel id="demo-mutiple-name-label">수주유형</InputLabel>
          <Select
            /* labelId="demo-simple-select-helper-label" */
            id="demo-simple-select-helper"
            value={this.state.statusName}
            onChange={this.handleChange}
          >
            <MenuItem id="general" value={this.state.status1}>
                          일반수주           
            </MenuItem>
                      
            <MenuItem id="urgent" value={this.state.status2}>
                          긴급수주     
            </MenuItem>
          </Select>
        </form>
      </div>
    );
  }
}

//export default { ContractCellSelect };
