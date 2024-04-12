const Conversation = require('../models/ConversationSchema.js');

const getAllConversationOfUser = async (req, res) => {
  try {
    const {id:userId} = req.params;
    console.log("userId: ", userId);
    // Tìm tất cả các cuộc trò chuyện mà người dùng tham gia dưới dạng participant
    const conversations = await Conversation.find({
      participants: { $elemMatch: { $eq: userId } }
    }).populate('participants');
    console.log("conversations: ", conversations);
    res.status(200).json(conversations);
  } catch (error) {
    console.error('Error fetching conversations:', error);
    throw error;
  }
};

module.exports = {getAllConversationOfUser};
