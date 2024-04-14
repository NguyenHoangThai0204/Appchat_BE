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
const createGroup = async (req, res) => {
  try {
    const { groupName, participants } = req.body; // Lấy dữ liệu từ body của yêu cầu
    // Tạo một cuộc trò chuyện mới
    const conversation = new Conversation({
      groupName: groupName,
      participants: participants
    });
    await conversation.save();
    res.status(201).json(conversation); // Trả về dữ liệu của cuộc trò chuyện đã tạo
  } catch (error) {
    console.error('Lỗi quá trình tạo group:', error);
    res.status(500).json({ error: 'Lỗi quá trình tạo group' });
  }
};

module.exports = {getAllConversationOfUser, createGroup};
