import { handleRequest } from '../lib/handleRequest'
import { getMd5 } from '../lib/getMd5'
import AWS from 'aws-sdk/global'
import S3 from 'aws-sdk/clients/s3'


const credentialsUrl = `${process.env.REACT_APP_API_URL}/api/files/upload/credentials`

export const getUploadCredentials = (client) => {
    const url = `${credentialsUrl}?token=${client.token}`
    const request = fetch(url, {
        method: 'POST'
    })
    return handleRequest(request)
}

export const uploadFile = (client, id, credentialResponse, file, type) => {

    var p = new Promise(function(resolve, reject){

        const locations = credentialResponse.upload_locations[type];

        const keyString = locations
            .replace('{archiveId}', id)
            .replace('{md5ArchiveIdAndExtension}', getMd5(id));

        const AccessKeyId = credentialResponse.credentials.AccessKeyId;
        const SecretAccessKey = credentialResponse.credentials.SecretAccessKey;
        const SessionToken = credentialResponse.credentials.SessionToken;
        const region = credentialResponse.region;
        const bucket = credentialResponse.bucket;

        const s3 = new S3({
            credentials: new AWS.Credentials(AccessKeyId, SecretAccessKey, SessionToken),
            region: region
        })

        s3.upload({
            Bucket: bucket,
            Key: keyString,
            Body: file
        }, (error, data) => {

            !error ? resolve(data) : reject(error)

        });


    });

    return p


}
