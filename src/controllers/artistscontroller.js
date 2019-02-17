const Artist = require('../models/artistsmodel');
const Album = require('../models/albumsmodel');
const Song = require('../models/songsmodel');

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

exports.createSong = (request, response) => {
  Album.findById(request.params.albumId, (albumNotFoundErr, album) => {
    if (albumNotFoundErr) {
      response.status(404).json('Album does not exist');
    } 
    Artist.findById(request.body.artistId, (artistNotFoundErr, artist) => {
      if (artistNotFoundErr) {
        response.status(404).json('Artist does not exist');
      } else {
        const song = new Song({
          name: request.body.name,
          artist,
          album,
        });

        song.save((createErr, createdSong) => {
          if (createErr) {
            response.status(404).json('Could not create a song.');
          } else {
            response.status(201).json(createdSong);
          }
        });
      }
    });
  });
};

exports.getAlbums = (request, response) => {
  Album.find({ artist: request.params.artistId }).populate('artist').exec((error, albums) => {
    if (error) {
      response.json('Unable to retrieve albums');
    }

    response.json(albums);
  });
};

module.exports = exports;
