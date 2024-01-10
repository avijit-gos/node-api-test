/** @format */

const Products = require("../src/schema/product");
const mongoose = require("mongoose");
const { app } = require("../index");

const chai = require("chai");
const chaiHTTP = require("chai-http");
const should = chai.should();
const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHTTP);

describe("Teating Product API", () => {
  // beforeEach("Product", (done) => {
  //   Products.deleteMany().then(() => {
  //     done();
  //   });
  // });

  describe("/GET", () => {
    it("should return all products", (done) => {
      chai
        .request(app)
        .get("/api/product")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          done();
        });
    });
  });

  describe("/POST", () => {
    it("should create a new item", (done) => {
      const productData = {
        title: "Product ONE",
        description: "New product",
        price: 101,
      };
      chai
        .request(app)
        .post("/api/product")
        .send(productData)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");
          res.body.should.have.property("title");
          res.body.should.have.property("description");
          res.body.should.have.property("_id");
          done();
        });
    });
  });

  describe("/GET/:id", () => {
    it("should return an specific product", (done) => {
      const id = "659e29bcfb901d603d025a1c";
      chai
        .request(app)
        .get(`/api/product/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.an("object");
          res.body.should.have.property("title");
          res.body.should.have.property("description");
          res.body.should.have.property("_id");
          done();
        });
    });
  });

  describe("/PUT/:id", () => {
    it("should update product", (done) => {
      const updateData = {
        title: "New update title",
        description: "New description for product",
      };
      const id = "659e29bcfb901d603d025a1c";
      chai
        .request(app)
        .put(`/api/product/${id}`)
        .send(updateData)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an("object");
          res.body.should.have.property("msg");
          res.body.should.have.property("product");
          res.body.product.should.have.property("_id");
          res.body.product.should.have.property("title");
          res.body.product.should.have.property("description");
          done();
        });
    });
  });

  describe("/DELETE/:id", () => {
    it("should delete the existing product", (done) => {
      const id = "659e29bcfb901d603d025a1c";
      chai
        .request(app)
        .delete(`/api/product/${id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("msg");
          res.body.should.have.property("product");
          res.body.product.should.have.property("_id");
          res.body.product.should.have.property("title");
          res.body.product.should.have.property("description");
          done();
        });
    });
  });
});
