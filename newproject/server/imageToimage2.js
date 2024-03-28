import { HfInference } from '@huggingface/inference';

const hf = new HfInference('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');


export async function getresult(base64Image) {
    const blob = base64ToBlob(base64Image);
    const resultBase64 = await translateImage(blob);
    console.log("Kết quả:", resultBase64);
    return resultBase64;
}

function base64ToBlob(base64Image) {
    const byteString = atob(base64Image.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}

async function translateImage(imageBlob) {
    const blob = await hf.imageToImage({
        inputs: imageBlob,
        model: "stabilityai/stable-diffusion-xl-refiner-1.0",
        // model: "lllyasviel/control_v11p_sd15_lineart",
    });
    const base64 = Buffer.from(await blob.arrayBuffer()).toString("base64");
    return base64;
}

