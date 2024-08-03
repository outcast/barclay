import { GoogleGenerativeAI } from '@google/generative-ai';

const APIKey = "AIzaSyAQtPdU7vGSySrwgFAoj9HmyWOInMKzMvU"
const genAI = new GoogleGenerativeAI(APIKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function askGemini() {
    const myFunc = async (s) => {
        const result = await model.generateContent(s);
        const response = result.response;
        const code = /```javascript\n([.\S\s]*)\n```/.exec(await response.text()); 
        let parsedCode = ''
        code[1].split('\n').forEach(element => {
            if(element.startsWith('import')){
                console.log("Skipping: "+element)
            } else {
                // console.log("Adding: "+element)
                parsedCode += element + '\n';
            }
        });
        parsedCode = `
            import * as THREE from \'three\';
            import { OBJLoader } from \'three/addons/loaders/OBJLoader.js\';
            import { FontLoader } from \'three/addons/loaders/FontLoader.js\';
            ` + parsedCode
        const dataUri = 'data:text/javascript;base64,'+ btoa(parsedCode);
        import(dataUri);
        barclayLog("Request Complete: ", parsedCode);
        return;
    }
    return myFunc;
}

function barclayLog(...text){
    text.forEach(element => {
        document.getElementById('three_console').value += text + '\n';
    });
    
}

export { askGemini, barclayLog } ;