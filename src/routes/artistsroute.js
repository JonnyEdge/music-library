const express = require('express');
const artistController = require('../controllers/artistscontroller');

const router = express.Router();

router.post('/artists', artistController.createArtist);
router.get('/artists', artistController.list);
router.get('/artists/:artistId', artistController.listID);
router.patch('/artists/:artistId', artistController.amend);
router.delete('/artists/:artistId', artistController.delete);
router.post('/artists/:artistId/albums', artistController.createAlbum);
router.post('/albums/:albumId/songs', artistController.createSong);

module.exports = router;
