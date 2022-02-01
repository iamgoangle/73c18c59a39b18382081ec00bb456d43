const service = require("../service/service.js");

const maxDepthLevel = 2;

async function jsonTransformer(request, h) {
  let httpReqPayload = request.payload;

  try {
    request.logger.info("payload %s", JSON.stringify(httpReqPayload));

    let response = [];
    let normalizeModel = [];

    normalizeModel = service.normalizeToArrObjectsModel(httpReqPayload);

    let dataSetIsInvalid = (() => {
      let findDataSetOverMaxRule = normalizeModel.filter(
        (item) => item.level > maxDepthLevel
      );

      return findDataSetOverMaxRule.length > 0;
    })();

    if (dataSetIsInvalid) {
      return h
        .response(
          `The dataset max depth level is invalid. We are limit ${maxDepthLevel} for depth level`
        )
        .code(400);
    }

    rootNode = service.determineRoot(normalizeModel)
    rootNode = service.associateParentAndChildItems(rootNode, normalizeModel)

    response = rootNode

    return h.response(response).code(200);
  } catch (e) {
    request.logger.error(e);

    return;
  }
}

module.exports = {
  jsonTransformer,
};
