// const{ HfInference } =require( '@huggingface/inference')
// const fs = require('fs');
// const hf = new HfInference('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')


// async function getresult(){ 
//   return await hf.imageToText({
//     data: fs.readFileSync('server/test/cats.jpg'),
//     model: 'nlpconnect/vit-gpt2-image-captioning'
//   })
// }
// getresult().then((text)=>{
//   console.log("ketqua ", text.generated_text);
// })
// .catch ((e)=>{
//   console.error("erro nè: ",e)
// })