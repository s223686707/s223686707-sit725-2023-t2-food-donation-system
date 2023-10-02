const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Make sure this path is correct
const User = require('../models/user');
const Donation = require('../models/donation');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);

const expect = chai.expect;

// Helper function to create a test admin user
async function createTestAdmin() {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync('testpassword', salt);
  const testAdmin = new User({
    firstName: 'Test',
    lastName: 'Admin',
    email: 'testadmin@example.com',
    password: hashedPassword,
    role: 'admin',
  });
  await testAdmin.save();
  return testAdmin;
}

describe('Admin Routes and Controllers', () => {
  let admin; // Store the test admin user

  before(async () => {
    admin = await createTestAdmin();
  });

  after(async () => {
    // Clean up test data if needed
    await User.deleteMany({ email: 'testadmin@example.com' });
  });

  describe('GET /admin/dashboard', () => {
    it('should render the admin dashboard page', async () => {
      const res = await chai.request(app)
        .get('/admin/dashboard')
        .set('Cookie', [`connect.sid=${admin.sessionID}`]); // Simulate admin login

      expect(res).to.have.status(200);
      // Add assertions for dashboard content if needed
    });
  });

  describe('GET /admin/donations/pending', () => {
    it('should render the admin pending donations page', async () => {
      const res = await chai.request(app)
        .get('/admin/donations/pending')
        .set('Cookie', [`connect.sid=${admin.sessionID}`]); // Simulate admin login

      expect(res).to.have.status(200);
      // Add assertions for pending donations content if needed
    });
  });

  describe('GET /admin/donations/previous', () => {
    it('should render the admin previous donations page', async () => {
      const res = await chai.request(app)
        .get('/admin/donations/previous')
        .set('Cookie', [`connect.sid=${admin.sessionID}`]); // Simulate admin login

      expect(res).to.have.status(200);
      // Add assertions for previous donations content if needed
    });
  });

  // Add more test cases for other admin routes/controllers

});