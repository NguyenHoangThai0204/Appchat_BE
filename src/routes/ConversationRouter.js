const express = require("express");
const {getAllConversationOfUser,sendMessageToGroup, sendUploadFileToGroup ,createGroup, getGroupMessages, getConversationById, deleteConversation} = require("../contronllers/ConversationController");
const uploadFileMiddleware = require('../middleware/fileUpload');
const router = express.Router();

router.get('/:id', getAllConversationOfUser);
router.post('/createGroup', createGroup);
router.get('/getGroupMessages/:groupId', getGroupMessages);
router.post('/sendMessageToGroup', sendMessageToGroup);

//[get] http://localhost:3001/api/conversations/getConversationById/:id
router.get('/getConversationById/:id', getConversationById);
//[post] http://localhost:3001/api/conversations/deleteConversation/:id
router.post('/deleteConversation/:id', deleteConversation);

//[POST] http://localhost:3001/api/conversations/uploadOnApp/:id
router.post('/uploadOnAppConver/:id', uploadFileMiddleware.single('file'), sendUploadFileToGroup );

module.exports = router;