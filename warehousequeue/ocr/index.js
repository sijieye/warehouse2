const request = require('request');

module.exports = async function (context, myQueueItem) {
    
    context.log('JavaScript queue trigger function processed work item', myQueueItem);
    context.log("Name:", process.env["ocrKey"])
    
    // var headersInfo = new Headers();
    // headersInfo.append("Ocp-Apim-Subscription-Key", "26019dab75d94c86b52b07cebb546f23");
    // headersInfo.append("Content-Type", "application/json");

    const options = {
        url: `https://${process.env["ocrURL"]}/computervision/imageanalysis:analyze?features=caption,read&model-version=latest&language=en&api-version=2023-02-01-preview`,
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': process.env["ocrKey"],
            'Content-Type': 'application/json'
        },
        body: "{'url':'https://learn.microsoft.com/azure/cognitive-services/computer-vision/media/quickstarts/presentation.png'}"
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body);
            console.log("It works");

        }
    }
    request(options, callback);
};

