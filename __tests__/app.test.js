const request = require("supertest");
const app = require("../app");
const seed = require("../db/seed");
const db = require("../db/connection");

beforeEach(() => {
  seed(propertyTypes, users, properties, reviews, favourites);
});

afterAll(() => {
  db.end();
});

describe("app", () => {
  test("returns status 404 and responds with a path-not-found message when path is non-existent", async () => {
    const { body } = await request(app).get("/non-existent-path").expect(404);
    expect(body.msg).toBe("Path not found");
  });
  describe("GET - /api/properties", () => {
    test("returns status 200", async () => {
      await request(app).get("/api/properties").expect(200);
    });
    test("returns array of objects of properties with properties details", async () => {
      const { body } = await request(app).get("/api/properties").expect(200);
      expect(Array.isArray(body.properties)).toBe(true);
      body.properties.foreEach((property) => {
        expect(property.hasOwn("property_id")).toBe(true);
        expect(property.hasOwn("name")).toBe(true);
        expect(property.hasOwn("location")).toBe(true);
        expect(property.hasOwn("price_per_night")).toBe(true);
        expect(property.hasOwn(host)).toBe(true);
      });
    });
  });
  describe("GET - /api/properties/:id", () => {
    test("returns status 200 with an object for the property with the specified ID", async () => {
      const { body } = await request(app).get("/api/properties/1").expect(200);
      expect(body.property).toBe({});
    });
  });
});
