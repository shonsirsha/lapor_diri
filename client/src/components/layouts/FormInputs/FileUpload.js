import React, { useContext, useEffect, useState } from "react";

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
  const [fileDocument, setfileDocument] = useState(null);
  const [fileDocumentProgress, setfileDocumentProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState(null);
  const authContext = useContext(AuthContext);
  const { resetToast, updateFail, updateSuccess } = authContext;
  const onChangeUploadFile = (e) => {
    setfileDocument(e.target.files[0]);
  };

  const onClickUploadFile = (e) => {
    try {
      const uploadTask = storage
        .ref(`${pathToFirebase}/${fileDocument.name}`)
        .put(fileDocument);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setfileDocumentProgress(percent);
        },
        (error) => {
          updateFail();
          setTimeout(() => {
            resetToast();
          }, 1200);
        },
        () => {
          storage
            .ref(`${pathToFirebase}`)
            .child(fileDocument.name)
            .getDownloadURL()
            .then((url) => {
              setFileUrl(url);
              updateSuccess();
              setTimeout(() => {
                resetToast();
              }, 1200);
            });
        }
      );
    } catch (e) {
      updateFail();
      setTimeout(() => {
        resetToast();
      }, 1200);
    }
  };
  return (
    <div>
      {fileDocumentProgress === 100 ? (
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
            {fileDocument.name}
          </a>
        </div>
      ) : (
        <div class='custom-file '>
          <Form>
            <FormGroup>
              <input
                type='file'
                class='custom-file-input'
                id='file'
                inputName='file'
                accept='image/*, .pdf'
                onChange={onChangeUploadFile}
                required
              />

              <label class='custom-file-label' for='file'>
                {fileDocument === null ? labelText : fileDocument.name}
              </label>
              {fileDocumentProgress > 0 ? (
                <ProgressBar
                  variant='success'
                  style={{ marginTop: "8px" }}
                  now={fileDocumentProgress}
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
