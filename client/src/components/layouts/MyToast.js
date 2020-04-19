import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

import {
  Modal,
  Button,
  Row,
  Col,
  Card,
  Container,
  Alert,
  Accordion,
  Form,
  Toast,
  FormGroup,
} from "react-bootstrap";
const MyToast = () => {
  const authContext = useContext(AuthContext);

  const { updated } = authContext;
  const [showtoast, setShowtoast] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (updated === "hidden") {
      setShowtoast(false);
    } else {
      setShowtoast(true);
      setStatus(updated);
    }
  }, [updated]);

  const toggleShowtoast = () => {
    setShowtoast(!showtoast);
  };

  return (
    <Toast className='statusToast' show={showtoast} onClose={toggleShowtoast}>
      <Toast.Header>
        <strong className='mr-auto'>Pemberitahuan</strong>
      </Toast.Header>
      <Toast.Body>
        <Alert variant={status === "success" ? "success" : "danger"}>
          {status === "success"
            ? "Data tersimpan"
            : "Mohon maaf, terjadi kesalahan dalam menyimpan"}
        </Alert>
      </Toast.Body>
    </Toast>
  );
};

export default MyToast;
