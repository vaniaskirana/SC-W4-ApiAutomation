//Endpoint ketiga /units
// 3 case (2 positive dan 1 negative)

const request = require("supertest");
const { expect } = require("chai");
const { getBearerToken } = require("./Login");

describe("Post and Put Category", () => {
  it("(+) Response message 'Category berhasil ditambahkan'", async () => {
    try {
      const bearerToken = await getBearerToken();
      //   console.log(bearerToken);

      // Positive Case 1
      const response = await request("https://kasir-api.belajarqa.com")
        .post("/categories")
        .set("Authorization", `Bearer ${bearerToken}`)
        .send({
          name: "Minuman",
          description: "No Alcohol",
        });

      expect(response.body.message).to.equal("Category berhasil ditambahkan");
    } catch (error) {
      console.error(error);
    }
  });

  it("(+) Response status '200'", async () => {
    try {
      const bearerToken = await getBearerToken();
      //   console.log(bearerToken);

      // Positive Case 1
      const getCategoriesId = await request("https://kasir-api.belajarqa.com")
        .get("/categories")
        .set("Authorization", `Bearer ${bearerToken}`);

      if (getCategoriesId.body.data.categories.length > 0) {
        const categoriesId = getCategoriesId.body.data.categories[0].id;
        const responseInvalid = await request("https://kasir-api.belajarqa.com")
          .put(`/categories/${categoriesId}`)
          .set("Authorization", `Bearer ${bearerToken}`)
          .send({
            name: "Minuman",
            description: "Tidak mengandung Alkohol",
          });

        expect(await responseInvalid.status).equal(200);
      }
    } catch (error) {
      console.error(error);
    }
  });
  it("(-) Response status '404' Not Found", async () => {
    try {
      const bearerToken = await getBearerToken();
      //   console.log(bearerToken);

      // Positive Case 1
      const getCategoriesId = await request("https://kasir-api.belajarqa.com")
        .get("/categories")
        .set("Authorization", `Bearer ${bearerToken}`);

      if (getCategoriesId.body.data.categories.length > 0) {
        const categoriesId = getCategoriesId.body.data.categories[0].id;
        const responseInvalid = await request("https://kasir-api.belajarqa.com")
          .put(`/categories/${categoriesId}99`)
          .set("Authorization", `Bearer ${bearerToken}`)
          .send({
            name: "Minuman",
            description: "Tidak mengandung Alkohol",
          });

        expect(await responseInvalid.status).equal(404);
      }
    } catch (error) {
      console.error(error);
    }
  });
});
