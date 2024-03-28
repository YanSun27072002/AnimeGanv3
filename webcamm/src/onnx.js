
import React, { useEffect, useState } from 'react';
import * as onnx from 'onnxjs';

const YourComponent = () => {
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Thay đổi đường dẫn đến mô hình của bạn
        const modelPath = 'path/to/your/model.onnx';
        const response = await fetch(modelPath);
        const buffer = await response.arrayBuffer();
        const arrayBuffer = new Uint8Array(buffer);
        const onnxModel = new onnx.InferenceSession({ model: arrayBuffer });
        setModel(onnxModel);
      } catch (error) {
        console.error('Error loading ONNX model:', error);
      }
    };

    loadModel();
  }, []); // Chạy chỉ một lần khi component được tạo

  return (
    <div>
      {/* Hiển thị nội dung bạn muốn ở đây */}
    </div>
  );
};

export default YourComponent;
