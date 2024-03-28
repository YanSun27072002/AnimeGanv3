import React, { useRef } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs';
import * as onnx from 'onnxjs';


const WebcamWithTensor = () => {
  const webcamRef = useRef(null);
  const onnxModelRef = useRef(null);

  // Hàm để chụp ảnh và chuyển đổi thành tensor
  const captureAndConvertToTensor = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // /
  
    // Tạo một ảnh từ URL
    const img = new Image();
    img.src = imageSrc;
    // console.log("kich thuoc anh",img.shape)

    // Chờ ảnh được tải hoàn tất
    await img.decode();

    // Chuyển đổi ảnh thành tensor
    const tensor = tf.browser.fromPixels(img);
    const divisors =  127.5;
    const dividedTensor = tf.div(tensor, divisors);
    const resultTensor = tf.sub(dividedTensor, 1.0);
    const tensor1 =tf.expandDims(resultTensor, 0)

    // Hiển thị tensor trong console (chỉ để kiểm tra)
    // console.log(tensor);
    console.log('Shape của tensor:', tensor1.shape);
    const values = await tensor1.data();


    // Hiển thị giá trị trong console
    console.log('Các giá trị trong tensor:', values);
  };

  return (
    <div>
      {/* Component Webcam */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      {/* Nút để gọi hàm chụp ảnh và chuyển đổi thành tensor */}
      <button onClick={captureAndConvertToTensor}>Chụp ảnh và chuyển đổi</button>
    </div>
  );
};

export default WebcamWithTensor;
