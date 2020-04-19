import React, { useState } from "react";
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
  const [showBanner, setShowBanner] = useState(true);

  const toggleShowBanner = () => {
    setShowBanner(!showBanner);
  };

  return (
    <Toast
      className='statusBanner'
      show={showBanner}
      onClose={toggleShowBanner}
    >
      <Toast.Header>
        <strong className='mr-auto'>Pemberitahuan</strong>
      </Toast.Header>
      <Toast.Body>
        <Alert variant='success'>Data tersimpan</Alert>
      </Toast.Body>
    </Toast>
  );
};

export default MyToast;
