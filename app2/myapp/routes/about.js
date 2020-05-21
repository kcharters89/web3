let express = require('express');
let router = express.Router();
const aboutController = require('../controllers/about');
/* GET users listing. */
router.get('/', aboutController.index);

module.exports = router;