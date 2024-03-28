import React from 'react';
import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as onnx from 'onnxjs';

const CameraComponent = () => {
  const webcamRef = useRef(null);
  const onnxModelRef = useRef(null);
  const [width, setwidth] = useState(256);
  const  [height, setheight] = useState(256);

  const checkwidth = () => {
    if (width < 256) {
      setwidth(256)
    } else {
      setwidth( width-width%32)
    }
  };
  const checkheight = () => {
    if (height < 256) {
      setheight(256)
    } else {
      setheight( height-height%32)
    }
  };
  useEffect(() => {
    const loadModel = async () => {
      const response = await fetch('./Shinkai_53.onnx');
      const arrayBuffer = await response.arrayBuffer();
      const model = new onnx.InferenceSession({ backendHint: 'webgl' });
      await model.loadModel(new Uint8Array(arrayBuffer));
      onnxModelRef.current = model;
    };

    loadModel();
  }, []);

  const captureAndPredict = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    const imageTensor = preprocessImage(imageSrc);

    const predictions = await predictWithModel(imageTensor);

    handlePredictions(predictions);
  };

  const preprocessImage = (imageSrc) => {
    const imageData = getImageDataFromImageSrc(imageSrc);
    const inputTensor = new onnx.Tensor(imageData, 'float32', [1, 3, height, width]); 
    const divisor =  127.5;
    const dividedTensor = onnx.Tensor.div(inputTensor, divisor);
    const resultTensor = onnx.Tensor.sub(dividedTensor, 1.0);
    const expandedTensor = resultTensor.expandDims(0);
    return expandedTensor;
  };

  const predictWithModel = async (inputTensor) => {
    const outputMap = await onnxModelRef.current.run([inputTensor]);
    const predictions = outputMap.values().next().value.data;
    return predictions;
  };

  const getImageDataFromImageSrc = (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    checkheight()
    checkwidth()
    console.log(width)
    canvas.width = width;
    canvas.height = height;
   
    context.drawImage(image, 0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height).data;
    const inputTensor = new onnx.Tensor(new Float32Array(imageData), 'float32', [1, 3, height, width]);
    return inputTensor;
  };

  const handlePredictions = (predictions) => {
    console.log(predictions);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={captureAndPredict}>Chụp và chuyển </button>
    </div> 
  );
};

export default CameraComponent;
