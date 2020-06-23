import React, { useState } from "react";
import { Typography, Tabs, Tab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import ContractRegister from "./ContractRegister";
import ContractInfo from "./ContractInfo";
/* #######################################     수         주          페       이       지    #################################################
   ###########################################################################################################################################
   * 수주 페이지를 수주 등록과 수주 조회로 나눴음.
   * 수주 등록 : 날짜별로 조회하여 해당 견적을 가져와서 일반수주로 등록(원래는 긴급수주도 있어야 하나 긴급수주는 구현이 안되어있음.)
   * 하고 해당 견적의 상세를 batchList로 합쳐서 수주로 등록한다.
   * 수주조회 : 수주등록 페이지에서 등록한 수주르 조회하는 페이지.
   * *** 함수형(수주조회) + 클래스형(수주등록)을 믹스해서 구현했습니다. 
   ###########################################################################################################################################*/

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Contract = () => {
  const useStyles = makeStyles(theme => ({
    bar: {
      backgroundColor: "gray",
    },
  }));
  const classes = useStyles();

  const [estimateNo, setEstimateNo] = useState(""); //견적번호
  const [contractNo, setContractNo] = useState(""); // 수주번호
  const [value, setState] = useState(0);

  console.log(
    "Contract.js - 견적번호:",
    estimateNo,
    "+수주번호:",
    contractNo,
    "value값:",
    value,
  );

  const handleChange = (event, newValue) => {
    setState(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <React.Fragment>
      <>
        <AppBar className={classes.bar} position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="수주 조회" {...a11yProps(0)} />
            <Tab label="수주 등록" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <div>
          {value === 0 ? (
            <TabPanel value={value} index={0}>
              <ContractInfo
                estimateNo={estimateNo}
                setEstimateNo={setEstimateNo}
              />
            </TabPanel>
          ) : (
            <TabPanel value={value} index={1}>
              <ContractRegister
                contractNo={contractNo}
                setContractNo={setContractNo}
              />
            </TabPanel>
          )}
        </div>
      </>
    </React.Fragment>
  );
};

export default Contract;
