/** @format */
const setupToken = require("./setup");
const { app } = require("../index");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { describe } = require("mocha");
const should = chai.should();

chai.use(chaiHttp);

describe("Testing user APIS", () => {
  describe("/:id", () => {
    it("should return user details", (done) => {
      const id = "659f93b4b0dc455c8f7175bf";
      chai
        .request(app)
        .get(`/api/user/${id}`)
        .set(
          "x-access-token",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmOTNiNGIwZGM0NTVjOGY3MTc1YmYiLCJuYW1lIjoiQWNjb3VudCBGb3VyIiwiZW1haWwiOiJhY2NvdW50X2ZvdXJAdGVzdC5jb20iLCJpYXQiOjE3MDQ5NTY4NTIsImV4cCI6MTcwNzU0ODg1Mn0.S6BKSJXB8gtCUZs7uQWARZnWQUeCjxmvWLB_Y6Yuulg"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("_id");
          res.body.should.have.property("name");
          res.body.should.have.property("email");
          res.body.should.be.an("object");
          done();
        });
    });
  });

  describe("/update/:id", () => {
    it("should update user profile details", (done) => {
      const id = "659f93b4b0dc455c8f7175bf";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmOTNiNGIwZGM0NTVjOGY3MTc1YmYiLCJuYW1lIjoiQWNjb3VudCBGb3VyIiwiZW1haWwiOiJhY2NvdW50X2ZvdXJAdGVzdC5jb20iLCJpYXQiOjE3MDQ5NTY4NTIsImV4cCI6MTcwNzU0ODg1Mn0.S6BKSJXB8gtCUZs7uQWARZnWQUeCjxmvWLB_Y6Yuulg";
      chai
        .request(app)
        .put(`/api/user/update/${id}`)
        .set("x-access-token", token)
        .send({ name: "Update name" })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("msg");
          res.body.should.have.property("user");
          res.body.user.should.have.property("_id");
          res.body.user.should.have.property("name");
          res.body.user.should.have.property("email");
          done();
        });
    });
  });

  describe("/delete/:id", () => {
    it("should delete user profile", (done) => {
      const id = "659f93b4b0dc455c8f7175bf";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTlmOTNiNGIwZGM0NTVjOGY3MTc1YmYiLCJuYW1lIjoiQWNjb3VudCBGb3VyIiwiZW1haWwiOiJhY2NvdW50X2ZvdXJAdGVzdC5jb20iLCJpYXQiOjE3MDQ5NTY4NTIsImV4cCI6MTcwNzU0ODg1Mn0.S6BKSJXB8gtCUZs7uQWARZnWQUeCjxmvWLB_Y6Yuulg";
      chai
        .request(app)
        .delete(`/api/user/${id}`)
        .set("x-access-token", token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("msg");
          res.body.user.should.have.property("_id");
          res.body.user.should.have.property("name");
          res.body.user.should.have.property("email");
          done();
        });
    });
  });
});
