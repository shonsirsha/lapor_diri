import React, { useContext, useEffect, useState } from "react";

import AuthContext from "../../../context/auth/authContext";
import ToastContext from "../../../context/toast/toastContext";

import PropTypes from "prop-types";

import { Button, Form, FormGroup, ProgressBar } from "react-bootstrap";
import { storage } from "../../../firebase/index";

const FileUpload = ({ labelText, documentName, userId }) => {
  const [fileDocument, setfileDocument] = useState(null);
  const [fileDocumentProgress, setFileDocumentProgress] = useState(0);
  const [fileUrl, setFileUrl] = useState("");
  const [fileNameDb, setFileNameDb] = useState("");
  const authContext = useContext(AuthContext);
  const toastContext = useContext(ToastContext);

  const {
    uploadDocument,
    loadUser,
    deleteDocument,
    resetUpdateStatus,
  } = authContext;

  const urlPrefix = `https://firebasestorage.googleapis.com/v0/b/lapor-diri-webapp.appspot.com/o/${documentName}%2F`;
  const onChangeUploadFile = (e) => {
    let fileSize = e.target.files[0].size / 1024 / 1024;
    if (fileSize <= 6) {
      setfileDocument(e.target.files[0]);
      setFileNameDb(`${userId}-${e.target.files[0].name}`);
    } else {
      showLocalToast(
        "Dokumen gagal diunggah. Ukuran maksimal dokumen adalah 6MB.",
        "danger",
        2500
      );
    }
  };
  const { showToast } = toastContext;

  const showLocalToast = (msg, type, timeout) => {
    showToast(msg, type, timeout);
    resetUpdateStatus();
  };

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const resetField = () => {
    setfileDocument(null);
    setFileUrl("");
    setFileDocumentProgress(0);
    setFileNameDb("");
  };

  useEffect(() => {
    if (authContext.user) {
      if (authContext.user[documentName] !== "") {
        setFileUrl(urlPrefix + authContext.user[documentName]);
        setFileNameDb(authContext.user[documentName]);
      }
    }
    //eslint-disable-next-line
  }, [authContext.user]);
  const onDelete = () => {
    deleteDocument(documentName);
    resetField();
    storage
      .ref(`${documentName}`)
      .child(fileNameDb)
      .delete()
      .then(function () {
        showLocalToast("Dokumen berhasil dihapus", "success", 1500);
      })
      .catch(function (error) {
        showLocalToast(
          "Dokumen gagal dihapus, mohon coba lagi",
          "danger",
          1500
        );
      });
  };
  const onClickUploadFile = (e) => {
    try {
      const uploadTask = storage
        .ref(`${documentName}/${fileNameDb}`)
        .put(fileDocument);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          var percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFileDocumentProgress(percent);
        },
        (err) => {
          showLocalToast(
            "Dokumen gagal diunggah, mohon coba lagi.",
            "danger",
            1500
          );
        },
        () => {
          storage
            .ref(`${documentName}`)
            .child(fileNameDb)
            .getDownloadURL()
            .then((url) => {
              setFileUrl(url);
              let docObj = { docName: documentName, docUrl: fileNameDb };
              uploadDocument(docObj);
              showLocalToast("Dokumen berhasil diunggah", "success", 1500);
            });
        }
      );
    } catch (e) {
      showLocalToast(
        "Dokumen gagal diunggah, mohon coba lagi.",
        "danger",
        1500
      );
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
              rel="noopener noreferrer"
              style={{ marginRight: "8px" }}
              target="_blank"
            >
              Cek Dokumen
            </a>
          </div>
          <button
            onClick={() => {
              onDelete();
            }}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      ) : (
        <div className="custom-file ">
          <Form>
            <FormGroup>
              <input
                type="file"
                className="custom-file-input"
                id="file"
                inputname="file"
                accept=".png, .jpeg, .jpg, .pdf"
                onChange={onChangeUploadFile}
                required
              />

              <label className="custom-file-label" htmlFor="file">
                {fileDocument === null ? labelText : fileDocument.name}
              </label>
              <Form.Text className="text-muted">
                File maksimal berukuran 6MB dengan tipe: .jpg/.jpeg, .png, atau
                .pdf.
              </Form.Text>
              {fileDocumentProgress > 0 ? (
                <ProgressBar
                  variant="success"
                  style={{ marginTop: "8px" }}
                  now={fileDocumentProgress}
                />
              ) : (
                ""
              )}
            </FormGroup>
            <Button
              variant="success"
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
  documentName: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default FileUpload;
