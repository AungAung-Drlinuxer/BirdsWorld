import Bird from '../models/Bird.js';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';

chai.should();
chai.use(chaiHttp);

describe('Birds', () => {
  beforeEach(async () => {
    await Bird.deleteMany({});
  });

  describe('/GET bird', () => {
    it('it should GET all the birds', async () => {
      const res = await chai.request(app).get('/api/birds');
      res.should.have.status(200);
      res.body.data.should.be.a('array');
      res.body.data.length.should.be.eql(0);
    });
  });

  describe('/POST bird', () => {
    it('it should new POST a bird', async () => {
      const bird = {
        name: 'POST bird',
        breed: 'Test breed',
        age: 1,
      };
      const res = await chai.request(app).post('/api/birds').send(bird);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.status.should.be.eql('success');
    });
  });

  describe('/GET/:id bird', () => {
    it('it should GET a bird by the id', async () => {
      const bird = new Bird({
        name: 'GET bird',
        breed: 'Test breed',
        age: 2,
      });
      await bird.save();
      const res = await chai.request(app).get('/api/birds/' + bird.id);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.status.should.be.eql('success');
    });
  });

  describe('/PUT/:id bird', () => {
    it('it should UPDATE a bird given the id', async () => {
      const bird = new Bird({
        name: 'PUT bird',
        breed: 'Test breed',
        age: 3,
      });
      await bird.save();
      const res = await chai
        .request(app)
        .put('/api/birds/' + bird.id)
        .send({
          name: 'PUT bird updated',
          breed: 'Test breed updated',
          age: 4,
        });
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.status.should.be.eql('success');
    });
  });

  describe('/DELETE/:id bird', () => {
    it('it should DELETE a bird given the id', async () => {
      const bird = new Bird({
        name: 'DELETE bird',
        breed: 'Test breed',
        age: 5,
      });
      await bird.save();
      const res = await chai.request(app).delete('/api/birds/' + bird.id);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.status.should.be.eql('success');
    });
  });
});