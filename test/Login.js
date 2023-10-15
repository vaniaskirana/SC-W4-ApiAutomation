const request = require("supertest");

// Mendefinisikan fungsi untuk mendapatkan bearerToken
async function getBearerToken() {
  const postToken = await request("https://kasir-api.belajarqa.com")
    .post("/authentications")
    .send({
      email: "sanbervania@gmail.com",
      password: "vania123@",
    });

  return postToken.body.data.accessToken;
}

module.exports = {
  getBearerToken,
};
