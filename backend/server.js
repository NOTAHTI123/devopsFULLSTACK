const dotenv = require('dotenv');
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

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running on localhost:${process.env.SERVER_PORT}`)
})