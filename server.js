// const jsonServer = require('json-server');
// const bodyParser = require('body-parser');
// const cors = require("cors");
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const multer = require('multer');
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, 'public/uploads')
//   },
//   filename: (req, file, callback) => {
//     callback(null, file.originalname);
//   }
// });
// const uploader = multer({storage:storage, limits: {fileSize: 5}});
// const low = require('lowdb');
// const FileSync = require('lowdb/adapters/FileSync');
// const adapter = new FileSync('db.json');
// const db = low(adapter);
// // Set default middlewares (logger, static, cors and no-cache)
// server.use(middlewares);
// server.use(jsonServer.bodyParser)
// server.use(bodyParser.urlencoded({
//   extended: false
// }));
// server.use(cors());

// server.post('/upload_page', uploader.array('imgs'), (req, res, next) => {
//   res.redirect('/');
// })

// // Use default router
// server.use(router);
// server.listen(3000, () => {
//   console.log('JSON Server is running')
// });
// module.exports = router;