const { generateHelloWorld, getUserProfile } = require("../../src/services/home.service");

describe("Home service test", () => {

  it("should return 'Hello World' when generateHelloWorld executed", () => {
    const result = generateHelloWorld()

    expect(result).toBe('Hello World')
  });

  it("Should return user with id 1 when getUserProfile executed", () => {
    const result = getUserProfile()

    expect(result?.id).toBe(1)
  })

})
