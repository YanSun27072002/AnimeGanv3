import React, { useState } from "react";
import Image from "./pages/image";
// import logo from "./logo.svg";
import "./App.css";
// import Image from "./pages/image";
import WebcamWithTensor from "./cap"
import { div } from "@tensorflow/tfjs";

function App() {
  const [result, setResult] = useState(null);
  
  return (
    <div className="App">
      <WebcamWithTensor callback={setResult}/>
      {result?<img src={"data:image/jpeg;base64,"+result.base64}/>: <div></div>}
    </div>
  );
}

export default App;
