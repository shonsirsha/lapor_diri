import React, { useState, useContext, useEffect } from "react";
import ToastContext from "../../context/toast/toastContext";

import { Alert, Toast } from "react-bootstrap";
const MyToast = () => {
  const toastContext = useContext(ToastContext);

  const [showtoast, setShowtoast] = useState(false);
  const [status, setStatus] = useState(null);
  const [thisToast, setThisToast] = useState({
    msg: null,
    type: null,
  });
  const { toast } = toastContext;
  const { msg, type } = thisToast;

  useEffect(() => {
    if (toast === null) {
      setShowtoast(false);
    } else {
      setShowtoast(true);
      setThisToast({
        msg: toast.msg,
        type: toast.type,
      });
    }
  }, [toast]);

  const toggleShowtoast = () => {
    setShowtoast(!showtoast);
  };

  return (
    <Toast className='statusToast' show={showtoast} onClose={toggleShowtoast}>
      <Toast.Header>
        <strong className='mr-auto'>Pemberitahuan</strong>
      </Toast.Header>
      <Toast.Body>
        <Alert variant={type}>{msg}</Alert>
      </Toast.Body>
    </Toast>
  );
};

export default MyToast;
