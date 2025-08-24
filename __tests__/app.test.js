const request = require("supertest");
const app = require("../app");
// const seed = require("../db/seed");
// const db = require("../db/connection");
// const data = require("../db/data/test/index");
// const {
//   propertyTypesData,
//   usersData,
//   reviewsData,
//   propertiesData,
//   favouritesData,
// } = data;

// beforeEach(() => {
//   return seed(
//     propertyTypesData,
//     usersData,
//     propertiesData,
//     reviewsData,
//     favouritesData
//   );
// });

// afterAll(() => {
//   db.end();
// });

describe("app", () => {
  describe("GET - /api/properties", () => {
    test("returns status 200", async () => {
      await request(app).get("/api/properties").expect(200);
    });
    test("returns array of objects of properties with properties details", () => {
      return request(app)
        .get("/api/properties")
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body.properties)).toBe(true);
          expect(res.body.properties.length > 0).toBe(true);
          res.body.properties.forEach((property) => {
            expect(Object.hasOwn(property, "property_id")).toBe(true);
            expect(Object.hasOwn(property, "name")).toBe(true);
            expect(Object.hasOwn(property, "location")).toBe(true);
            expect(Object.hasOwn(property, "price_per_night")).toBe(true);
            expect(Object.hasOwn(property, "host")).toBe(true);
          });
        });
    });
  });
  describe("GET - /api/properties/:id", () => {
    test("returns status 200 with an object for the property with the specified ID", async () => {
      const { body } = await request(app).get("/api/properties/2").expect(200);
      expect(body.property).toEqual({
        property_id: 2,
        property_name: "Cosy Family House",
        location: "Manchester, UK",
        price_per_night: "150",
        description: "Description of Cosy Family House.",
        host: "Alice Johnson",
        host_avatar: "https://example.com/images/alice.jpg",
        favourite_count: "4",
      });
    });
  });
});
