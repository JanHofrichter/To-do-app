const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const {
  listCollection,
  updateCollection,
  addElem,
  deleteElem,
} = require("./taskController");

router.use(bodyParser.json());

router.get("/ListTasks", listCollection);

router.put("/Updatedata", updateCollection);

router.post("/AddTask", addElem);

router.delete("/DeleteTask", deleteElem);

module.exports = router;
