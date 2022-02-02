const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");

const jsonHandler = require("./api/json_transform.js");
const githubHandler = require("./api/github.js");

let totalGithubResultCount = 0;

const HTTP_STATUS_OK = 200;

const server = Hapi.server({
  host: "localhost",
  port: 3000,
  debug: false,
});

/**
 * Health handler
 */
server.route({
  method: "GET",
  path: "/health",
  handler: async (request, h) => {
    const data = { message: "OK" };

    return h.response(data).code(200);
  },
});

/**
 * JSON transform handler
 */
server.route({
  method: "POST",
  path: "/v1/transform/json",
  handler: jsonHandler.jsonTransformer,
  options: {
    validate: {
      // payload: Joi.object().keys(), // validate: at least object is required
      payload: Joi.object()
        .keys({
          0: Joi.array().items(
            Joi.object().keys({
              id: Joi.number().integer(),
              title: Joi.string(),
              level: Joi.number().integer(),
              children: Joi.array(),
              parent_id: Joi.any(),
            })
          ),
        })
        .unknown(true),
    },
  },
});

/**
 * Github Search handler
 */
server.route({
  method: "GET",
  path: "/github/search",
  handler: githubHandler.githubHandler,
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

  await server.register(require("@hapi/vision"));

  // set up pug as a view engine
  server.views({
    engines: {
      pug: require("pug"),
    },
    relativeTo: __dirname,
    path: "views",
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
