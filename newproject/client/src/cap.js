import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from './config/axios.config.js';

const WebcamCapture = ({callback}) => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
    sendImageToServer(imageSrc);
    // console.log("imageSrc",imageSrc)
  };

  const retakePhoto = () => {
    setImageSrc(null); // Xóa ảnh đã chụp để cho phép chụp lại
  };

  const sendImageToServer = async (imageData) => {
    // Gửi dữ liệu ảnh lên server
    const response = await axios.post('/upload', {image: imageData })
      .catch(error => {
        console.error('Error sending image to server:', error);
      });
      callback(response.data)
    console.log('Image sent to server successfully:', response.data);
  };

  return (
    <div className="webcam-container">
      {imageSrc ? (
        <div>
          <img src={imageSrc} alt="Captured" />
          <button onClick={retakePhoto}>Chụp lại</button>
        </div>
      ) : (
        
        <div>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam-preview"
          />
          <button onClick={capture}>Chụp ảnh</button>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
