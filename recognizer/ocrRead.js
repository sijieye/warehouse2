
const trying = async function () {
    const result = await fetch('https://ocr5.cognitiveservices.azure.com/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview', {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': "26019dab75d94c86b52b07cebb546f23",
                'Content-Type': 'application/json'
            },
            body: "{'url':'https://assignment5q.blob.core.windows.net/image/Product_ Beach Flip Flops.jpg'}"
    });

    const json = await result.json();
    const contents = json["readResult"].content;
    let dict = {}

    const allInfo = contents.split("\n");
    
    let parts;
    for (let pair of allInfo) {
        if (pair.includes(": ")){
            parts = pair.split(": ");
            key = parts[0];
            value = parts[1];
        }

        if (key in dict){
            dict[key] = dict[key] + " " + pair
        }
        else{
            // Key not in dict
            dict[key] = parts[1];
        }
    }

    console.log(dict)
}

trying();