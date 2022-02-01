const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");

const maxDepthLevel = 2;

async function start() {
  const server = Hapi.server({
    host: "localhost",
    port: 3000,
    debug: false,
  });

  server.route({
    method: "GET",
    path: "/health",
    handler: async (request, h) => {
      const data = { message: "OK" };

      return h.response(data).code(200);
    },
  });

  server.route({
    method: "POST",
    path: "/v1/transform/json",
    handler: transformJsonHandler,
    options: {
      validate: {
        payload: Joi.object().keys(), // validate: at least object is required
      },
    },
  });

  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: process.env.NODE_ENV !== "production",
      redact: ["req.headers.authorization"],
    },
  });

  await server.start();

  return server;
}

start().catch((err) => {
  console.log(err);
  process.exit(1);
});

// handler
async function transformJsonHandler(request, h) {
  let httpReqPayload = request.payload;

  try {
    request.logger.info("payload %s", JSON.stringify(httpReqPayload));

    let response = [];
    let normalizeToArrObjectsModel = [];

    // normalize the data model to array of object
    // remove the hash key
    normalizeToArrObjectsModel = (() => {
      let normalizeData = [];
      for (const key in httpReqPayload) {
        for (let i = 0; i < httpReqPayload[key].length; i++) {
          let nodeItem = httpReqPayload[key][i];

          normalizeData.push({
            ...nodeItem,
          });
        }
      }

      return normalizeData;
    })();

    let dataSetIsInvalid = (() => {
      let findDataSetOverMaxRule = normalizeToArrObjectsModel.filter(
        (item) => item.level > maxDepthLevel
      );

      return findDataSetOverMaxRule.length > 0;
    })();

    if (dataSetIsInvalid) {
      console.error(
        `The dataset max depth level is invalid. We are limit ${maxDepthLevel} for depth level`
      );
      return;
    }

    // finding the <root> nodes
    // filter the node items that no pointer to parent_id
    response = normalizeToArrObjectsModel.filter(
      (item) => item.parent_id === null
    );

    // associate sub-child item with <root> node item
    let subChildResponse = [];
    for (const rootNode of response) {
      findSubChildItemsByParentId = normalizeToArrObjectsModel
        .filter((item) => item.level === 1)
        .filter((item) => item.parent_id === rootNode.id);

      let leafItems = [];
      for (const subChildItem of findSubChildItemsByParentId) {
        leafItems = normalizeToArrObjectsModel
          .filter((item) => subChildItem.id === item.parent_id)
          .filter((item) => item.level == 2);

        subChildResponse.push({
          id: subChildItem.id,
          title: subChildItem.title,
          level: subChildItem.level,
          children: leafItems,
          parent_id: subChildItem.parent_id,
        });
      }

      rootNode.children = subChildResponse;
    }

    return h.response(response).code(200);
  } catch (e) {
    request.logger.error(e);
  }
}

module.exports = start;
