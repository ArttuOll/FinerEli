const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../index");

const should = chai.should();
chai.use(chaiHttp);

describe("Food Component Search", () => {
  describe("GET food components", () => {
    it("should return 74 components", (done) => {
      chai.request(server).get("/food/1").end((error, result) => {
        result.should.have.status(200);
        result.should.be.an("object");
        should.exist(result.body);
        result.body.result.length.should.be.eql(74);
        done(error);
      });
    });
  });

  describe("Empty query", () => {
    it("should return 0 components and an error message", (done) => {
      chai.request(server).get("/food/").end((error, result) => {
        result.should.have.status(400);
        result.should.be.an("object");
        should.exist(result.body);
        should.exist(result.body.message);
        result.body.message.should.be.eql("Search query cannot be empty!");
        done(error);
      });
    });
  });
});
