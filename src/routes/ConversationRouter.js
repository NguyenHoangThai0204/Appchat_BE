const express = require("express");
const {getAllConversationOfUser,sendMessageToGroup, createGroup, getGroupMessages} = require("../contronllers/ConversationController");

const router = express.Router();

router.get('/:id', getAllConversationOfUser);
router.post('/createGroup', createGroup);
router.get('/getGroupMessages/:groupId', getGroupMessages);
router.post('/sendMessageToGroup', sendMessageToGroup);
module.exports = router;