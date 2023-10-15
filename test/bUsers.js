//Endpoint kedua /users
// 3 case (2 positive dan 1 negative)

const request = require("supertest");
const { expect } = require("chai");

describe("Get Users", () => {
  it("(+) Response status is 200", async () => {
    //dapetin bearer tokennya dulu sebelum get users
    const postToken = await request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        email: "sanbervania@gmail.com",
        password: "vania123@",
      });
    //bearer token disimpan
    const bearerToken = postToken.body.data.accessToken;

    //Positive Case 1
    const respons = await request("https://kasir-api.belajarqa.com")
      .get("/users")
      .set("Authorization", `Bearer ${bearerToken}`);
    // console.log(await JSON.stringify(respons.body));

    expect(await respons.status).equal(200);
  });

  it("(+) Response status is success", async () => {
    const postToken = await request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        email: "sanbervania@gmail.com",
        password: "vania123@",
      });

    const bearerToken = postToken.body.data.accessToken;

    //Positive Case 2
    const getUserid0 = await request("https://kasir-api.belajarqa.com")
      .get("/users")
      .set("Authorization", `Bearer ${bearerToken}`);

    if (getUserid0.body.data.users.length > 0) {
      //   array 0 user id disimpan
      const userId = getUserid0.body.data.users[0].id;

      const getUsersbyId = await request("https://kasir-api.belajarqa.com")
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${bearerToken}`);

      expect(await getUsersbyId.status).equal(200);
    } else {
      console.error("Data tidak ditemukan");
    }
  });

  it("(-) Response status is 404 (Not Found)", async () => {
    const postToken = await request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        email: "sanbervania@gmail.com",
        password: "vania123@",
      });

    const bearerToken = postToken.body.data.accessToken;

    //Negative case 1
    const getUserid99 = await request("https://kasir-api.belajarqa.com")
      .get("/users")
      .set("Authorization", `Bearer ${bearerToken}`);

    if (getUserid99.body.data.users.length > 0) {
      const userId = getUserid99.body.data.users[0].id;

      const getUsersbyId = await request("https://kasir-api.belajarqa.com")
        .get(`/users/${userId}99`)
        .set("Authorization", `Bearer ${bearerToken}`);

      expect(await getUsersbyId.status).equal(404);
    } else {
      console.error("Data tidak ditemukan");
    }
  });
});
