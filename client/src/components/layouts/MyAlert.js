import React, { useContext, Fragment } from "react";
import { Alert } from "react-bootstrap";
import AlertContext from "../../context/alert/alertContext";
const MyAlert = () => {
  const alertContext = useContext(AlertContext);
  return alertContext.alerts.length > 0
    ? alertContext.alerts.map((alert) => (
        <Fragment key={alert.id}>
          {alert.msg !== "unauthorised" ? (
            <div class="mt-32" className="container">
              <Alert key={alert.id} variant={alert.type}>
                <b>{alert.msg}</b>
              </Alert>
            </div>
          ) : null}
        </Fragment>
      ))
    : null;
};

export default MyAlert;
