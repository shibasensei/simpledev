const chai = require("chai");
const chaiHttp = require("chai-http");

const server = require("../server");

chai.should();

chai.use(chaiHttp);

describe("Test user routes",()=>{

    describe("GET /users",()=>{
        it("Should get all users",(done)=>{
            chai.request(server)
            .get("/users")
            .end( (err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("array");
                //console.log(res.body)
                done();
            })
        })
    });

    describe("GET /users/:id",()=>{
        const id = "606b5f006ccab7a7b7abfd7c";
        it("Should get 1 user",(done)=>{
            chai.request(server)
            .get("/users/"+id)
            .end( (err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("username");
                res.body.should.have.property("email");
                res.body.should.have.property("role");
                res.body.should.have.property("id");
                console.log(res.body)
                //console.log(res.body)
                done();
            })
        })
    });

});