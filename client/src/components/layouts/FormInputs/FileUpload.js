import React, { useContext, useEffect, useState } from "react";

import AlertContext from "../../../context/alert/alertContext";
import AuthContext from "../../../context/auth/authContext";
import Spinner from "../../layouts/Spinner";

import PropTypes from "prop-types";

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
  ProgressBar,
  ListGroup,
} from "react-bootstrap";
import { storage } from "../../../firebase/index";

const FileUpload = ({ labelText, pathToFirebase, documentName }) => {
  const [fileMelde, setFileMelde] = useState(null);
  const [fileMeldeProgress, setFileMeldeProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  const onChangeUploadFile = (e) => {
    setFileMelde(e.target.files[0]);
  };

  const onClickUploadFile = (e) => {
    const uploadTask = storage
      .ref(`${pathToFirebase}/${fileMelde.name}`)
      .put(fileMelde);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileMeldeProgress(percent);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref(`${pathToFirebase}`)
          .child(fileMelde.name)
          .getDownloadURL()
          .then((url) => {
            setFileUrl(url);
          });
      }
    );
  };
  return (
    <div>
      {fileMeldeProgress === 100 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <b>
            <p>{documentName}: </p>
          </b>
          <a href={fileUrl} target='_blank'>
            {fileMelde.name}
          </a>
        </div>
      ) : (
        <div class='custom-file '>
          <Form>
            <FormGroup>
              <input
                type='file'
                class='custom-file-input'
                id='meldeFile'
                inputName='meldeFile'
                accept='image/*, .pdf'
                onChange={onChangeUploadFile}
              />

              <label class='custom-file-label' for='meldeFile'>
                {fileMelde === null ? labelText : fileMelde.name}
              </label>
              {fileMeldeProgress > 0 ? (
                <ProgressBar
                  variant='success'
                  style={{ marginTop: "8px" }}
                  now={fileMeldeProgress}
                />
              ) : (
                ""
              )}
            </FormGroup>
            <Button
              variant='success'
              onClick={onClickUploadFile}
              style={{ marginTop: "8px", marginBottom: "32px" }}
            >
              Simpan & perbarui
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

FileUpload.propTypes = {
  labelText: PropTypes.string.isRequired,
  pathToFirebase: PropTypes.string.isRequired,
  documentName: PropTypes.string.isRequired,
};

export default FileUpload;
