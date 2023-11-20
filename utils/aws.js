const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});


const s3 = new AWS.S3();

module.exports = {

    
//Generating Signed Url For File Upload
    presignedUrl(req) {
        let fileName = req.params.fileName;
        let filePath = "";
        console.log(req.originalUrl);

        filePath = "other/pdfFile/data/" + Date.now().toString();

        console.log(filePath + "." + fileName.split(".").pop());
        const url = s3.getSignedUrl("putObject", {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: filePath + "." + fileName.split(".").pop(), //filename
            Expires: 200, //time to expire in seconds
            ContentType: req.query.mime,
        });
        return { url, pathName: filePath + "." + fileName.split(".").pop() };
    },


//Generating Signed Url For File View
    fetchFile(key, expireTime) {
        const url = s3.getSignedUrl("getObject", {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Expires: expireTime,
        });
        return url;
    },
}
