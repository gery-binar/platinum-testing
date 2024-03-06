const supertest = require('supertest');
const { server } = require('../../src/server');
const shell = require('shelljs');
const db = require('../../src/models');
shell.config.silent = true

describe("Auth controller testing", () => {

  beforeEach(() => {
    // migrasi database
    shell.exec('npx sequelize-cli db:migrate')
  })

  afterEach(() => {
    // delete semua table
    shell.exec('npx sequelize-cli db:migrate:undo:all')
  })

  it("should insert user data into database if registration success", () => {
    supertest(server)
      .post('/auth/register')
      .send({
        email: "gery@test.com",
        password: "1234"
      })
      .expect(200)
      .end()
  })

  it("should not insert user data into database if email already taken", async () => {

    await db.User.create({
      email: "gery@test.com",
      password: "testing"
    })

    supertest(server)
      .post('/auth/register')
      .send({
        email: "gery@test.com",
        password: "1234"
      })
      .expect(422)
      .end()
  })

})


// SETIAP MENJALANKAN TEST CASE,
// DATABASE HARUS DI HAPUS, DAN DI MIGRASI KEMBALI

// 1. pastikan database anda harus fresh di setiap use case
// 2. 'seed' database anda sesuai dgn use case yang mau anda coba
// 3. hit api menggunakan supertest
// 4. assert use case kamu, bisa cek database atau cek response dari api

// SETUP JEST
// beforeAll -> fungsi yang akan di jalan kan sekali sebelum semua use case di 'describe' di jalankan
// beforeEach -> fungsi yang akan di jalankan setiap saat sebelum use case di jalankan

// TEARDOWN JEST
// afterAll -> fungsi yang akan di jalan kan sekali setelah semua use case di 'describe' di jalankan
// afterEach -> fungsi yang akan di jalankan setiap saat setelah use case di jalankan
