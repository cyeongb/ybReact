
// 인사발령관리	/app/hr/appointment ------------------------------------------------------------------
export { default as registPersonnelByEmpoyee } from '../../../../pages/erp/personnel/appointment/RegistPersonnelByEmpoyee';   // 사원별 인사등록	/app/hr/appointment/registPersonnelByEmpoyee	
export { default as registAppointment } from '../../../../pages/erp/personnel/appointment/RegistAppointment';                 // 인사발령등록	/app/hr/appointment/registAppointment	

// 기초환경설정 /app/hr/circumstance-----------------------------------------------------------
export { default as payStep } from "../../../../pages/erp/personnel/circumstance/payStep/PayStep";                                  // 호봉테이블 관리	/app/hr/circumstance/payStep 
export { default as registPayDeduction } from "../../../../pages/erp/personnel/circumstance/registPayDeduction/RegistPayDeduction"; // 지급공제항목등록	/app/hr/circumstance/registPayDeduction	
export { default as registDeductionTax } from '../../../../pages/erp/personnel/circumstance/registDeductionTax/RegistDeductionTax'; // 사회보험환경등록	/app/hr/circumstance/registDeductionTax	
export { default as basicWorktime } from '../../../../pages/erp/personnel/circumstance/basicWorktime/BasicWorkTime';                // 기본근무시간관리	/app/hr/circumstance/basicWorktime 
export { default as holiday } from '../../../../pages/erp/personnel/circumstance/holiday/Holiday';                                  // 휴일관리	/app/hr/circumstance/holiday
export { default as annualLeave } from '../../../../pages/erp/personnel/circumstance/annualLeave/AnnualLeave';                      // 휴가/연차관리	/app/hr/circumstance/annualLeave
export { default as allowance } from '../../../../pages/erp/personnel/circumstance/allowance/Allowance';                            // 수당관리	/app/hr/circumstance/allowance	

// 인사관리	/app/hr/pm	-----------------------------------------------------------
export { default as registPersonnelInfo } from '../../../../pages/erp/personnel/pm/registPersonnelInfo/RegistPersonnelInfo';        // 인사정보등록	/app/hr/pm/registPersonnelInfo
export { default as personnelRecordCard } from '../../../../pages/erp/personnel/pm/personnelRecordCard/PersonnelRecordCard';        // 인사기록카드	/app/hr/pm/personnelRecordCard	
//import educationTraining from '../../../../pages/erp/personnel/pm/EducationTraining';                                             // 교육등록	/app/hr/pm/educationTraining 미구현
export { default as dept } from '../../../../pages/erp/personnel/pm/dept/Dept';                                                     // 부서관리	/app/hr/pm/dept 

// 근태관리	/app/hr/attendance ---------------------------------------------------------------

export {default as dailyAttdApply} from '../../../../pages/erp/personnel/attendance/dailyAttdApply/DailyAttdApply';                 // 일일근태신청	/app/hr/attendance/dailyAttdApply	
export {default as monthlyAttd} from '../../../../pages/erp/personnel/attendance/monthlyAttd/MonthlyAttd';                          // 월간근태관리	/app/hr/attendance/monthlyAttd	
export {default as attdApproval} from '../../../../pages/erp/personnel/attendance/attdApproval/AttdApproval';                       // 휴가/연차 신청	/app/hr/attendance/attdApproval	 
export {default as annualLeaveApply} from '../../../../pages/erp/personnel/attendance/annualLeaveApply/AnnualLeaveApply';           // 근태승인관리	/app/hr/attendance/annualLeaveApply	 
export {default as restDailyAttdApply} from "../../../../pages/erp/personnel/attendance/restDailyAttdApply/RestDailyAttdApply";     // 근태외신청 	/app/hr/attendance/restDailyAttdApply	
export {default as overNightApply} from '../../../../pages/erp/personnel/attendance/overNightApply/OverNightApply';                 // 초과근무신청	/app/hr/attendance/overNightApply	


// 급여관리	/app/hr/pay	-------------------------------------------------------------------

//import salary  from "../../../../pages/erp/personnel/pay/Salary";   // 급여조회	/app/hr/pay/salary	




