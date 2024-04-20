const dotenv = require('dotenv');
const https = require('https');
const fs = require('fs');
const server = require('./app');
const ConnectDB = require('./config/databaseConnect');

const cloudinary = require('cloudinary');

dotenv.config({ path: './config/config.env' });

ConnectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// server.listen(process.env.SERVER_PORT, () => {
//     console.log(`Server is running on localhost:${process.env.SERVER_PORT}`)
// })

// Load SSL certificate
const options = {
    key: fs.readFileSync('./Nginx/Certificates/api/fullchain.pem'),
    cert: fs.readFileSync('./Nginx/Certificates/api/privkey.pem'),
};

// Create an HTTPS server
const secureServer = https.createServer(options, server).listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on https://10.12.1.111:${process.env.SERVER_PORT}`)
});

// secureServer.listen(process.env.SERVER_PORT, () => {
//     console.log(`Server is running on https://localhost:${process.env.SERVER_PORT}`);
// });
