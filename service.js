/**
 * normalizeToArrObjectsModel represent the service that transform unstructure parent-childs
 * to be a parent-child level
 *
 * @param {*} data
 * @returns
 */
function normalizeToArrObjectsModel(data) {
  let normalizeData = [];

  for (const key in data) {
    for (let i = 0; i < data[key].length; i++) {
      let nodeItem = data[key][i];

      normalizeData.push({
        ...nodeItem,
      });
    }
  }

  return normalizeData;
}

/**
 * determineRoot represent the service to check node item if the parent id is nil
 * indicates that root level
 *
 * FIXME: Recursive each root from maxDeptLevel until meet 0 level instead of hard-code nested looping
 * Time complexyity is O(2)
 * 
 * @param {*} data
 * @returns
 */
function determineRoot(data) {
  return data.filter((item) => item.parent_id === null);
}

function associateParentAndChildItems(rootNodes, normalizeModel) {
  let subChildResponse = [];
  const rootNodesCopied = Object.assign([], rootNodes)  // deep copy

  for (const rootNode of rootNodesCopied) {
    findSubChildItemsByParentId = normalizeModel
      .filter((item) => item.level === 1)
      .filter((item) => item.parent_id === rootNode.id);

    let leafItems = [];
    for (const subChildItem of findSubChildItemsByParentId) {
      leafItems = normalizeModel
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

  return rootNodesCopied
}

module.exports = {
  normalizeToArrObjectsModel,
  determineRoot,
  associateParentAndChildItems,
};
