const fetch = require("node-fetch");

module.exports = async function (context, myQueueItem) {
    const result = await fetch(`https://${process.env["ocrURL"]}/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview`, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env["ocrKey"],
            'Content-Type': 'application/json'
        },
        body: `{'url': '${myQueueItem}'}`
    });

    const json = await result.json();
    const contents = json["readResult"].content;
    const allInfo = contents.split("\n");

    let dict = {};
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

    context.bindings.cosmosDB = JSON.stringify(dict);
};

