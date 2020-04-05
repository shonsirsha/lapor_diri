import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import AlertContext from "../../context/alert/alertContext";
const MyAlert = () => {
  const alertContext = useContext(AlertContext);
  return alertContext.alerts.length > 0
    ? alertContext.alerts.map((alert) => (
        <div style={{ marginTop: "32px" }} className='container'>
          <Alert key={alert.id} variant='danger'>
            <b>{alert.msg}</b>
          </Alert>
        </div>
      ))
    : null;
};

export default MyAlert;
