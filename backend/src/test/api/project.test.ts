//@ts-nocheck
const expect = require("chai").expect;
const request = require("supertest");
// import { request } from "express";
import app, { DB_URI_TEST } from "../../app";
// const app = require("../../app");
const connection = require("../../utils/connect");

describe("POST /projects", () => {
  before((done) => {
    connection
      .connect(DB_URI_TEST)
      .then(() => {
        done();
      })
      .catch((err) => done(err));
  });

  after((done) => {
    connection
      .close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, creating a new project", (done) => {
    request(app)
      .post("/projects")
      .set({
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmQ4OGM3NjZlNTI5NWI5MDFmZDYzZSIsImlhdCI6MTYxMDQ1MTE0M30.YrpTdual9sBpVCdRuBxy9Eg3kucGE9XE89MWVVwSfJc",
      })
      .send({
        name: "Project1",
        userId: "1231dfqaasf",
        settings: { data: "123sf" },
        createdOn: new Date().toISOString(),
        lastModifiedOn: new Date().toISOString(),
      })
      .then((res) => {
        const body = res.body;
        expect(body).to.contain.property("_id");
        expect(body).to.contain.property("name");
        done();
      });
    // request(app)
    //   .post("/projects")
    //   .send({ name: "NOTE", email: "taras.liush@gmail.com" })
    //   .then((res) => {
    //     const body = res.body;
    //     expect(body).to.contain.property("_id");
    //     expect(body).to.contain.property("name");
    //     expect(body).to.contain.property("email");
    //     done();
    //   })
    //   .catch((err) => done(err));
  });
});
