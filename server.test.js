const server = require("./server.js");

// Start application before running the test case
beforeAll((done) => {
  server.events.on("start", () => {
    done();
  });
});

// Stop application after running the test case
afterAll((done) => {
  server.events.on("stop", () => {
    done();
  });
  server.stop();
});

describe("Health Handler", () => {
  it("should success with server /health connection", async () => {
    const options = {
      method: "GET",
      url: "/health",
    };

    const data = await server.inject(options);

    expect(data.statusCode).toBe(200);
  });
});

describe("JSON Transform Handler", () => {
  it("should return `BadRequest` when send a empty request payload", async () => {
    const options = {
      method: "POST",
      url: "/v1/transform/json",
    };

    const data = await server.inject(options);

    expect(data.statusCode).toBe(400);
  });

  it("should return root node with associate empty children arrays", async () => {
    const payload = {
      0: [
        {
          id: 10,
          title: "House",
          level: 0,
          children: [],
          parent_id: null,
        },
      ],
    };

    const expectedResult = [
      { id: 10, title: "House", level: 0, children: [], parent_id: null },
    ];

    const options = {
      method: "POST",
      url: "/v1/transform/json",
      payload: JSON.stringify(payload),
    };

    const data = await server.inject(options);

    expect(data.statusCode).toBe(200);
    expect(data.result).toStrictEqual(expectedResult);
  });

  it("should return BadRequest if dataset on each children items has depth level greather than 2", async () => {
    const payload = {
      0: [
        {
          id: 10,
          title: "House",
          level: 0,
          children: [],
          parent_id: null,
        },
      ],
      1: [
        {
          id: 12,
          title: "Red Roof",
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 18,
          title: "Blue Roof",
          level: 3,
          children: [],
          parent_id: 10,
        },
      ],
    };

    const options = {
      method: "POST",
      url: "/v1/transform/json",
      payload: JSON.stringify(payload),
    };

    const data = await server.inject(options);

    expect(data.statusCode).toBe(400);
  });

  it("should get json organized structure sucessfully", async () => {
    const payload = {
      0: [
        {
          id: 10,
          title: "House",
          level: 0,
          children: [],
          parent_id: null,
        },
      ],
      1: [
        {
          id: 12,
          title: "Red Roof",
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 18,
          title: "Blue Roof",
          level: 1,
          children: [],
          parent_id: 10,
        },
        {
          id: 13,
          title: "Wall",
          level: 1,
          children: [],
          parent_id: 10,
        },
      ],
      2: [
        {
          id: 17,
          title: "Blue Window",
          level: 2,
          children: [],
          parent_id: 12,
        },
        {
          id: 16,
          title: "Door",
          level: 2,
          children: [],
          parent_id: 13,
        },
        {
          id: 15,
          title: "Red Window",
          level: 2,
          children: [],
          parent_id: 12,
        },
      ],
    };

    const expectedResult = [
      {
        id: 10,
        title: "House",
        level: 0,
        children: [
          {
            id: 12,
            title: "Red Roof",
            level: 1,
            children: [
              {
                id: 17,
                title: "Blue Window",
                level: 2,
                children: [],
                parent_id: 12,
              },
              {
                id: 15,
                title: "Red Window",
                level: 2,
                children: [],
                parent_id: 12,
              },
            ],
            parent_id: 10,
          },
          {
            id: 18,
            title: "Blue Roof",
            level: 1,
            children: [],
            parent_id: 10,
          },
          {
            id: 13,
            title: "Wall",
            level: 1,
            children: [
              {
                id: 16,
                title: "Door",
                level: 2,
                children: [],
                parent_id: 13,
              },
            ],
            parent_id: 10,
          },
        ],
        parent_id: null,
      },
    ];

    const options = {
      method: "POST",
      url: "/v1/transform/json",
      payload: JSON.stringify(payload),
    };

    const data = await server.inject(options);

    expect(data.statusCode).toBe(200);
    expect(data.result).toStrictEqual(expectedResult);
  });
});
