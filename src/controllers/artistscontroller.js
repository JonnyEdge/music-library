const Artist = require('../models/artistsmodel');
const Album = require('../models/albumsmodel');

exports.createArtist = (request, response) => {
  const artist = new Artist({
    name: request.body.name,
    genre: request.body.genre,
  });

  artist.save().then(() => {
    response.status(201).json(artist);
  });
};

exports.list = (request, response) => {
  Artist.find({}, (error, documents) => {
    response.status(200).json(documents);
  });
};

exports.listID = (request, response) => {
  Artist.findById(request.params.artistId, (error, artist) => {
    if (error) {
      response.status(404).json({ error: 'The artist could not be found.' });
    }
    response.status(200).json(artist);
  });
};

exports.amend = (request, response) => {
  Artist.findById(request.params.artistId, (error, artist) => {
    if (error) {
      response.status(404).json({ error: 'The artist could not be found.' });
    } else {
      artist.set({
        name: request.body.name,
        genre: request.body.genre,
      });

      artist.save((updateErr, artistUpdated) => {
        if (updateErr) {
          response.json('Could not update.');
        } else {
          response.status(200).json(artistUpdated);
        }
      });
    }
  });
};

exports.delete = (request, response) => {
  Artist.findByIdAndDelete(request.params.artistId, (error, artist) => {
    if (error) {
      response.status(404).json({ error: 'The artist could not be found.' });
    } else {
      response.status(204).json({ message: 'Artist deleted successfully.' });
    }
  });
};

exports.createAlbum = (request, response) => {
  Artist.findById(request.params.artistId, (error, artist) => {
    if (error) {
      response.status(404).json({ error: 'The artist could not be found.' });
    } else {
      const album = new Album({
        artist,
        name: request.body.name,
        year: request.body.year,
      });

      album.save((createErr, createdAlbum) => {
        if (createErr) {
          response.json('Could not create an album.');
        } else {
          response.status(201).json(createdAlbum);
        }
      });
    }
  });
};

module.exports = exports;
