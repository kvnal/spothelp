import HuggingFace from "./llama-13b-chat.js";
import HuggingFaceLanguage from "./languageRecog.js";

// let a = new HuggingFace();
let a = new HuggingFaceLanguage();
// let aa = a.llama()
// console.log("aa > ", aa)




// a.llamaPromise.then(res=>console.log("ok ",res))
a.llamaPromise.then(res=>console.log("ok",res))