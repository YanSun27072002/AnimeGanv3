// import React, { useRef, useState } from 'react';
// import Webcam from 'react-webcam';

// const WebcamCapture = () => {
//   const webcamRef = useRef(null);
//   const [imageSrc, setImageSrc] = useState(null);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImageSrc(imageSrc);
//     // Dừng luồng webcam sau khi chụp
//     const tracks = webcamRef.current.stream.getTracks();
//     tracks.forEach(track => track.stop());
//   };

//   return (
//     <div>
//       {imageSrc ? (
//         <img src={imageSrc} alt="Captured" />
//       ) : (
//         <div>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//           />
//           <button onClick={capture}>Chụp ảnh</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WebcamCapture;


import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImageSrc(imageSrc);
  };

  const retakePhoto = () => {
    setImageSrc(null); // Xóa ảnh đã chụp để cho phép chụp lại
  };

  return (
    <div>
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
          />
          <button onClick={capture}>Chụp ảnh</button>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;

