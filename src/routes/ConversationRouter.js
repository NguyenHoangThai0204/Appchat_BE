const express = require("express");
const {getAllConversationOfUser, createGroup, getGroupMessages} = require("../contronllers/ConversationController");

const router = express.Router();

router.get('/:id', getAllConversationOfUser);
router.post('/createGroup', createGroup);
router.get('/getGroupMessages/:groupId', getGroupMessages);
module.exports = router;