const express = require('express');
const HistoryYmlController = require('../controllers/history-yml-controller');
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.post('/upload', upload.single('file'),  HistoryYmlController.uploadYml);

module.exports = router;
