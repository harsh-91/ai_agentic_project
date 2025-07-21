import React, { useState } from "react";
import { useUser } from "./UserContext";
import { uploadDocument, listDocuments } from "./api";
import { logInfo, logError } from "./logger";

export default function RAG() {
  const { user } = useUser();
  const [file, setFile] = useState();
  const [docs, setDocs] = useState([]);
  const [status, setStatus] = useState("");

  React.useEffect(() => {
    if (user) {
      logInfo("UI:RAG load for user", { user });
      listDocuments(user.id).then(setDocs).catch(e=>logError("UI:RAG docs fail", e));
    }
  }, [user]);

  async function onUpload(e) {
    e.preventDefault();
    setStatus("");
    logInfo("UI:RAG upload", {user, file});
    if (!user || !file) return;
    try {
      await uploadDocument(user.id, file);
      setFile(null);
      listDocuments(user.id).then(setDocs);
      setStatus("Upload successful!");
      logInfo("UI:RAG Upload Success", {});
    } catch (err) {
      setStatus("Upload failed.");
      logError("UI:RAG Upload Error", err);
    }
  }
  
}
