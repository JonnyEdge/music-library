const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  name: String,
  year: Number,
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
  },
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
