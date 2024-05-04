const express = require('express');
const {
    getAllConversationOfUser,
    sendMessageToGroup,
    createGroup,
    getGroupMessages,
    getConversationById,
    deleteConversation,
    addParticipant,
    removeParticipant,
    updateConversation,
} = require('../contronllers/ConversationController');

const router = express.Router();

router.get('/:id', getAllConversationOfUser);
router.post('/createGroup', createGroup);
router.get('/getGroupMessages/:groupId', getGroupMessages);
router.post('/sendMessageToGroup', sendMessageToGroup);
//[get] http://localhost:3001/api/conversations/getConversationById/:id
router.get('/getConversationById/:id', getConversationById);
//[post] http://localhost:3001/api/conversations/deleteConversation/:id
router.post('/deleteConversation/:id', deleteConversation);
//[post] http://localhost:3001/api/conversations/addParticipant
router.post('/addParticipant', addParticipant);
//[post] http://localhost:3001/api/conversations/removeParticipant
router.post('/removeParticipant', removeParticipant);
//[post] http://localhost:3001/api/conversations/updateConversation/:conversationId
router.post('/updateConversation/:conversationId', updateConversation);

module.exports = router;
