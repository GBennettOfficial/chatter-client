import React from 'react'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect, useRef } from 'react';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { formatMessageTime }  from '../lib/utils.js';

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  
  useEffect(() => {
    console.log("Selected User:", selectedUser);
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      const timer = setTimeout(() => {
        messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [messages]);


  if (isMessagesLoading) {
    return (<div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <MessageSkeleton />
      <MessageInput />
    </div>)
  }

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message, ix) => (
          <div
            ref={messageEndRef}
            key={ix}
            className={`chat ${message.senderId == authUser.id ? 'chat-end' : 'chat-start'}`}>
            <div className='chat-image avatar'>
              <div className='size-10 rouded-full border'>
                <img src={message.senderId === authUser.id ? authUser.profilePic || '/avatar.png' : selectedUser.profilePic || '/avatar.png'} alt='profile pic' />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer