const express = require("express");
const {getAllConversationOfUser,sendMessageToGroup, createGroup, getGroupMessages, getConversationById, deleteConversation} = require("../contronllers/ConversationController");

const router = express.Router();

router.get('/:id', getAllConversationOfUser);
router.post('/createGroup', createGroup);
router.get('/getGroupMessages/:groupId', getGroupMessages);
router.post('/sendMessageToGroup', sendMessageToGroup);
//[get] http://localhost:3001/api/conversations/getConversationById/:id
router.get('/getConversationById/:id', getConversationById);
//[post] http://localhost:3001/api/conversations/deleteConversation/:id
router.post('/deleteConversation/:id', deleteConversation);
module.exports = router;