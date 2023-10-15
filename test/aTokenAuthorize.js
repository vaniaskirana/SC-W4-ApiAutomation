//Endpoint pertama /authentications
// 2 case (positive dan negative)

const request = require("supertest");
const { expect } = require("chai");

// Positive testcase
//Post Token Authorize Bearer
describe("Post Token Authorize Bearer", () => {
  it("(+) Response status is 201 with valid data", async () => {
    const response = await request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        email: "sanbervania@gmail.com",
        password: "vania123@",
      });

    //ini bisa dilakukan untuk melakukan sebuah debug ^^
    // console.log(await JSON.stringify(response.body));

    //Chai -> kodingan untuk expect/should https://www.chaijs.com/api/bdd/
    expect(await response.status).equal(201);
  });

  //   ----------------------------
  //   Negative testcase
  /*disini kita input invalid data pada isi send, namun tetap hasilnya HARUS sesuai dengan expect error API nya, kalau
  tidak sesuai nanti dia masuknya ke FAIL dan ini bukan negative test, melainkan failed test case*/
  it("(-) Response message is 'Kredensial yang Anda berikan salah'", async () => {
    const response = await request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        email: "vania@gmail.com",
        password: "vania123@",
      });
    expect(await response.body.message).equal(
      "Kredensial yang Anda berikan salah"
    );
  });
});
