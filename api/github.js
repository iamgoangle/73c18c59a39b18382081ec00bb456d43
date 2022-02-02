const axios = require("axios");

async function githubHandler(request, h) {
  const perPage = 10;
  const defaultPage = 1;
  const defaultSearch = "nodejs";
  const githubLimitSearchCount = 1000; // https://docs.github.com/en/rest/reference/search

  let reqQuery = request.query.q;
  reqQuery = request.query.q ? defaultSearch : reqQuery;

  let reqPage = request.query.page;
  reqPage = !request.query.page ? defaultPage : reqPage;

  let searchResultData;
  let searchResultTotalCount;

  searchResultData = await githubHandler.githubSearchClient(reqQuery, reqPage);

  if (searchResultData.status === HTTP_STATUS_OK) {
    request.logger.info("fetch github api successfully");
  } else {
    return h
      .response(searchResultData.statusText)
      .code(searchResultData.status);
  }

  searchResultTotalCount =
    searchResultData.data.total_count > githubLimitSearchCount
      ? githubLimitSearchCount
      : searchResultTotalCount;

  return h.view("index.pug", {
    query: reqQuery,
    page: reqPage,
    limit: perPage,
    total: searchResultTotalCount,
    items: searchResultData.data.items,
  });
}

async function githubSearchClient(query, page) {
  try {
    const config = {
      method: "get",
      url: `https://api.github.com/search/repositories?q=${query}&per_page=10&page=${page}&sort=stargazers`,
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    };

    const response = await axios.request(config);

    return response;
  } catch (e) {
    console.error(e);
  }
}

module.exports = {
  githubHandler,
  githubSearchClient,
};
