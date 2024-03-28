import { useRef } from 'react';
import Webcam from 'react-webcam';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs';
import  {InferenceSession}  from "onnxjs";
// import * as tf from '@tensorflow/tfjs';

const WebcamWithTensor = () => {
  const webcamRef = useRef(null);
  const captureAndConvertToTensor = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();

    const img = new Image();
    img.src = imageSrc;
    await img.decode();
    const tensor = tf.browser.fromPixels(img);
    const divisors =  127.5;
    const dividedTensor = tf.div(tensor, divisors);
    const resultTensor = tf.sub(dividedTensor, 1.0);
    const tensor1 =tf.expandDims(resultTensor, 0)
    console.log('Shape của tensor:', tensor1.shape);
    const values = await tensor1.data();
    console.log('Các giá trị trong input tensor:', values);
    // const onnxModelPath = './Shinkai_53.onnx';
    //
const session = new InferenceSession();
// use the following in an async method
const url = "./src/generator_hayao.onnx";
await session.loadModel(url);
const outputMap = await session.run(tensor1);
const outputTensor = outputMap.values().next().value;
console.log('Các giá trị trong output tensor:', outputTensor);



    //
    
  };

  return (
    <div>
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
