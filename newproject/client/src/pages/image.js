import { useEffect, useState } from "react";
import axios from "../config/axios.config";
export default function Image( {img}) {
    
    if (img===""){
        return (<p>
            loading
        </p>)
    }
    else
    return (
        <div>
           
            <img src={"data:image/pzng;base64,"+img} />
        </div>
    )
}

