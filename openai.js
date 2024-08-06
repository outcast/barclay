import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from "openai";
import { Config } from './config.js';
import { barclayLog, parseCode } from './barclay.js';
const APIKey = Config.keys.openai;
const openai = new OpenAI({apiKey: APIKey, dangerouslyAllowBrowser: true });

async function askOpenAI() {
    const myFunc = async (s) => {
        console.log("Requesting: "+s);
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              {"role": "user", content: s},
            ]
        });
        let parsedCode = parseCode(response.choices[0].message.content);
        if(parsedCode == null){
            throw("Unable to parse code from response: ",response);
        }
        const dataUri = 'data:text/javascript;base64,'+ btoa(parsedCode);
        import(dataUri);
        barclayLog("Request Complete: ", parsedCode);
    }
    return myFunc;
}

export { askOpenAI } ;