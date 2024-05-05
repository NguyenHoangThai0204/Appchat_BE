const Conversation = require('../models/ConversationSchema.js');
const Message = require('../models/Message');

// delete conversation
const deleteConversation = async (req, res) => {
    try {
        const { id } = req.params;

        // Xóa cuộc trò chuyện với id được cung cấp
        const deletedConversation = await Conversation.findByIdAndDelete(id);

        if (!deletedConversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        res.status(200).json({ message: 'Conversation deleted successfully' });
    } catch (error) {
        console.error('Error deleting conversation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllConversationOfUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        console.log('userId: ', userId);
        // Tìm tất cả các cuộc trò chuyện mà người dùng tham gia dưới dạng participant
        const conversations = await Conversation.find({
            participants: { $elemMatch: { $eq: userId } },
        }).populate('participants');
        console.log('conversations: ', conversations);
        res.status(200).json(conversations);
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }
};
const createGroup = async (req, res) => {
    try {
        const { groupName, participants, admin } = req.body; // Lấy dữ liệu từ body của yêu cầu
        // Tạo một cuộc trò chuyện mới
        console.log('req.body: ', req.body);
        const conversation = new Conversation({
            groupName: groupName,
            participants: participants,
            idAdmin: admin,
        });
        await conversation.save(); // Lưu cuộc trò chuyện vào cơ sở dữ liệu
        res.status(201).json(conversation); // Trả về dữ liệu của cuộc trò chuyện đã tạo
    } catch (error) {
        console.error('Lỗi quá trình tạo group:', error);
        res.status(500).json({ error: 'Lỗi quá trình tạo group' });
    }
};
const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        const conversation = await Conversation.findById(groupId).populate("messages");

        if (!conversation) {
            return res.status(404).json({ error: 'Không tìm thấy cuộc trò chuyện' });
        }

        const messages = conversation.messages;

        res.status(200).json({ messages });
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
            message: message,
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


const sendUploadFileToGroup = async (req, res) => {
    try {
      const { id: groupId } = req.params; // Sử dụng req.params để lấy id từ URL params
      const { senderId } = req.query; // Lấy senderId từ query params
  
      if (!req.file) {
        return res.status(400).json({ error: 'Không có file được tải lên' });
      }
  
      const message = req.file.location; // Lấy đường dẫn của file từ req.file.location
  
      // Tạo một tin nhắn mới
      const newMessage = new Message({
        senderId: senderId,
        receiverId: groupId,
        message: message,
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
      res.status(201).json({ message: 'Tin nhắn và tệp đã được gửi thành công' });
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn và tệp đến nhóm:', error);
      res.status(500).json({ error: 'Lỗi khi gửi tin nhắn và tệp đến nhóm' });
    }
  };  
  


// lay 1 conversation de show thanh vien
const getConversationById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('conversationId: ', id);

        // Tìm cuộc trò chuyện theo ID và populate thông tin của các participants
        const conversation = await Conversation.findById(id);

        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }

        console.log('conversation: ', conversation);
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

module.exports = {
    sendUploadFileToGroup ,
    getAllConversationOfUser,
    createGroup,
    sendMessageToGroup,
    getGroupMessages,
    getConversationById,
    deleteConversation,
};
