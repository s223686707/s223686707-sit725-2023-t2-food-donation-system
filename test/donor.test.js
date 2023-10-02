const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Make sure this path is correct
const User = require('../models/user');
const Donation = require('../models/donation');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const expect = chai.expect;

// Helper function to create a test donor user
async function createTestDonor() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('testpassword', salt);
  const testDonor = new User({
    firstName: 'Test',
    lastName: 'Donor',
    email: 'testdonor@example.com',
    password: hashedPassword,
    role: 'donor',
  });
  await testDonor.save();
  return testDonor;
}

describe('Donor Routes and Controllers', () => {
  let donor; // Store the test donor user

  before(async () => {
    donor = await createTestDonor();
  });

  after(async () => {
    // Clean up test data if needed
    await User.deleteMany({ email: 'testdonor@example.com' });
  });

  describe('GET /donor/dashboard', () => {
    it('should render the donor dashboard page', async () => {
      const res = await chai.request(app)
        .get('/donor/dashboard')
        .set('Cookie', [`connect.sid=${donor.sessionID}`]); // Simulate donor login

      expect(res).to.have.status(200);
      //expect(res.text).to.include('Dashboard');
    });
  });

  describe('GET /donor/donate', () => {
    it('should render the donation form page', async () => {
      const res = await chai.request(app)
        .get('/donor/donate')
        .set('Cookie', [`connect.sid=${donor.sessionID}`]); // Simulate donor login

      expect(res).to.have.status(200);
      // Add more assertions as needed
    });
  });

  describe('POST /donor/donate', () => {
    it('should submit a donation request', async () => {
      const res = await chai.request(app)
        .post('/donor/donate')
        .set('Cookie', [`connect.sid=${donor.sessionID}`]) // Simulate donor login
        .send({
          donation: {
            foodType: 'Non-perishable',
            quantity: '5',
            cookingTime: '2023-10-30T08:00:00Z',
            address: '123 Main St',
            phone: '1234567890',
          },
        });

      expect(res).to.have.status(200); // Expect a redirect after submitting the form
      // Add more assertions as needed
    });
  });

  describe('GET /donor/donations/pending', () => {
    it('should render the pending donations page', async () => {
      const res = await chai.request(app)
        .get('/donor/donations/pending')
        .set('Cookie', [`connect.sid=${donor.sessionID}`]); // Simulate donor login

      expect(res).to.have.status(200);
      // Add more assertions as needed
    });
  });

  // Add more test cases for other donor routes/controllers

});