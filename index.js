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


    return h.response(response).code(200);
  } catch (e) {
    request.logger.error(e);
  }
}

// service
