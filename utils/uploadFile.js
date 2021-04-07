const pinataApiKey = "1379983dabb5abf29891";
const pinataSecretApiKey = "efd7c799606a77a1e23c07b2e9c5117beeaaba71b2d7caa3b5f3de312d643118"
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data')
var args = process.argv.slice(2) //https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/

const pinFileToIPFS = (pinataApiKey, pinataSecretApiKey) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();
    data.append('file', fs.createReadStream("utils/images/vaporWaveFantasy.jpg"));

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
        name: 'UniqueArt',
        keyvalues: {
            exampleKey: 'exampleValue'
        }
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
        cidVersion: 0,
        customPinPolicy: {
            regions: [
                {
                    id: 'FRA1',
                    desiredReplicationCount: 1
                },
                {
                    id: 'NYC1',
                    desiredReplicationCount: 2
                }
            ]
        }
    });
    data.append('pinataOptions', pinataOptions);

    return axios
        .post(url, data, {
            maxBodyLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
            headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                pinata_api_key: pinataApiKey,
                pinata_secret_api_key: pinataSecretApiKey
            }
        })
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
            console.error(error)
        });
};


pinFileToIPFS(pinataApiKey, pinataSecretApiKey)