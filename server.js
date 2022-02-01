const Hapi = require("@hapi/hapi");
const Joi = require("@hapi/joi");
const axios = require("axios");

const jsonHandler = require("./api/json_transform.js");

let totalGithubResultCount = 0;

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

/**
 * JSON transform handler
 */
server.route({
  method: "POST",
  path: "/v1/transform/json",
  handler: jsonHandler.jsonTransformer,
  options: {
    validate: {
      payload: Joi.object().keys(), // validate: at least object is required
    },
  },
});

/**
 * Github Search handler
 */
server.route({
  method: "GET",
  path: "/github/search",
  handler: async (request, h) => {
    const perPage = 10;
    const defaultPage = 1;
    const defaultSearch = "nodejs";
    const githubLimitSearchCount = 1000 // https://docs.github.com/en/rest/reference/search

    let q = request.query.q;
    let page = request.query.page;
    page = !page ? defaultPage : page;

    let searchResultData;
    let totalCount

    searchResultData = await githubSearchClient(q, page);
    
    totalCount = (searchResultData.data.total_count > githubLimitSearchCount) ? githubLimitSearchCount : totalCount

    return h.view("index.pug", {
      query: q,
      page: page,
      limit: perPage,
      total: totalCount,
      items: searchResultData.data.items,
    });
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

async function githubSearchClient(query, page) {
  try {
    const config = {
      method: "get",
      url: `https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };

    const response = await axios.request(config);

    return response;
  } catch (e) {
    console.error(error);
  }
}

module.exports = server;
