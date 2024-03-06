/**
 * 1. Hanya boleh berisikan business logic
 * 2. TIDAK BOLEH MENGAKSES OBJECT req dan res secara langsung di sini
 */
const generateHelloWorld = () => {
  return "Hello World"
}

const getUserProfile = () => {
  return {
    id: 1,
    name: 'testing',
  }
}

module.exports = {
  generateHelloWorld,
  getUserProfile,
}
