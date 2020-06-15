import React, {useState} from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    List,
    DialogActions,
    Button,
  } from "@material-ui/core";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";


const WorkPlaceCodeDialog = ({open,close,value}) => {

    //========================== 그리드 객체 준비 ==========================
    const [positionGridApi, setPositionGridApi] = useState();
    const onGridReady = params => {
        setPositionGridApi(params.api);
    };
    
    
    //========================== 그리드내용 ==========================
    const accountColumnDefs = [
        { headerName: "사 업 장 코 드", field: "workplaceCode", width: 210,  },
        { headerName: "사 업 장 명", field: "workplaceName", width: 210,  }
    ];

    //========================== 그리드를 클릭했을 때 발생되는 이벤트 ==========================
    // onClose 와 open 값을 비구조 할당과 동시에 Dialog가 닫히면서
    // onClose안에 객체(data, division) 을 가지고 JournalGrid 컴포넌트로 감.
      
    const handleClose = () => {
      close({
            data : positionGridApi.getSelectedRows(),  // data는 클릭한 row의 정보이고,
            division : 'WorkPlaceCodeDialog' 
        });
    };

    const Close = () =>{
        close({
            division : 'WorkPlaceCodeDialog'
        })
    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} fullWidth={true} maxWidth={'xs'}>
            <DialogTitle id="simple-dialog-title">사 업 장 목 록</DialogTitle>
            <DialogContent dividers>
            <List >
                <div className={"ag-theme-balham"}
                    style={{
                        height: "300px",
                        width: "100%",
                        paddingTop: "8px"
                    }}>
                    <AgGridReact
                        
                        columnDefs={accountColumnDefs}
                        rowData={value}   // 뿌릴 data
                        rowSelection='single'  // 하나만 선택 가능.
                        onGridReady={onGridReady}
                        onCellClicked={handleClose}  // cell을 클릭하면, handleClose가 실행된다.
                    />
                </div>
            </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={Close} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkPlaceCodeDialog;