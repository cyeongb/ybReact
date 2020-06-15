import React, { useState, useEffect, Component } from "react";
import {
  Button,
  TextField,
  makeStyles,
  Typography,
  Select,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";
import { useDispatch } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
//import {ContractCellSelect} from "./ContractCellSelect";

//------------------------- 스타일 ---------------------
const labelStyle = {
  color: "gray",
  padding: 2,
};

const estimateSearchStyle = {
  fontSize: "1.3rem",
  backgroundColor: "rosybrown",
  color: "white",
  fontWeight: "bold",
  outline: "none",
  borderRadius: "4px",
  cursor: "pointer",
  border: "none",
  width: "20%",
  height: "20%",
  padding: 1,
};

const hrStyle = {
  opacity: "0.4",
};

const contractRegistStyle = {
  color: "white",
  fontWeight: "600",
  fontSize: "1.3rem",
  backgroundColor: "rosybrown",
  padding: 1.4,
  float: "right",
};

const estimateDetailStyle = {
  color: "dimGray",
  fontWeight: "600",
  fontSize: "1.3rem",
};
const gridFrameStyle = {
  height: "300px",
  width: "90%",
  backgroundColor: "gainsboro",
};

//====================================================================//

// ------------------수주 가능한 견적 조회 그리드 헤더----------------------

//==============================================================//

// --------------------------------- 견적상세------------------------------------
// 견적 상세는 '수주가능견적조회' 버튼을 클릭했을 때, 나오는 데이터의 '견적일련번호'를 클릭하면 해당 번호의 견적상세 데이터가 하단에 나온다 !
//
const estimateDetail = [
  { headerName: "견적상세일련번호", field: "estimateDetailNo", width: 170 },
  { headerName: "견적일련번호", field: "estimateNo", width: 170 },
  {
    headerName: "품목코드",
    field: "itemCode",
    width: 170,
  },

  { headerName: "품목명", field: "itemName", width: 170 },
  { headerName: "단위", field: "unitOfContract", width: 170 },
  {
    headerName: "납기일",
    field: "dueDateOfContrct",
    width: 170,
  },
  {
    headerName: "견적수량",
    field: "estimateAmount",
    width: 170,
  },
  {
    headerName: "견적단가",
    field: "unitPriceOfEstimate",
    width: 170,
  },
  { headerName: "합계액", field: "sumPriceOfEstimate", width: 150 },

  { headerName: "비고", field: "description", width: 150, editable: true },
];

//=============================================================================//

//-----------------------const 선언 ----------------------------------
const theme = "ag-theme-balham";
const single = "single"; // row-selection이 single
// onload 와 같은 기능 그리드가 뜰때 실행되는 이벤트..

//====================================================================//

export default class ContractRegister extends Component {
  constructor(props) {
    super(props);

    //----------------------- state 초깃값 -------------

    this.state = {
      startdate: "",
      endDate: "",
      estimateGridApi: [],
      rowData: [],
      // contractStatus: ["일반수주", "긴급수주"],
      contractType: "",
      status1: "일반수주",
      status2: "긴급수주",
      statusName: "",
      //   value: this.props,
    };

    //=================================================//
  }

  headerName = [
    {
      headerName: "",
      checkboxSelection: true,
      width: 50,
      headerCheckboxSelection: true,
    },
    {
      headerName: "견적일련번호",
      field: "estimateNo",
      width: 150,
    },

    {
      headerName: "수주유형코드",
      field: "contractStatus",
      width: 150,
      editable: true,
      cellEditor: "ContractCellSelect",
      valueSetter: params => {
        console.log("setter  - params>>", params.data);
      },

      valueGetter: params => {
        console.log("valuegetter");
        console.log("valueGetter params>", JSON.stringify(params.data));

        return this.state.statusName;
      },
    },

    {
      headerName: "견적유효일자",
      field: "effectiveDate",
      width: 150,
    },
    {
      headerName: "견적일자",
      field: "estimateDate",
      width: 150,
    },
    { headerName: "거래처명", field: "customerCode", width: 150 },

    {
      headerName: "견적요청자",
      field: "estimateRequester",
      width: 150,
      editable: true,
    },
    {
      headerName: "담당자코드",
      field: "personCodeInCharge",
      width: 150,
      editable: true,
    },

    { headerName: "비고", field: "description", width: 150, editable: true },
  ];

  statusChange = e => {
    this.setState({
      statusName: e.target.value,
    });

    //  console.log("statusChange - e.target.value>>", e.target.value);
    console.log(
      " statusChange - this.state.statusName>",
      this.state.statusName,
    );
    return this.state.statusName;
  };

  contractCellSelect = () => (
    <div>
      <InputLabel id="demo-mutiple-name-label">수주유형</InputLabel>
      <Select
        /* labelId="demo-simple-select-helper-label" */
        id="demo-simple-select-helper"
        onChange={this.statusChange}
      >
        <MenuItem id="general" value={this.state.statusName}>
                      일반수주           
        </MenuItem>
                  
        <MenuItem id="urgent" value={this.state.statusName}>
                      긴급수주     
        </MenuItem>
      </Select>
    </div>
  );
  //----------- life cycle method ---------------
  // componentDidUpdate : useEffect 와 같은 기능.
  // 메서드는 렌더링 후에 실행이 되는데 값을 렌더링 하기 전의 값(snapshot)을 가져올 수 있다.
  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps >',prevProps);
    // console.log('prevState > ',prevState);
  }
  //==============================================//

  // componentDidMount: 렌더링 된 후
  componentDidMount() {
    //-----------------------axios 사용해서 서버에 값 보내는 기능------------------------
    console.log("렌더링 됨");
    this.searchEstimate = () => {
      let startd = this.state.startdate;
      let endd = this.state.enddate;

      console.log("===== 수주 가능한 견적 검색 =====");
      console.log("날짜 : ", startd, "~", endd);

      if (startd && endd) {
        console.log("시작날짜 + 종료날짜 값 다 있다 ");

        let url =
          "http://localhost:8282/logi/logistics/sales/searchEstimateInContractAvailable?startDate=" +
          startd +
          "&endDate=" +
          endd;
        axios
          .get(url)
          .then(response => {
            console.log(
              "axios 로 전달한 response >> ",
              response.data.gridRowJson,
            );

            this.setState({
              rowData: response.data.gridRowJson,
            });
          })
          .catch(err => console.log("수주가능한 견적 가져오다가 에러"));
      } else {
        alert("날짜를 입력 해 주세요");
        return;
      }
    };

    /*  this.contractSubmit = e => {
      console.log("===============contractSubmit()==================");
      
      this.props.onSubmit(this.state.statusName);
    }; */

    //=================================================================================//
  }

  //componentWillUnmount :render 종료
  componentWillUnmount() {
    console.log("렌더링 종료");
  }

  componentDidCatch(error, info) {
    console.log("error남 >>", error);
    console.log("에러난 정보 info >>", info);
  }

  // ------------------상태값 변경 setState()----------------

  startDateChange = e => {
    this.setState({
      startdate: e.target.value,
    });
  };

  endDateChange = e => {
    this.setState({
      enddate: e.target.value,
    });
  };
  gridReady = params => {
    this.setState({
      estimateGridApi: params.api,
    });
  };

  //======================================================//

  render() {
    return (
      <>
        <br />
        <div>
          <Typography className="startDay" style={labelStyle}>
            시작일
          </Typography>
          <TextField
            id={"startDate"}
            type={"date"}
            value={this.state.startdate}
            onChange={this.startDateChange}
          ></TextField>
          &nbsp;
          <Typography className="endDay" style={labelStyle}>
            종료일
          </Typography>
          <TextField
            id={"endDate"}
            type={"date"}
            value={this.state.enddate}
            onChange={this.endDateChange}
          ></TextField>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            className="estimateSearch"
            style={estimateSearchStyle}
            onClick={this.searchEstimate}
          >
            수주 가능 견적 조회
          </Button>
          <Button
            className="registContract"
            style={contractRegistStyle} /* onClick={contractRegist} */
          >
            수주 등록하기
          </Button>
        </div>
        <br />
        <hr className="hr" style={hrStyle} />
        <div className="contract_body1">
          <div className={"ag-theme-material"} style={gridFrameStyle}>
            <AgGridReact
              /*  ref={g => (this.grid = g)} */
              onGridReady={this.gridReady}
              rowSelection={single}
              columnDefs={this.headerName}
              //onCellEditingStarted="popup"
              sortable="true"
              /*onCellClicked={cellClick} */
              rowData={this.state.rowData}
              frameworkComponents={{
                ContractCellSelect: this.contractCellSelect,
              }}
            />
          </div>
        </div>
        <br />
        <hr className="hr" styele={hrStyle} />
        <br />
        <div>
          <Typography className="estimateDetail" style={estimateDetailStyle}>
            견적 상세조회
          </Typography>
          <br />
          <hr className="hr" style={hrStyle} />
          <div className={"ag-theme-material"} style={gridFrameStyle}>
            <AgGridReact
              onGridReady={this.gridReady}
              className={theme}
              rowSelection={single}
              columnDefs={estimateDetail} /*rowData={this.rowData} */
            />
          </div>
        </div>
      </>
    );
  }
}