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

const addDetailrow = [
  {
    estimateDetailNo: "",
    estimateNo: "",
    itemCode: "",
    itemName: "",
    unitOfEstimate: "",
    dueDateOfEstimate: "",
    estimateAmount: "",
    unitPriceOfEstimate: "?",
    sumPriceOfEstimate: "",
    description: "",
    estimateno: "",
  },
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
      rowDetailData: [],
      // contractStatus: ["일반수주", "긴급수주"],
      contractType: "",
      status1: "일반수주",
      status2: "긴급수주",
      statusName: "",
      selectedData: [],
      selectable: false,
      //   value: this.props,
    };

    //=================================================//
  }

  headerName = [
    /*   {
      headerName: "",
      checkboxSelection: true,
      width: 50,
      headerCheckboxSelection: true,
    }, */
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
      valueFormatter: e => {
        console.log("=====valueFormatter() 호출 =======");
        console.log("e>>", e);
        if (e.data.status === "normal") {
          e.data.contractStatus = "일반수주";
        }
        if (e.data.status === "urgent") {
          e.data.contractStatus = "긴급수주";
        }
        return e.data.contractStatus;
      },
      valueGetter: params => {
        console.log("===== valuegetter() 호출 ======");
        console.log(
          "valueGetter params.data.contractStatus>",
          JSON.stringify(params.data.contractStatus),
        );
        // console.log("this.state.statusName >> ", this.state.statusName); // 안나온다.

        return params.data.contractStatus;
      },
      /*  valueSetter: params => {
        //setter 에 오지를 않음.
        console.log("===== value setter () 호출 =====");

        console.log("setter  - params>>", params.data);
        console.log("setter - this.state.statusName>> ", this.state.statusName);

        return (params.data.contractStatus = this.state.statusName);
      }, */
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

  // --------------------------------- 견적상세------------------------------------
  // 견적 상세는 '수주가능견적조회' 버튼을 클릭했을 때, 나오는 데이터의 '견적일련번호'를 클릭하면 해당 번호의 견적상세 데이터가 하단에 나온다 !
  //
  estimateDetail = [
    {
      headerName: "",
      checkboxSelection: true,
      width: 50,
      headerCheckboxSelection: true,
    },
    { headerName: "견적상세일련번호", field: "estimateDetailNo", width: 170 },
    { headerName: "견적일련번호", field: "estimateNo", width: 170 },
    {
      headerName: "품목코드",
      field: "itemCode",
      width: 170,
    },

    {
      headerName: "품목명",
      field: "itemName",
      width: 170,
      editable: true,
      cellEditor: "itemnameEditor",
    },
    { headerName: "단위", field: "unitOfEstimate", width: 170, editable: true },
    {
      headerName: "납기일",
      field: "dueDateOfEstimate",
      width: 170,
      editable: true,
      cellEditor: "dueDateEditor",
    },
    {
      headerName: "견적수량",
      field: "estimateAmount",
      width: 170,
      editable: true,
      cellEditor: "estimateAmountEditor",
    },
    {
      headerName: "견적단가",
      field: "unitPriceOfEstimate",
      width: 170,
      cellEditor: "unitPriceOfEstimateEditor",
    },
    {
      headerName: "합계액",
      field: "sumPrice",
      width: 150,
      editable: true,
      cellEditor: "sumPriceEditor",
    },

    { headerName: "비고", field: "description", width: 150, editable: true },
  ];

  /* statusChange = e => {
    this.setState({
      statusName: e.target.value,
    });

    //  console.log("statusChange - e.target.value>>", e.target.value);
    console.log(
      " statusChange - this.state.statusName>",
      this.state.statusName,
    );
    return this.state.statusName;
  }; */

  statusChange = e => {
    console.log("==== statusChange() 호출  ====");
    console.log("e.target.value>>", e.target.value);

    this.setState({ statusName: e.target.value });
    console.log("this.state.statusName>>", this.state.statusName);
  };

  contractCellSelect = () => (
    <div>
      <InputLabel id="demo-mutiple-name-label" value={this.state.statusName}>
        수주유형
      </InputLabel>
      <Select
        /* labelId="demo-simple-select-helper-label" */
        id="demo-simple-select-helper"
        onChange={e => {
          this.setState({ statusName: e.target.value });
        }}
        value={this.state.statusName}
      >
        <option value="일반수주">일반수주</option>
        <option value="긴급수주">긴급수주</option>
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
    //-------------------견적 선택해서 견적상세 나오게 함----------------------
    this.rowClicked = e => {
      console.log("row click 여긴 오나");
      console.log("row event -->", e);

      if (e.data.estimateNo !== "") {
        console.log("row clicked() 은 null 이아님 e.data>", e.data.estimateNo);

        this.setState({
          selectedData: e.data,
          selectable: e.node.selectable,
        });

        this.estimateno = e.data.estimateNo;
        let url =
          "http://localhost:8282/logi/logistics/sales/estimateDetail?estimateNo=" +
          this.estimateno;
        axios
          .post(url)
          .then(response => {
            //console.log("response>>", response);

            this.setState({
              rowDetailData: response.data.gridRowJson,
            });
            console.log(
              "@@@@@@this.state.rowDetailData >> ",
              this.state.rowDetailData,
            );

            return this.state.rowDetailData;
          })
          .catch((e, info) => {
            console.log("견적상세 axios하는중에 에러 >", e);
            console.log(" error info >> ", info);
          });
        /*  this.setState({
        deletebuttonstatus: false,
      }); */
      }
    };

    //-----------------------수주 가능한 견적 조회------------------------
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
            console.log("@@@@@@@@ this.state.rowData >> ", this.state.rowData);

            return this.state.rowData;
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

    // =====================수주 등록하기===================
    this.contractRegist = e => {
      if (this.state.selectable === false) {
        alert("등록할 견적을 선택해 주세요");
        console.log("selectable이 false인가??>>", this.state.selectable);
        return;
      }
      console.log("=========== contract regist() 호출 ============");
      console.log("this.state.selectedData>> ", this.state.selectedData);
      console.log("this.state.selectable >> ", this.state.selectable);
      let url="http://localhost:8282/logi/logistics/sales/addNewContract";
      
    };
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
    console.log(
      "grid ready() 호출  - estimateGridApi::",
      this.state.estimateGridApi,
    );
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
            style={contractRegistStyle}
            onClick={this.contractRegist}
          >
            수주 등록하기
          </Button>
        </div>
        <br />
        <hr className="hr" style={hrStyle} />
        <div className="contract_body1">
          <div className={"ag-theme-material"} style={gridFrameStyle}>
            <AgGridReact
              ref={g => (this.grid = g)}
              onGridReady={this.gridReady}
              rowSelection={single}
              columnDefs={this.headerName}
              //onCellEditingStarted="popup"
              sortable="true"
              onRowClicked={this.rowClicked}
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
              rowData={this.state.rowDetailData}
              columnDefs={this.estimateDetail} /*rowData={this.rowData} */
              frameworkComponents={{
                itemName: this.itemNameEditor,
                dueDate: this.dueDateEditor,
                estimateAmount: this.estimateAmountEditor,
                unitPriceOfEstimate: this.unitPriceOfEstimateEditor,
                sumPrice: this.sumPriceEditor,
                // itemnameList: this.itemnameList,
              }}
            />
          </div>
        </div>
      </>
    );
  }
}
