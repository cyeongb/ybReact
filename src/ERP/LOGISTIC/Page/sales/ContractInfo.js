import React, { useState, useEffect } from "react";
import { Button, TextField, makeStyles, Typography } from "@material-ui/core";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-material.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";

const useAxios = makeUseAxios({
  axios: axios.create({ baseURL: "http://localhost:8282/" }),
});

function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const onChange = event => {
    setValue(event.target.value);
  };

  const set = str => {
    setValue(str);
  };

  return { value, onChange, setValue: set };
}
const useStyles = makeStyles(theme => ({
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
  },
  labelStyle: {
    color: "gray",
    padding: theme.spacing(2),
  },
  cal: {
    padding: theme.spacing(2),
  },
  end: {
    padding: theme.spacing(2),
  },
  hrStyle: {
    opacity: "0.4",
  },
  name: {
    color: "dimGray",
    fontWeight: "600",
    fontSize: "20px",
  },
}));

const gridFrameStyle = {
  height: "300px",
  width: "95%",
  backgroundColor: "gainsboro",
};

const gridStyle = {
  width: "95%",
  height: "70vh",
  backgroundColor: "whiteSmoke",
};

const headerName = [
  { headerName: "견적일련번호", field: "estimateNo", width: 150 },
  { headerName: "수주일련번호", field: "contractNo", width: 150 },
  {
    headerName: "수주유형이름",
    field: "contractStatusName",
    width: 150,
    editable: true,
  },

  { headerName: "거래처명", field: "customerName", width: 150 },
  { headerName: "수주일자", field: "contractDate", width: 150 },
  {
    headerName: "수주요청자",
    field: "contractRequester",
    width: 150,
    editable: true,
  },

  { headerName: "수주담당자", field: "contractInCharge", width: 150 },

  { headerName: "비고", field: "description", width: 150, editable: true },
];

const contractDetailName = [
  { headerName: "수주상세번호", field: "contractDetailNo", width: 130 },
  { headerName: "수주번호", field: "contractNo", width: 130 },
  {
    headerName: "품목명",
    field: "itemName",
    width: 130,
    editable: true,
    cellEditor: "itemnameList",
  },
  {
    headerName: "품목코드",
    field: "itemCode",
    width: 130,
    editable: true,
    cellEditor: "itemList",
  },
  { headerName: "단위", field: "unitOfContract", width: 130, editable: true },
  {
    headerName: "납기일",
    field: "dueDateOfContract",
    width: 130,
    editable: true,
    cellEditor: "dueDate",
  },
  {
    headerName: "수주수량",
    field: "estimateAmount",
    editable: true,
    width: 130,
    cellEditor: "unitpriceofestimate",
  },
  {
    headerName: "재고사용량",
    field: "stockAmountUse",
    width: 130,
    editable: true,
    cellEditor: "estimateamount",
  },
  {
    headerName: "필요제작수량",
    field: "productionRequirement",
    width: 130,
    editable: true,
    cellEditor: "estimateamount",
  },
  {
    headerName: "단가",
    field: "unitPriceOfContract",
    width: 130,
    editable: true,
    cellEditor: "estimateamount",
  },
  {
    headerName: "합계액",
    field: "sumPriceOfContract",
    width: 130,
    editable: true,
    cellEditor: "sumprice",
  },
  {
    headerName: "처리상태",
    field: "processingStatus",
    width: 130,
    editable: true,
    cellEditor: "sumprice",
  },
  {
    headerName: "작업완료",
    field: "operationCompletedStatus",
    width: 130,
    editable: true,
    cellEditor: "sumprice",
  },

  {
    headerName: "비고",
    field: "description",
    width: 130,
    editable: true,
    cellEditor: "sumprice",
  },
];

const rowData = {
  /* 수주 가능한 견적 조회 버튼 누르면 데이터 들고오는 함수 */
};

const ContractInfo = ({ estimateNo, setEstimateNo }) => {
  const classes = useStyles();
  const single = "single";

  const [url, setUrl] = useState("");
  const [{ data }, refetch] = useAxios(url);
  const [estimateGridApi, setEstimateGridApi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function gridReady(params) {
    console.log("----- gridReady() 호출 -----");

    setEstimateGridApi(params.api);
  }

  const startDateChange = e => {
    //  console.log("startDateChange() 호출 - e.target.value -->", e.target.value);

    setStartDate(e.target.value);
  };
  console.log("시작날짜>>", startDate);

  const endDateChange = e => {
    // console.log("endDateChange()호출 - e.target.value -->", e.target.value);

    setEndDate(e.target.value);
  };
  console.log("종료날짜>>", endDate);

  // ------------------------ 수주검색------------------------------
  const searchContract = e => {
    console.log("=========수주검색======");
    console.log("searchContract() 수주검색 ---- ");
    let startd = startDate;
    let endd = endDate;
    if (startd || endd === "") {
      alert("날짜를 입력해 주세요");
      return;
    }
    let url = ""
  };

  /* 
  const onRowSelected = e => {
    if (e.node.selected) {
      console.log("node 선택됨 >", e.node.selected);

      setEstimateNo(e.data.estimateNo);
    }
  }; */

  return (
    <React.Fragment>
      <>
        <div className="contract_header">
          <div className={classes.cal}>
            <Typography className={classes.labelStyle}>시작일</Typography>
            <TextField
              id={"startDate"}
              type="date"
              value={startDate}
              onChange={startDateChange}
              rowSelection={single}
            ></TextField>

            <Typography className={classes.labelStyle}>종료일</Typography>
            <TextField
              id={"endDate"}
              type="date"
              value={endDate}
              onChange={endDateChange}
            ></TextField>
          </div>
          &nbsp;&nbsp;
          <Button className={classes.btnSearch} onClick={searchContract}>
            수주 조회
          </Button>
        </div>
        <br />
        <hr className={classes.hrStyle} />
        <div className="contract_body">
          <div className={"ag-theme-material"} style={gridFrameStyle}>
            <AgGridReact
              onGridReady={gridReady}
              columnDefs={headerName}
              style={gridStyle}
              rowSelection={single}
              /*   onRowSelected={onRowSelected} */
              rowData={data}
            />
          </div>
          <br />
          <hr className={classes.hrStyle} />
          <br />
          <Typography className={classes.name}>수주상세조회</Typography>
          <br />
          <hr className={classes.hrStyle} />
          <div className={"ag-theme-material"} style={gridFrameStyle}>
            <AgGridReact
              onGridReady={gridReady}
              columnDefs={contractDetailName}
              style={gridStyle}
              rowSelection={single}
              /*   onRowSelected={onRowSelected} */
              rowData={data}
            />
          </div>
        </div>
      </>
    </React.Fragment>
  );
};

export default ContractInfo;
