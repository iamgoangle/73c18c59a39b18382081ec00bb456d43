async function jsonTransformer(request, h) {
  let httpReqPayload = request.payload;
  let flatDataToArray = flattenToArrays(httpReqPayload);

  // create a mapping id
  // represent hashmap of node and index
  const mappingId = flatDataToArray.reduce((acc, elem, i) => {
    acc[elem.id] = i;
    return acc;
  }, {});

  let tree = [];
  flatDataToArray.forEach((elem) => {
    if (elem.parent_id === null) {
      // determine this is root
      tree = elem;

      return;
    }

    // lookup parent node in hashmap
    // mappingId = return index of parent element
    const parentElem = flatDataToArray[mappingId[elem.parent_id]];
    if(!parentElem) {
      return
    }

    // using javascript object references to the address
    // copy children or take current element to be child
    // destructing 2 arrays exstis, and current element
    parentElem.children = [...(parentElem.children || []), elem];
  });

  return h.response(tree).code(200);
}

function flattenToArrays(input) {
  let flattenHashToArrays = [];
  for (let key in input) {
    flattenHashToArrays.push(...input[key]);
  }

  return flattenHashToArrays;
}

module.exports = {
  jsonTransformer,
};
