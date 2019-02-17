const mongoose = require('mongoose');
const Artist = require('../src/models/artistsmodel');


describe('/songs', () => {
  let artist;

  beforeEach((done) => {
    Artist.create({
      name: 'Tame Impala',
      genre: 'Rock',
    }, (error, document) => {
      artist = document;
      done();
    });
  });

  afterEach((done) => {
    mongoose.connection.dropDatabase(() => {
      done();
    });
  });

  describe('GET /artist/:artistId/songs', () => {
    it('gets artist songs by artist id', (done) => {
      chai.request(server)
        .get(`/artists/${artist._id}`)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          expect(res.body.name).to.equal(artist.name);
          expect(res.body.genre).to.equal(artist.genre);
          expect(res.body.song).to.equal(artist.song);

          done();
        });
    });

    it('returns a 404 if the song does not exist', (done) => {
      chai.request(server)
        .get('/artists/:artistId/songs')
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The song could not be found.');
          done();
        });
    });
  });
  
  describe('PATCH /artists/:artistId/songs', () => {
    it('updates artist song by artist id', (done) => {
      chai.request(server)
        .patch(`/artists/${artist._id}`)
        .send({ songs: 'Psychedelic Rock' })
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.status).to.equal(200);
          Artist.findById(artist._id, (error, updatedArtist) => {
            expect(updatedArtist.genre).to.equal('Psychedelic Rock');
            done();
          });
        });
    });
  });
});