/** @format */

const { app } = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const should = chai.should();
chai.use(chaiHttp);

describe("/register", () => {
  it("should create a new user", (done) => {
    const userData = {
      name: "Account Three",
      email: "account_three@test.com",
      password: "123",
    };
    chai
      .request(app)
      .post("/api/user/register")
      .send(userData)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property("user");
        res.body.should.have.property("token");
        res.body.user.should.have.property("_id");
        res.body.user.should.have.property("name");
        res.body.user.should.have.property("email");
        done();
      });
  });
});
