const request = require("supertest");
const app = require("../app");
const seed = require("../db/seed");
const db = require("../db/connection");
const data = require("../db/data/test/index");
const {
  propertyTypesData,
  usersData,
  reviewsData,
  propertiesData,
  favouritesData,
} = data;

beforeEach(() => {
  return seed(
    propertyTypesData,
    usersData,
    propertiesData,
    reviewsData,
    favouritesData
  );
});

afterAll(() => {
  db.end();
});

describe("app", () => {
  describe("GET - /api/properties", () => {
    test("returns status 200", async () => {
      await request(app).get("/api/properties").expect(200);
    });
    test("returns array of objects of properties with property_id, name, location, price_per_night, host", async () => {
      const { body } = await request(app).get("/api/properties").expect(200);
      expect(Array.isArray(body.properties)).toBe(true);
      expect(body.properties.length > 0).toBe(true);
      body.properties.forEach((property) => {
        expect(Object.hasOwn(property, "property_id")).toBe(true);
        expect(Object.hasOwn(property, "name")).toBe(true);
        expect(Object.hasOwn(property, "location")).toBe(true);
        expect(Object.hasOwn(property, "price_per_night")).toBe(true);
        expect(Object.hasOwn(property, "host")).toBe(true);
      });
    });
  });
  describe("GET - /api/properties/:id", () => {
    test("returns status 200, and returns an object of the property with the specified ID", async () => {
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
  describe("GET - /api/properties?property_type=<property type>", () => {
    test("returns status 200 and returns array of objects of properties with property_type specified", async () => {
      const { body } = await request(app)
        .get("/api/properties?property_type=House")
        .expect(200);

      expect(Array.isArray(body.properties)).toBe(true);
      expect(body.properties.length > 0).toBe(true);
      expect(body.properties).toEqual([
        {
          property_id: 7,
          name: "Spacious Countryside House",
          location: "Yorkshire, UK",
          price_per_night: "200",
          host: "Isabella Martinez",
        },
        {
          property_id: 2,
          name: "Cosy Family House",
          location: "Manchester, UK",
          price_per_night: "150",
          host: "Alice Johnson",
        },
        {
          property_id: 10,
          name: "Quaint Cottage in the Hills",
          location: "Lake District, UK",
          price_per_night: "180",
          host: "Isabella Martinez",
        },
      ]);
    });
  });
  describe("GET - /api/properties?maxprice=<max cost per night>&minprice=<min cost per night>", () => {
    test("returns array of objects of properties with max price or min price as specified", async () => {
      const { body } = await request(app)
        .get("/api/properties?maxprice=200")
        .expect(200);
      expect(Array.isArray(body.properties)).toBe(true);
      expect(body.properties.length > 0).toBe(true);
    });
  });
  describe("GET - /api/properties/:id/reviews", () => {
    test("returns status 200, and returns an array of the reviews of the property with the specified ID", async () => {
      const { body } = await request(app)
        .get("/api/properties/1/reviews")
        .expect(200);
      expect(body.reviews.length > 0).toBe(true);
      expect(body.reviews).toEqual([
        {
          review_id: 8,
          comment: "Comment about Modern Apartment in City Center",
          rating: 3,
          created_at: "2025-02-28T08:30:00.000Z",
          guest: "Rachel Cummings",
          guest_avatar: "https://example.com/images/rachel.jpg",
        },
        {
          review_id: 2,
          comment: "Comment about Modern Apartment in City Center",
          rating: 2,
          created_at: "2024-04-12T13:45:00.000Z",
          guest: "Bob Smith",
          guest_avatar: "https://example.com/images/bob.jpg",
        },
      ]);
    });
  });
  describe("GET - /api/users/:id", () => {
    test("returns status 200 and returns an object of user specified", async () => {
      const { body } = await request(app).get("/api/users/3").expect(200);
      expect(typeof body.user === "object").toBe(true);
    });
  });
  describe("POST - /api/properties/:id/reviews", () => {
    test("returns status 201 and returns an object of user specified with properties review_id, property_id, guest_id, rating, comment, created_at", async () => {
      const newReview = {
        guest_id: 2,
        rating: 5,
        comment: "Wonderful experience!!!",
      };
      const { body } = await request(app)
        .post("/api/properties/2/reviews")
        .send(newReview)
        .expect(201);
      expect(typeof body.new_review === "object").toBe(true);
      expect(Object.keys(body.new_review)).toEqual([
        "review_id",
        "property_id",
        "guest_id",
        "rating",
        "comment",
        "created_at",
      ]);
    });
  });
  describe("DELETE - /api/reviews/:id", () => {
    test("returns status 204 and returns no body", async () => {
      const newReview = {
        guest_id: 2,
        rating: 5,
        comment: "Wonderful experience!!!",
      };
      const { body } = await request(app)
        .delete("/api/reviews/18")
        .send("18")
        .expect(204);
    });
  });
});
