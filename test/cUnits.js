//Endpoint ketiga /units
// 3 case (2 positive dan 1 negative)

const request = require("supertest");
const { expect } = require("chai");
const { getBearerToken } = require("./Login");

describe("Post Units", () => {
  it("(+) Response message Unit berhasil ditambahkan", async () => {
    //dapetin bearer tokennya dulu sebelum get users
    // const postToken = await request("https://kasir-api.belajarqa.com")
    //   .post("/authentications")
    //   .send({
    //     email: "sanbervania@gmail.com",
    //     password: "vania123@",
    //   });

    // const bearerToken = postToken.body.data.accessToken;

    //nyoba make Login
    try {
      const bearerToken = await getBearerToken();
      // console.log(bearerToken);

      // Positive Case 1
      const response = await request("https://kasir-api.belajarqa.com")
        .post("/units")
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({
          name: "kilo gram",
          description: "weight measurement",
        });

      expect(response.body.message).to.equal("Unit berhasil ditambahkan");
    } catch (error) {
      console.error(error);
    }
  });

  it("(+) Response body status delete the newest Unit by id[0] 'success'", async () => {
    //dapetin bearer tokennya dulu sebelum post new users
    const postToken = await request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        email: "sanbervania@gmail.com",
        password: "vania123@",
      });

    const bearerToken = postToken.body.data.accessToken;

    const getUnitsId0 = await request("https://kasir-api.belajarqa.com")
      .get("/units")
      .set("Authorization", `Bearer ${bearerToken}`);

    //Positive Case 2
    if (getUnitsId0.body.data.units.length > 0) {
      const unitsId = getUnitsId0.body.data.units[0].id;
      const response = await request("https://kasir-api.belajarqa.com")
        .delete(`/units/${unitsId}`)
        .set("Authorization", `Bearer ${bearerToken}`);

      expect(await response.body.status).equal("success");
    } else {
      console.error("Data tidak ditemukan");
    }
  });

  it("(-) Response status delete Unit by Invalid Id '404'", async () => {
    //dapetin bearer tokennya dulu sebelum get users
    const postToken = await request("https://kasir-api.belajarqa.com")
      .post("/authentications")
      .send({
        email: "sanbervania@gmail.com",
        password: "vania123@",
      });

    const bearerToken = postToken.body.data.accessToken;

    //Negative Case 1
    await request("https://kasir-api.belajarqa.com")
      .post("/units")
      .set("Authorization", `Bearer ${bearerToken}`)
      .send({
        name: "kilo gram",
        description: "weight measurement",
      });
    const getUnitsIdvalid = await request("https://kasir-api.belajarqa.com")
      .get("/units")
      .set("Authorization", `Bearer ${bearerToken}`);
    //Negative Case 1
    if (getUnitsIdvalid.body.data.units.length > 0) {
      const unitsId = getUnitsIdvalid.body.data.units[0].id;

      const responseInvalid = await request("https://kasir-api.belajarqa.com")
        .delete(`/units/${unitsId}99`)
        .set("Authorization", `Bearer ${bearerToken}`);

      expect(await responseInvalid.status).equal(404);

      //Case Post ini tetap ku hapus agar tidak terjadi spam jika ingin mencoba dilain hari, namun expect yang negative sebenarnya ada di atas
      await request("https://kasir-api.belajarqa.com")
        .delete(`/units/${unitsId}`)
        .set("Authorization", `Bearer ${bearerToken}`);
    } else {
      console.error("Data tidak ditemukan");
    }
  });
});
