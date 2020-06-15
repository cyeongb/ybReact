import React, { useState, useEffect } from "react";
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
import ContractCellSelect, { status } from "./ContractCellSelect";

// ----------- input값(startDate , endDate에 사용중)
/* function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
    setValue(event.target.value);
  };

  const set = str => {
    setValue(str);
  };

  return { value, onChange, setValue: set };
} */
//--------------------------------- 스타일
const useStyles = makeStyles(theme => ({
  labelStyle: {
    color: "gray",
    padding: theme.spacing(2),
  },
  btnSearch: {
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
    padding: theme.spacing(1),
  },
  hrStyle: {
    opacity: "0.4",
  },
  btnStyle: {
    color: "white",
    fontWeight: "600",
    fontSize: "1.3rem",
    backgroundColor: "rosybrown",
    padding: theme.spacing(1.4),
    float: "right",
  },
  name: {
    color: "dimGray",
    fontWeight: "600",
    fontSize: "1.3rem",
  },
}));

// --------------- 그리드 스타일
const gridFrameStyle = {
  height: "300px",
  width: "90%",
  backgroundColor: "gainsboro",
};
//------------------------------------------------

// -------------- 수주가능한 견적 조회 그리드 헤더
const headerName = [
  /* {
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
    valueSetter: params => {
      console.log("옴??", JSON.stringfy(params.data.contractStatus));

      return true;
    },
    /*  valueGetter: params => {
      console.log("옴??", JSON.stringfy(params.data));

      return params.data.contractStatus;
    }, 
    */
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

// --------------- 견적상세
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

const ContractRegister = () =>
  /* 견적 컴포넌트 들고옴 */

  {
    const classes = useStyles();
    //------------  수주등록 그리드 헤더에 빈 값 둘 것들

    //const contractStatus = { A: "일반수주", B: "긴급수주" }; // 수주유형이름
    const [rowData, setRowData] = useState([""]); // 데이터
    const [rowDetailData, setRowDetailData] = useState([""]); // 견적상세

    const contractType = ""; // 수주유형이름(일반수주 밖에 못함)

    const [url, setUrl] = useState("");
    const rowSelection = "single";
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");
    const [estimateGridApi, setEstimateGridApi] = useState("");
    const [contractStatus, setContractStatus] = useState("");

    const startDateChange = e => {
      setStartdate(e.target.value);
    };
    const endDateChange = e => {
      setEnddate(e.target.value);
    };
    const selected = [];
    const theme = "ag-theme-balham";

    // ------------ 수주 등록하기 버튼 누르면 작동함
    const contractRegist = e => {
      selected = e.estimateGridApi.getSelectedRows();
      console.log(
        "수주등록 버튼 누르면 저장된게 머?? >>",
        JSON.stringify(selected),
      );
    };

    // onload 와 같은 기능 그리드가 뜰때 실행되는 이벤트..
    const gridReady = params => {
      setEstimateGridApi(params.api);

      //gridApi.applyTransaction({add: this.addrow});
    };
    //수주 가능 견적 조회 버튼 누르면 동작하는 컴포넌트
    function searchEstimate() {
      if (!startdate && enddate) {
        alert("날짜를 입력 해 주세요");
        return;
      }

      if (startdate && enddate) {
        console.log("시작날짜 >", startdate);
        console.log("종료날짜 > ", enddate);

        const rowData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8282/logi/logistics/sales/searchEstimateInContractAvailable?startDate=" +
                startdate +
                "&endDate=" +
                enddate,
            );

            console.log("수주가능 견적 response > ", response.data.gridRowJson);

            setRowData(response.data.gridRowJson); //------------> 여기가문제
          } catch (e) {
            console.log("수주가능 견적조회 하다가 에러 error>", e);
          }
        };
        rowData();
      }
    }

    function cellClick(cell) {
      console.log("cell 클릭함  >", cell);
      if (cell.value !== "" && cell.value.toString().includes("es")) {
        let estimateNo = cell.value;
        console.log("견적번호 >>", estimateNo);

        const rowDetailData = async () => {
          try {
            const response = await axios.get(
              "http://localhost:8282/logi/business/findEstimateDetail",
              estimateNo,
            );
            console.log(" 견적상세 response >", response);
            setRowDetailData(response.data.gridRowJson);
          } catch (e) {
            console.log("견적상세 가져오다 에러 >>", e);
          }
        };
      }
    }

    return (
      <React.Fragment>
        <>
          <br />
          <div>
            <Typography className={classes.labelStyle}>시작일</Typography>
            <TextField
              id={"startDate"}
              type={"date"}
              value={startdate}
              onChange={startDateChange}
            ></TextField>
            &nbsp;
            <Typography className={classes.labelStyle}>종료일</Typography>
            <TextField
              id={"endDate"}
              type={"date"}
              value={enddate}
              onChange={endDateChange}
            ></TextField>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button className={classes.btnSearch} onClick={searchEstimate}>
              수주 가능 견적 조회
            </Button>
            <Button className={classes.btnStyle} /* onClick={contractRegist} */>
              수주 등록하기
            </Button>
          </div>
          <br />
          <hr className={classes.hrStyle} />
          <div className="contract_body1">
            <div className={"ag-theme-material"} style={gridFrameStyle}>
              <AgGridReact
                onGridReady={gridReady}
                rowSelection={rowSelection}
                columnDefs={headerName}
                //onCellEditingStarted="popup"
                sortable="true"
                /*onCellClicked={cellClick} */
                rowData={rowData}
                frameworkComponents={{
                  ContractCellSelect: ContractCellSelect,
                }}
              />
            </div>
          </div>
          <br />
          <hr className={classes.hrStyle} />
          <br />
          <div>
            <Typography className={classes.name}>견적 상세조회</Typography>
            <br />
            <hr className={classes.hrStyle} />
            <div className={"ag-theme-material"} style={gridFrameStyle}>
              <AgGridReact
                onGridReady={gridReady}
                className={theme}
                rowSelection={rowSelection}
                columnDefs={estimateDetail} /*rowData={this.rowData} */
              />
            </div>
          </div>
        </>
      </React.Fragment>
    );
  };

export default ContractRegister;
