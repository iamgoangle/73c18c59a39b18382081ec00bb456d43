const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");

const handler = require("./handler.js");

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
  handler: handler.jsonTransformer,
  options: {
    validate: {
      payload: Joi.object().keys(), // validate: at least object is required
    },
  },
});

// Initiate the server
const initServer = async () => {
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: process.env.NODE_ENV !== "production",
      redact: ["req.headers.authorization"],
    },
  });

  await server.start();
  console.log("Server running on %ss", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

initServer();

module.exports = server;
