import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../../context/auth/authContext";

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

const FileUpload = ({
  labelText,
  pathToFirebase,
  documentName,
  userId,
  documentUrl,
}) => {
  const [fileDocument, setfileDocument] = useState(null);
  const [fileDocumentProgress, setfileDocumentProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  const authContext = useContext(AuthContext);
  const { resetToast, updateFail, uploadDocument, loadUser } = authContext;

  const onChangeUploadFile = (e) => {
    setfileDocument(e.target.files[0]);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (authContext.user) {
      if (documentName === "melde") {
        setFileUrl(authContext.user.melde_pic);
      }

      if (documentName === "paspor") {
        setFileUrl(authContext.user.paspor_pic);
      }
    }
  }, [authContext.user]);

  const onClickUploadFile = (e) => {
    try {
      let fileName = `${userId}-${fileDocument.name}`;
      const uploadTask = storage
        .ref(`${pathToFirebase}/${fileName}`)
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
            .child(fileName)
            .getDownloadURL()
            .then((url) => {
              setFileUrl(url);
              let docObj = { docName: documentName, docUrl: url };
              uploadDocument(userId, docObj);
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
      {fileDocumentProgress === 100 || fileUrl.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <b>
            <p style={{ marginRight: "4px" }}>{labelText}: </p>
          </b>
          <a href={fileUrl} target='_blank'>
            Cek Dokumen
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
                accept='.png, .jpeg, .jpg, .pdf'
                onChange={onChangeUploadFile}
                required
              />

              <label class='custom-file-label' for='file'>
                {fileDocument === null ? labelText : fileDocument.name}
              </label>
              <Form.Text className='text-muted'>
                File maksimal berukuran 6MB dengan tipe: .jpg/.jpeg, .png, .pdf.
              </Form.Text>
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
  userId: PropTypes.string.isRequired,
};

export default FileUpload;
