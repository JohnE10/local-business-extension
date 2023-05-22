import React, { useRef } from 'react';

const FileUploader = () => {
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    const file = fileInputRef.current.files[0];
    console.log('Selected file:', file);
    // Do something with the selected file
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
