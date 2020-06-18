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

/* ########################  수        주         등        록        페       이       지    #################################################
   ###########################################################################################################################################
   ######## 등록한 견적 데이터들을 날짜별로 조회해서 해당 견적과 + 견적 상세 데이터를 batchList로 합쳐서 수주로 등록하는 기능을 하는 페이지. ##########
   ###########################################################################################################################################*/

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

//-----------------------const 선언 ----------------------------------
const theme = "ag-theme-balham";
const single = "single"; // row-selection이 single
// onload 와 같은 기능 그리드가 뜰때 실행되는 이벤트..

//====================================================================//

// ========================== 수주 등록 class 시작 ===============================//
export default class ContractRegister extends Component {
  constructor(props) {
    super(props);

    //----------------------- state initialize -------------------------------//

    this.state = {
      startdate: "", //조회 시작날짜
      endDate: "", // 조회 동료 날짜
      estimateGridApi: [], //견적 그리드 api
      rowData: [], //견적 행 데이터
      rowDetailData: [], // 견적 상세 행 데이터
      status1: "일반수주",
      status2: "긴급수주",

      statusName: "", // 수주 유형
      selectedData: [], //클릭한 row데이터
      selectedDetailData: [], // 클릭한 row의 상세 데이터
      selectable: false, // 선택 여부
      inchargeCode: "", //담당자 코드
      contractUrl: "http://localhost:8282/logi/logistics/sales/addNewContract", //수주 등록 url
      batchlist: [],
      estimateList: [],
    };

    //==================================================================//
  }

  //===================견적 조회 헤더 ============================//
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
          "valueGetter  - params.data.contractStatus>",
          JSON.stringify(params.data.contractStatus),
        );

        return params.data.contractStatus;
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

  // --------------------------------- 견적상세 헤더 ------------------------------------//
  // 견적 상세는 '수주가능견적조회' 버튼을 클릭했을 때, 나오는 데이터의 '견적일련번호'를 클릭하면 해당 번호의 견적상세 데이터가 하단에 나온다 !
  //
  estimateDetailHeader = [
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

  // ---------------------수주 status onChange 함수--------------------//
  statusChange = e => {
    console.log("==== statusChange() 호출  ====");
    console.log("statusChange - e.target.value>>", e.target.value);

    this.setState({ statusName: e.target.value });
    console.log(
      "statusChange - this.state.statusName>>",
      this.state.statusName,
    );
  };

  // ------------ 수주 status 클릭하면 나오는 창 ------------------------//
  // 원래 한 유형을 클릭하면 화면에 나오게 구현하고싶었으나..계속 값을 못가져와서 ㅜ3ㅜ 추후에 다시 손볼 예정
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

  //===================================  life cycle method ==================================//
  // componentDidUpdate : useEffect 와 같은 기능.
  // 메서드는 렌더링 후에 실행이 되는데 값을 렌더링 하기 전의 값(snapshot)을 가져올 수 있다.
  componentDidUpdate(prevProps, prevState) {
    // console.log('prevProps >',prevProps);
    // console.log('prevState > ',prevState);
  }
  //==============================================//

  // ===================== componentDidMount: 렌더링 된 후 ========================//
  componentDidMount() {
    //-------------------견적 선택해서 견적상세 나오게 함----------------------
    this.rowClicked = async e => {
      console.log("row click 여긴 오나");
      console.log("row event -->", e);

      if (e.data.estimateNo !== "") {
        console.log("row clicked() 은 null 이아님 e.data>", e.data.estimateNo);

        this.setState({
          selectedData: e.data,
          selectable: e.node.selectable,
          inchargeCode: e.data.personCodeInCharge,
          selectedDetailData: this.state.rowDetailData[0],
        });

        this.estimateno = e.data.estimateNo;
        let url =
          "http://localhost:8282/logi/logistics/sales/estimateDetail?estimateNo=" +
          this.estimateno;
        await axios
          .post(url)
          .then(response => {
            //console.log("response>>", response);

            this.setState({
              rowDetailData: response.data.gridRowJson,
            });
            console.log(
              "@@@@@@this.state.rowDetailData >> ",
              this.state.rowDetailData[0],
            );

            return this.state.rowDetailData[0];
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
    this.searchEstimate = async () => {
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
        await axios
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

    // -------------------- 선택한 견적 + 견적상세 = batchList 만들기 ------------------------------------//
    this.batchList = () => {
      console.log("=============batchList() 호출==============");
      let selected_data = this.state.selectedData.estimateDetailTOList;

      this.setState({
        selected_data: this.state.selectedDetailData,
      });
      console.log(
        " batchList () - this.state.selectedData.estimateDetailTOList>>",
        selected_data,
      );

      // return this.state.batchlist;
    };
    // =====================수주 등록하기===================
    this.contractRegist = async e => {
      let today = new Date();
      if (this.state.selectable === false) {
        alert("등록할 견적을 선택해 주세요");
        console.log("selectable이 false인가??>>", this.state.selectable);
        return;
      }
      if (this.state.selectable === true) {
        let s = window.confirm(
          this.state.selectedData.estimateNo + "견적을 등록 하시겠습니까?",
        );
        if (s === false) {
          alert("취소함");
          console.log("견적 등록 취소 ");
          return;
        }

        console.log("=========== contract regist() 호출 ============");
        let date =
          today.getFullYear() +
          "-" +
          parseInt(today.getMonth() + 1) +
          "-" +
          today.getDate();
        let selecteddata = this.state.selectedData;
        let charge = this.state.inchargeCode;
        let selectedDetaildata = this.state.rowDetailData[0];
        let status = this.state.status1;
        // let newdata = selecteddata.estimateDetailTOList;
        // let newdata = this.state.selectedData.estimateDetailTOList.key;
        // newdata 를 props에도 저장해놓음
        /* this.setState({
          newdata: selecteddata.map(data=>data.estimateDetailTOList===null?{...data,...selectedDetaildata}:data)

        }); */
        console.log(
          "수주등록  - 선택된 데이터(selecteddata) >> ",
          selecteddata,
        );
        console.log(
          "수주등록  - 선택됨? this.state.selectable >> ",
          this.state.selectable,
        );
        console.log("수주등록  -  오늘 날짜(date)  --->", date);
        console.log(
          "수주등록  -  담당자코드(this.state.inchargeCode) >>",
          charge,
        );
        console.log(
          "수주등록 - 선택된 견적상세 (selectedDetaildata)>>",
          selectedDetaildata,
        );
        console.log("수주>>>>", status);

        //let url = "http://localhost:8282/logi/logistics/sales/addNewContract";

        await axios
          .post(this.state.contractUrl, {
            contractDate: date,
            personCodeInCharge: charge,
            contractStatus: status,
          })

          .then((req, response) => {
            console.log("response >> ", response);
            response.headers("Access-Control-Allow-Origin", "*");
            response.headers(
              "Access-Control-Allow-Methods",
              "GET,PUT,POST,DELETE,OPTIONS",
            );
            response.headers(
              "Access-Control-Allow-Headers",
              "Content-Type, Authorization, Content-Length, X-Requested-With",
            );
            response.send();
          })
          .catch(error => {
            console.log("견적 수주로 등록하다가 에러 >> ", error);
          });
        /* await axios
          .put({
            url: this.state.contractUrl,
            header: {
              "Content-Type": "application/json",
            },
            data: selecteddata,
            today,
            charge,
          })
          .then(response => {
            console.log(
              "@@@@@@@@@@@@ 수주 등록성공 >> ",
              response.data.gridRowJson,
            );
          })
          .catch(error => {
            console.log("@@@@@@@@@@@ 수주 등록하다가 에러 >>", error);
          }); */
        alert("등록되었습니다");
        //window.location.reload();
      }
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
      <React.Fragment>
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
          <Typography
            className="estimateDetailHeader"
            style={estimateDetailStyle}
          >
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
              columnDefs={this.estimateDetailHeader} /*rowData={this.rowData} */
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
      </React.Fragment>
    );
  }
}
