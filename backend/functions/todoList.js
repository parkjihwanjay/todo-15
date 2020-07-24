const getTodoList = require("../db/TodoList/getTodoList.js");
const patchTodoList = require("../db/TodoList/patchTodoList.js");
const insertTodoList = require("../db/TodoList/insertTodoList.js");
const deleteTodoList = require("../db/TodoList/deleteTodoList.js");

const statusCode = require("../utils/statusCode.js");
const errorMessage = require("../utils/errorMessage.js");

async function getTodoListCallback(req, res) {
  try {
    const result = await getTodoList();
    const response = {
      data: result[0],
    };
    return res.status(statusCode.OK).json(response);
  } catch (e) {
    return res.status(statusCode.DB_ERROR).send(errorMessage.DB_ERROR);
  }
}

async function postTodoListCallback(req, res) {
  const data = req.body;
  try {
    const result = await insertTodoList(data);
    if (result[0].affectedRows < 1) throw new Error();
    return res.sendStatus(statusCode.OK);
  } catch (e) {
    return res.status(statusCode.DB_ERROR).send(errorMessage.DB_ERROR);
  }
}

async function patchTodoListsCallback(req, res) {
  try {
    const groupId = req.params.groupId;
    const groupTitle = req.body.groupTitle;
    const result = await patchTodoList(groupId, groupTitle);
    if (result[0].affectedRows < 1) throw new Error();
    return res.sendStatus(statusCode.OK);
  } catch (e) {
    return res.status(statusCode.DB_ERROR).send(errorMessage.DB_ERROR);
  }
}

async function deleteTodoListCallback(req, res) {
  try {
    const groupId = req.params.groupId;
    const result = await deleteTodoList(groupId);
    // if (result[0].affectedRows < 1) throw new Error();
    return res.sendStatus(statusCode.OK);
  } catch (e) {
    return res.status(statusCode.DB_ERROR).send(errorMessage.DB_ERROR);
  }
}

module.exports = {
  getTodoListCallback,
  patchTodoListsCallback,
  postTodoListCallback,
  deleteTodoListCallback,
};
