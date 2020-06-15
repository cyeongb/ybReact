import React, { useState } from "react";
import { Typography, Tabs, Tab } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/styles";
import Box from "@material-ui/core/Box";
import ContractRegister from "./ContractRegister";
import ContractInfo from "./ContractInfo";

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

const useStyles = makeStyles(theme => ({
  bar: {
    backgroundColor: "gray",
  },
}));

const Contract = () => {
  const [estimateNo, setEstimateNo] = useState(""); //견적번호
  const [contractNo, setContractNo] = useState(""); // 수주번호
  const [value, setState] = useState(0);

  console.log("Contract.js - 견적번호:", estimateNo, "+수주번호:", contractNo,'value값:',value);

  const handleChange = (event, newValue) => {
    setState(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const classes = useStyles();

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
