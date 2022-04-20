const express = require('express')

const router = express.Router()

const {getVideo,
    searchVideo,} = require('../controllers/video.controller')

router.route('/search').get(searchVideo)
router.route('/').get(getVideo)

module.exports = router