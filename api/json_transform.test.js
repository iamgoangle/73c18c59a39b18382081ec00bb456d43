const jsonTransform = require("./json_transform");

describe("JSON Transform Handler", () => {
  describe("when given an empty hash table dataset", () => {
    it("should flatten dataset to be empty an arrays", async () => {
      const dataSet = {};

      result = jsonTransform.flattenToArrays(dataSet);

      expect(result).toEqual([]);
      expect(result.length).toEqual(0);
    });
  });

  describe("when given a hash table dataset", () => {
    it("should flatten dataset to be array of object", async () => {
      const dataSet = {
        0: [
          {
            id: 11,
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
            parent_id: 11,
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
        ],
      };

      const expectFlatData = [
        {
          id: 11,
          title: "House",
          level: 0,
          children: [],
          parent_id: null,
        },
        {
          id: 12,
          title: "Red Roof",
          level: 1,
          children: [],
          parent_id: 11,
        },
        {
          id: 17,
          title: "Blue Window",
          level: 2,
          children: [],
          parent_id: 12,
        },
      ];

      result = jsonTransform.flattenToArrays(dataSet);

      expect(result).toStrictEqual(expectFlatData);
    });
  });
});
