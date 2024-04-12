const express = require("express");
const {getAllConversationOfUser} = require("../contronllers/ConversationController");

const router = express.Router();

router.get('/:id', getAllConversationOfUser);

module.exports = router;