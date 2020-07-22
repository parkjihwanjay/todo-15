const promisePool = require("../connection.js");

function patchColumn(groupId, groupTitle) {
  const query = `update TODOLIST set groupTitle='${groupTitle}' where groupId='todoList-${groupId}'`;
  return promisePool.execute(query);
}

module.exports = patchColumn;
