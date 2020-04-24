import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../../context/auth/authContext";
import ToastContext from "../../../context/toast/toastContext";

import PropTypes from "prop-types";

import { Button, Form, FormGroup, ProgressBar } from "react-bootstrap";
import { storage } from "../../../firebase/index";

const FileUpload = ({ labelText, pathToFirebase, documentName, userId }) => {
  const [fileDocument, setfileDocument] = useState(null);
  const [fileDocumentProgress, setFileDocumentProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [fileNameDb, setFileNameDb] = useState("");
  const authContext = useContext(AuthContext);
  const toastContext = useContext(ToastContext);

  const {
    resetToast,
    updateFail,
    uploadDocument,
    loadUser,
    deleteDocument,
    updateStatus,
    resetUpdateStatus,
  } = authContext;

  const urlPrefix = `https://firebasestorage.googleapis.com/v0/b/lapor-diri-webapp.appspot.com/o/${documentName}%2F`;
  const onChangeUploadFile = (e) => {
    let fileSize = e.target.files[0].size / 1024 / 1024;
    if (fileSize <= 6) {
      setfileDocument(e.target.files[0]);
      setFileNameDb(`${userId}-${e.target.files[0].name}`);
    } else {
      updateFail();
    }
  };
  const { showToast } = toastContext;

  const showLocalToast = (msg, type, timeout) => {
    showToast(msg, type, timeout);
    resetUpdateStatus();
  };

  useEffect(() => {
    loadUser();
  }, []);

  const resetField = () => {
    setfileDocument(null);
    setFileUrl("");
    setFileDocumentProgress(0);
    setFileNameDb("");
  };

  useEffect(() => {
    if (authContext.user) {
      if (documentName === "melde") {
        if (authContext.user.melde_pic !== "") {
          setFileUrl(urlPrefix + authContext.user.melde_pic);
          setFileNameDb(authContext.user.melde_pic);
        }
      }

      if (documentName === "paspor") {
        if (authContext.user.paspor_pic !== "") {
          setFileUrl(urlPrefix + authContext.user.paspor_pic);
          setFileNameDb(authContext.user.paspor_pic);
        }
      }
    }
  }, [authContext.user]);
  const onDelete = () => {
    storage
      .ref(`${pathToFirebase}`)
      .child(fileNameDb)
      .delete()
      .then(function () {
        deleteDocument(userId, documentName);
        resetField();
        showLocalToast("Dokumen berhasil dihapus", "success", 1500);
      })
      .catch(function (error) {
        updateFail();
      });
  };
  const onClickUploadFile = (e) => {
    try {
      const uploadTask = storage
        .ref(`${pathToFirebase}/${fileNameDb}`)
        .put(fileDocument);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileDocumentProgress(percent);
        },
        (error) => {
          updateFail();
        },
        () => {
          storage
            .ref(`${pathToFirebase}`)
            .child(fileNameDb)
            .getDownloadURL()
            .then((url) => {
              setFileUrl(url);
              let docObj = { docName: documentName, docUrl: fileNameDb };
              uploadDocument(userId, docObj);
              showLocalToast("Dokumen berhasil diunggah", "success", 1500);
            });
        }
      );
    } catch (e) {
      updateFail();
    }
  };
  return (
    <div>
      {fileDocumentProgress === 100 || fileUrl.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <b>
              <p style={{ marginRight: "4px" }}>{labelText}: </p>
            </b>
            <a
              href={fileUrl + "?alt=media"}
              style={{ marginRight: "8px" }}
              target='_blank'
            >
              Cek Dokumen
            </a>
          </div>
          <a
            onClick={() => {
              onDelete();
            }}
          >
            <i class='fas fa-trash'></i>
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
                File maksimal berukuran 6MB dengan tipe: .jpg/.jpeg, .png, atau
                .pdf.
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
