import React, { useState } from "react";

const SingleFileUploader = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("initial");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      console.log("Uploading file...");

      const formData = new FormData();
      formData.append("file", file);

      try {
        // You can write the URL of your server or any other endpoint used for file upload
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div>
        <label htmlFor="file" className="sr-only">
          Choose a file
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
      {file && (
        <section>
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && <button onClick={handleUpload}>Upload a file</button>}
      <Result status={status} />
    </>
  );
};

export default SingleFileUploader;

export const MultipleFileUploader = () => {
  const [files, setFiles] = useState(null);
  const [status, setStatus] = useState("initial");

  const handleFileChange = (e) => {
    if (e.target.files) {
      setStatus("initial");
      setFiles(e.target.files);
    }
  };

  const handleUpload = async () => {
    if (files) {
      setStatus("uploading");

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      try {
        const result = await fetch("https://httpbin.org/post", {
          method: "POST",
          body: formData,
        });

        const data = await result.json();

        console.log(data);
        setStatus("success");
      } catch (error) {
        console.error(error);
        setStatus("fail");
      }
    }
  };

  return (
    <>
      <div className="input-group">
        <label htmlFor="file" className="sr-only">
          Choose files
        </label>
        <input id="file" type="file" multiple onChange={handleFileChange} />
      </div>
      {files &&
        Array.from(files).map((file, index) => (
          <section key={file.name}>
            File number {index + 1} details:
            <ul>
              <li>Name: {file.name}</li>
              <li>Type: {file.type}</li>
              <li>Size: {file.size} bytes</li>
            </ul>
          </section>
        ))}

      {files && (
        <button onClick={handleUpload} className="submit">
          Upload {files.length > 1 ? "files" : "a file"}
        </button>
      )}

      <Result status={status} />
    </>
  );
};

const Result = ({ status }) => {
  if (status === "success") {
    return "<p>✅ File uploaded successfully!</p>";
  } else if (status === "fail") {
    return "<p>❌ File upload failed!</p>";
  } else if (status === "uploading") {
    return "<p>⏳ Uploading selected file...</p>";
  } else {
    return null;
  }
};
