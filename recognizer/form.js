const { AzureKeyCredential, DocumentAnalysisClient } = require("@azure/ai-form-recognizer");

// set `<your-key>` and `<your-endpoint>` variables with the values from the Azure portal.
const key = "2b9a5dc451b8435390c7bee1e9f7828e";
const endpoint = "https://queueform.cognitiveservices.azure.com";

// sample document
const formUrl = "https://assignment5q.blob.core.windows.net/image/Product_ Beach Flip Flops.jpg"

async function main() {
  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(key));

  const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-document", formUrl);

  const {keyValuePairs} = await poller.pollUntilDone();

  console.log(keyValuePairs)
//   if (!keyValuePairs || keyValuePairs.length <= 0) {
//       console.log("No key-value pairs were extracted from the document.");
//   } else {
//       console.log("Key-Value Pairs:");
//       for (const {key, value, confidence} of keyValuePairs) {
//           console.log("- Key  :", `"${key.content}"`);
//           console.log("  Value:", `"${(value && value.content) || "<undefined>"}" (${confidence})`);
//       }
//   }

}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});