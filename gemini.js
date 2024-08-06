import { GoogleGenerativeAI } from '@google/generative-ai';
import { Config } from './config.js';
import { barclayLog, parseCode } from './barclay.js';
const APIKey = Config.keys.gemini;
const genAI = new GoogleGenerativeAI(APIKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

async function askGemini() {
    const myFunc = async (s) => {
        const result = await model.generateContent(s);
        const response = result.response;
        let parsedCode = parseCode(response.text());
        if(parsedCode == null){
            throw("Unable to parse code from response: ",response);
        }
        const dataUri = 'data:text/javascript;base64,'+ btoa(parsedCode);
        import(dataUri);
        barclayLog("Request Complete: ", parsedCode);
        return;
    }
    return myFunc;
}

export { askGemini} ;