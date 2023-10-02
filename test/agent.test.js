const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Make sure this path is correct
const User = require('../models/user');
const Donation = require('../models/donation');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const expect = chai.expect;

// Helper function to create a test agent user
async function createTestAgent() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('testpassword', salt);
  const testAgent = new User({
    firstName: 'Test',
    lastName: 'Agent',
    email: 'testagent@example.com',
    password: hashedPassword,
    role: 'agent',
  });
  await testAgent.save();
  return testAgent;
}

describe('Agent Routes and Controllers', () => {
  let agent; // Store the test agent user

  before(async () => {
    agent = await createTestAgent();
  });

  after(async () => {
    // Clean up test data if needed
    await User.deleteMany({ email: 'testagent@example.com' });
  });

  describe('GET /agent/dashboard', () => {
    it('should render the agent dashboard page', async () => {
      const res = await chai.request(app)
        .get('/agent/dashboard')
        .set('Cookie', [`connect.sid=${agent.sessionID}`]); // Simulate agent login

      expect(res).to.have.status(200);
      // Add more assertions as needed
    });
  });

  describe('GET /agent/collections/pending', () => {
    it('should render the agent pending collections page', async () => {
      // Create a test donation for the agent with valid data
      const donation = new Donation({
        donor: agent._id, // Set a valid ObjectId here
        agent: agent._id,
        status: 'assigned',
        phone: '1234567890', // Add valid values for other required fields
        address: '123 Main St',
        cookingTime: new Date(),
        quantity: 5,
        foodType: 'Canned Goods',
        // Add other required fields
      });
      await donation.save();

      const res = await chai.request(app)
        .get('/agent/collections/pending')
        .set('Cookie', [`connect.sid=${agent.sessionID}`]); // Simulate agent login

      expect(res).to.have.status(200);
      // Add more assertions as needed
    });
  });

  describe('GET /agent/collection/view/:collectionId', () => {
    it('should render the collection details page', async () => {
      // Create a test donation for the agent with valid data
      const donation = new Donation({
        donor: agent._id, // Set a valid ObjectId here
        agent: agent._id,
        status: 'assigned',
        phone: '1234567890', // Add valid values for other required fields
        address: '123 Main St',
        cookingTime: new Date(),
        quantity: 5,
        foodType: 'Canned Goods',
        // Add other required fields
      });
      await donation.save();

      const res = await chai.request(app)
        .get(`/agent/collection/view/${donation._id}`)
        .set('Cookie', [`connect.sid=${agent.sessionID}`]); // Simulate agent login

      expect(res).to.have.status(200);
      // Add more assertions as needed
    });
  });

  describe('GET /agent/collection/collect/:collectionId', () => {
    it('should mark the collection as collected', async () => {
      // Create a test donation for the agent with valid data
      const donation = new Donation({
        donor: agent._id, // Set a valid ObjectId here
        agent: agent._id,
        status: 'assigned',
        phone: '1234567890', // Add valid values for other required fields
        address: '123 Main St',
        cookingTime: new Date(),
        quantity: 5,
        foodType: 'Canned Goods',
        // Add other required fields
      });
      await donation.save();

      const res = await chai.request(app)
        .get(`/agent/collection/collect/${donation._id}`)
        .set('Cookie', [`connect.sid=${agent.sessionID}`]); // Simulate agent login

      expect(res).to.have.status(200); // Expect a redirect after marking as collected
      // Add more assertions as needed
    });
  });

  // Add more test cases for other agent routes/controllers

});
