const Conversation = require('../models/ConversationSchema.js');
const Message = require('../models/Message');
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
const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params; // Lấy id của nhóm từ params của request
    // Tìm cuộc trò chuyện dựa trên groupId và lấy ra trường messages
    const conversation = await Conversation.findById(groupId, 'messages');
    if (!conversation) {
      return res.status(404).json({ error: 'Không tìm thấy cuộc trò chuyện' });
    }

    // Lấy ra các ID của tin nhắn từ conversation.messages
    const messageIds = conversation.messages;

    // Thực hiện truy vấn để lấy nội dung của các tin nhắn
    const messagePromises = messageIds.map(messageId => {
      return Message.findById(messageId);
    });

    // Kết hợp kết quả của các truy vấn thành một mảng
    const messages = await Promise.all(messagePromises);

    // Tạo một mảng chứa thông tin cần thiết của các tin nhắn
    const messagesContent = messages.map(message => {
      return {
        message: message.message,
        senderId: message.senderId,
        createdAt: message.createdAt
      };
    });

    // Trả về danh sách các tin nhắn của cuộc trò chuyện
    res.status(200).json({ messages: messagesContent });
  } catch (error) {
    console.error('Lỗi khi lấy tin nhắn của nhóm:', error);
    res.status(500).json({ error: 'Lỗi khi lấy tin nhắn của nhóm' });
  }
};

const sendMessageToGroup = async (req, res) => {
  try {
    const { groupId, senderId, message } = req.body; // Nhận dữ liệu từ client

    // Tạo một tin nhắn mới
    const newMessage = new Message({
      senderId: senderId,
      receiverId: groupId,
      message: message
    });

    // Lưu tin nhắn mới vào cơ sở dữ liệu
    await newMessage.save();

    // Thêm ID của tin nhắn mới vào mảng tin nhắn của nhóm
    const conversation = await Conversation.findById(groupId);
    if (!conversation) {
      return res.status(404).json({ error: 'Không tìm thấy cuộc trò chuyện' });
    }
    conversation.messages.push(newMessage._id);

    // Lưu lại thông tin cập nhật của nhóm
    await conversation.save();

    // Gửi phản hồi về cho client
    res.status(201).json({ message: 'Tin nhắn đã được gửi thành công' });
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn đến nhóm:', error);
    res.status(500).json({ error: 'Lỗi khi gửi tin nhắn đến nhóm' });
  }
};

// lay 1 conversation de show thanh vien
const getConversationById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("conversationId: ", id);
    
    // Tìm cuộc trò chuyện theo ID và populate thông tin của các participants
    const conversation = await Conversation.findById(id);
    
    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    
    
    console.log("conversation: ", conversation);
    // Lấy danh sách ID người tham gia từ cuộc trò chuyện
    const participantIds = conversation.participants;
    const participantsInfo = await User.find({ _id: { $in: participantIds } });

    console.log(participantsInfo);
    res.status(200).json(participantsInfo);
  } catch (error) {
    console.error('Error fetching conversation:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {getAllConversationOfUser, createGroup,sendMessageToGroup, getGroupMessages, getConversationById};
