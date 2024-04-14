const express = require("express");
const {getAllConversationOfUser, createGroup} = require("../contronllers/ConversationController");

const router = express.Router();

router.get('/:id', getAllConversationOfUser);
router.post('/createGroup', createGroup);

module.exports = router;