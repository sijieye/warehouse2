import { ChangeEvent, useState, useContext } from 'react';
// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { SignedContext } from "../contexts/signedContext";


function Image() {
    const {queueURL} = useContext(SignedContext)
    const containerName = `image`;

    const [sasToken, setSasToken] = useState<string>("");
    const [storageAccountName, setStorageAccountName] = useState<string>("");

    const getSasToken = async () => {
        const res = await fetch("https://queuekeys.azurewebsites.net/api/sas", {
        method: "GET"
        })
    
        const json = await res.text();
    
        setSasToken(json);
    };


    const getStorage = async () => {
        const res = await fetch("https://queuekeys.azurewebsites.net/api/storage", {
        method: "GET"
        })
    
        const json = await res.text();
    
        setStorageAccountName(json);
    };

    getSasToken();
    getStorage();

    const upload = ((file: File) => {
        const uploadUrl = `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`;
        console.log(uploadUrl);

        // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
        const blobService = new BlobServiceClient(uploadUrl);

        // get Container - full public read access
        const containerClient: ContainerClient =
        blobService.getContainerClient(containerName);

        const createBlobInContainer = async (file: File) => {
            // create blobClient for container
            const blobClient = containerClient.getBlockBlobClient(file.name);
          
            // set mimetype as determined from browser with file upload control
            const options = { blobHTTPHeaders: { blobContentType: file.type } };
          
            // upload file
            await blobClient.uploadData(file, options);
        };


        const uploadFileToBlob = async (file: File | null): Promise<void> => {
            if (!file) return;
          
            // upload file
            await createBlobInContainer(file);
        };

        uploadFileToBlob(file);
    })

    const handleSubmit = async (file: string) => {
        fetch(queueURL, {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: `https://${storageAccountName}.blob.core.windows.net/${containerName}/${file}`
        })
    }


    function handleChange(e: ChangeEvent<HTMLInputElement>) {    
        if (!e.target.files) return;

        if (sasToken && storageAccountName){
            const files = e.target.files;
        
            for (let i = 0; i < files.length; i++) {
                let file = e.target.files[i]
                upload(file);
                handleSubmit(file.name);
            }
        }
      }
    
      return (
        <div>
            <input type="file" multiple onChange={handleChange} />
        </div>
      )
}

export default Image;
