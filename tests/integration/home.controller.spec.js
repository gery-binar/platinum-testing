const supertest = require('supertest');
const { server } = require('../../src/server');

describe("Home controller testing", () => {

  it("should return http with status 200 with message 'Hello World'", () => {
    // method chaining
    supertest(server)
      .get('/')
      .expect(200)
      .then((res) => {
        expect(res.body.message).toBe("Hello World")
      })
  })

})


/**
 * Membuat 1 unit test (harus service yang berbeda)
 * dan 1 integration test (harus routing yang berbeda)
 */
