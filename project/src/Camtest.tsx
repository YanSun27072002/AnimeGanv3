import { useRef } from 'react';
import Webcam, { WebcamProps } from 'react-webcam';
import '@tensorflow/tfjs';
import * as tf from '@tensorflow/tfjs';
import 'onnxjs';

const WebcamWithTensor = () => {
  const webcamRef = useRef<WebcamProps & { getScreenshot(): string | undefined }>(null);
  const captureAndConvertToTensor = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc !== undefined) {
      const img = new Image();
      img.src = imageSrc;
      await img.decode();
      console.log('Các giá img.decode:', img.decode());

      const tensor = tf.browser.fromPixels(img);
      console.log('Các giá trị tron tensor:', tensor.dataSync());
      const divisors = 127.5;
      const dividedTensor = tf.div(tensor, divisors);
      const resultTensor = tf.sub(dividedTensor, 1.0);
      const tensor1 = tf.expandDims(resultTensor, 0);
      const value=tensor1.dataSync()
      console.log('Các giá trị trong input tensor:', value);

      console.log('Shape của tensor:', tensor1.shape);
      //
      const onnxModelPath = './Shinkai_53.onnx';
      const session = new onnx.InferenceSession({ backendHint: 'webgl' });
      const modelPromise = session.loadModel(onnxModelPath);

      // Sau khi mô hình đã được tải, bạn có thể chạy inference
      await modelPromise;

      try {
        await modelPromise;
        console.log('ONNX model loaded successfully');
      } catch (error) {
        console.error('Error loading ONNX model:', error);
        return;
      }

      // Convert the TensorFlow.js tensor to an ONNX tensor
      const onnxTensor = new onnx.Tensor(tensor1.dataSync(), 'float32', tensor1.shape);

      // Run inference using the ONNX model
      const outputMap = await session.run([onnxTensor]);
      const outputTensor = outputMap.values().next().value;

      // Print the output tensor values
      console.log('Các giá trị trong output tensor:', outputTensor.data);

      // Do further processing with the outputTensor as needed
    }
  };

  return (
    <div>
      {/* Component Webcam */}
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      {/* Nút để gọi hàm chụp ảnh và chuyển đổi thành tensor */}
      <button onClick={captureAndConvertToTensor}>Chụp ảnh và chuyển đổi</button>
    </div>
  );
};

export default WebcamWithTensor;
