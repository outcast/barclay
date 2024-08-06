// Description: This file contains the functions that are used to log to the console and parse the code from the html response.
function barclayLog(...text){
    text.forEach((element, index) => {
        if(index > 0){
            let lines = element.split('\n');
            lines.forEach((l,i) => {
                document.getElementById('three_console').value += String(i+1) + ": " +l + '\n';
            });
        } else {
            document.getElementById('three_console').value += element + '\n';
        }
    });
    
}

function parseCode(s){
    let imports = "import * as THREE from 'three';\n"
    let importLibs = [];
    let parsedCode = "";
    let code = /```javascript\n([.\S\s]*)\n```/.exec(s);
    if(code == null){
        console.log("Regex unable to find seperate javascript file looking in html to parse code");
        code = /```html[.\S\s]*<script>([.\S\s]*)<\/script>[.\S\s]*```/.exec(s);
        if(code == null){
            console.log("Unable to parse code from html response:", s);
            return null;
        }
    }
    code[1].split('\n').forEach(element => {
        if(element.startsWith('import')){
            console.log("Skipping: "+element)
            return;
        } 
        let depCall = /THREE\.(.*)\(/.exec(element);
        if(depCall != null){
            let importPrefix = "addons/";
            let addonCalled = false;
            if(depCall[1].match(/Loader/) != null){
                importPrefix += "loaders/";
                addonCalled = true;
            } else if(depCall[1].match(/Controls/) != null){
                importPrefix += "controls/";
                addonCalled = true;
            }
            if(addonCalled){
                if(importLibs.includes(depCall[1])){
                    console.log("Skipping duplicate dependency: "+depCall[1]);
                    return;
                }
                element = element.replace("THREE.", ""); 
                importLibs.push(depCall[1]);
                console.log("Adding dependency:", importPrefix, depCall[1]);
                imports += `import { ${depCall[1]} } from 'three/${importPrefix}${depCall[1]}.js';\n`;
            }
        }
        parsedCode += element + '\n';
    });
    return imports + "\n\n" + parsedCode
}

export { barclayLog , parseCode} ;