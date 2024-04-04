import React, { useEffect, useRef, useState } from "react";
import { usersApi } from "../../redux/api/userApi";
import { io } from 'socket.io-client'
import { AudioRecorder } from "react-audio-voice-recorder";
import { BsRecordCircle } from "react-icons/bs";



const Chat = ({ isOpen, setIsOpen, shopId }) => {
  const [messages, setMessages] = useState([]);

  const [value, setValue] = useState('');
  const [arivalMessage, setArivalMessage] = React.useState(null);
  const [receiverId, setReciverId] = useState(null)
  const [conversationId, setConversationId] = useState(null);
  const [messageType, setMessageType] = React.useState('text')

  const socket = useRef();

  const userId = localStorage.getItem('userId');

  React.useEffect(() => {
    socket.current = io("ws://localhost:4000");
    socket.current.on("sendMessage", data => {
      console.log(data)
      setArivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  const { isError, isLoading, data } = usersApi.useGetUserConversationQuery(userId);
  const [createCoversation,] = usersApi.useCreateUserConversationMutation();
  const [createMessage,] = usersApi.useCreateConversationMessageMutation();
  const [getConversationMessages, { data: conversationMessages }] = usersApi.useLazyGetConversationMessagesQuery()


  useEffect(() => {
    if (conversationMessages) {
      setMessages(conversationMessages)
    }
  }, [conversationMessages])


  useEffect(() => {
    if (data) {
      const conversation = data.filter(d => {
        if (d.members.includes(userId) && d.members.includes(shopId)) {
          return d
        }
      });
      if (conversation.length > 0) {
        // user has already conversation with the shop
        getConversationMessages(conversation[0]._id)
        setConversationId(conversation[0]._id)
        const id = conversation[0].members.find(m => m !== userId)
        id && setReciverId(id);
      }
      else {
        // create conversation
        createCoversation({
          receiverId: shopId,
          senderId: userId,
        })
      }
    }
  }, [data, isLoading, isError])

  React.useEffect(() => {
    if (userId) {
      socket.current.emit("addUser", userId)
      socket.current.on("getUsers", users => {
      })
    }
  }, [userId])


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = (message) => {
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId: shopId,
      text: value
    })
  };

  React.useEffect(() => {
    if (arivalMessage && data && data.length > 0 && data[0]?.members.includes(arivalMessage.sender)) {
      setMessages((prev) => [...prev, arivalMessage])
      const msgData = {
        sender: arivalMessage.sender,
        text: arivalMessage.text,
        conversationId: conversationId,
      }
      createMessage(msgData)
    }
  }, [arivalMessage, data])

  const addAudioElement = (blob) => {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const base64String = event.target.result;
      socket.current.emit("sendMessage", {
        senderId: userId,
        receiverId: shopId,
        text: base64String
      });
    };
  
    reader.readAsDataURL(blob);
  };
  

  console.log(messages)

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-lb rounded-lg w-96 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Chat</h2>
          <button
            onClick={toggleChat}
            className="text-red-500 hover:text-red-700"
          >
            Close
          </button>
        </div>
        <div className="overflow-y-auto max-h-72">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender !== userId ? 'justify-normal' : 'justify-end'}`}
            >
              <div
                className={`p-2 rounded-lg w-52 mb-2 
                 ${message.sender == shopId ? "bg-white text-db self-end" : "bg-db text-white"}`}
              >
                {
                  // "text" == "text" ? 
                  <p className="text-lg">{message.text}</p>
                  // :
                  // <audio src={message.text} controls={true}>

                  // </audio>
                }
                <p className="text-xs text-gray-500">{message.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4">
          {messageType === 'text' ?
            <>
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border rounded-md p-2"
              onChange={e => { setValue(e.target.value); setMessageType('text') }}
              value={value}
            />
            <BsRecordCircle  onClick={() =>setMessageType('audio')}/>

            </>
            :
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              // downloadOnSavePress={true}
              downloadFileExtension="webm"
            />}
          <button onClick={sendMessage} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
