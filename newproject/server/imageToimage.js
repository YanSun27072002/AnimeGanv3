import { HfInference } from '@huggingface/inference'
import fs from'fs';
const hf = new HfInference('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')

export async function getresult() {
    const blob = await hf.imageToImage({
        inputs: new Blob([fs.readFileSync("test/cats.jpg")]),
        // parameters: {
        //     prompt: "elmo's lecture",
        // },
        // model: "lllyasviel/sd-controlnet-depth",
        // stabilityai/stable-diffusion-xl-refiner-1.0 nhanh
        model: "stabilityai/stable-diffusion-xl-refiner-1.0",
    });
    return Buffer.from( await blob.arrayBuffer()).toString("base64");
    console.log("ketqua ", base64);
    
}


