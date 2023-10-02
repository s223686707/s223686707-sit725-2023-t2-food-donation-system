const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Make sure this path is correct

chai.use(chaiHttp);

const expect = chai.expect;

describe('Home Routes and Controllers', () => {
  describe('GET /', () => {
    it('should render the welcome page', async () => {
      const res = await chai.request(app)
        .get('/');

      expect(res).to.have.status(200);
      // Add assertions for the welcome page content if needed
    });
  });

  describe('GET /home/about-us', () => {
    it('should render the About Us page', async () => {
      const res = await chai.request(app)
        .get('/home/about-us');

      expect(res).to.have.status(200);
      // Add assertions for the About Us page content if needed
    });
  });

  describe('GET /home/mission', () => {
    it('should render the Mission page', async () => {
      const res = await chai.request(app)
        .get('/home/mission');

      expect(res).to.have.status(200);
      // Add assertions for the Mission page content if needed
    });
  });

  describe('GET /home/contact-us', () => {
    it('should render the Contact Us page', async () => {
      const res = await chai.request(app)
        .get('/home/contact-us');

      expect(res).to.have.status(200);
      // Add assertions for the Contact Us page content if needed
    });
  });

  // You can add more test cases for other home routes/controllers if needed

});