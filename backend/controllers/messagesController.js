const Message = require("../models/messagesModel");


// Get orders by shop
exports.createMessage = async (req, res) => {
    const newMessage= new Message(req.body)
    try {
        const savedMessage = await newMessage.save()
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(err)
    }
}

// Get messages
exports.getConversationMessages = async (req, res) => {
    const messages= await Message.find({
        conversationId:req.params.conversationId
    })
    try {
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(err)
    }
}
