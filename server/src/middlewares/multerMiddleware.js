const multer = require('multer')

// use multer to allocate storage in the server itself to store images sent from the client side
// const storage = multer.diskStorage({
//     destination: './images',
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()} ${file.originalname}`);
//     }
// })

// use multer to handle file uploads and save it in memory
const storage = multer.memoryStorage();

// custom middleware to use in a specific route
const upload = multer({ storage })

module.exports = upload;