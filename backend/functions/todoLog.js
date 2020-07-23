const statusCode = require("../utils/statusCode.js");
const errorMessage = require("../utils/errorMessage.js");

const insertTodoLog = require("../db/TodoLog/insertTodoLog.js");
const getTodoLog = require("../db/TodoLog/getTodoLog.js");

function validateTodoLog(req, res, next) {
  const todoLog = req.body;

  let check = true;

  if (!todoLog.username) check = false;
  if (!todoLog.actionType) check = false;
  if (!todoLog.time) check = false;

  if (!check)
    return res.status(statusCode.BAD_REQUEST).send(errorMessage.BAD_REQUEST);

  next();
}

async function postLogsCallback(req, res) {
  try {
    const log = req.body;
    const result = await insertTodoLog(log);
    if (result[0].affectedRows !== 1) throw new Error();
    const response = {
      id: result[0].insertId,
    };
    return res.status(statusCode.OK).json(response);
  } catch (e) {
    return res.status(statusCode.DB_ERROR).send(errorMessage.DB_ERROR);
  }
}

async function getLogsCallback(req, res) {
  try {
    const result = await getTodoLog();
    return res.status(statusCode.OK).json(result[0]);
  } catch (e) {
    console.log(e);
    return res.status(statusCode.DB_ERROR).send(errorMessage.DB_ERROR);
  }
}

module.exports = { postLogsCallback, validateTodoLog, getLogsCallback };
