// ses client code from aws documentation
const { SESClient } = require("@aws-sdk/client-ses");

const sesClient = new SESClient({
    region: "ap-south-1",
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});

module.exports = {sesClient};