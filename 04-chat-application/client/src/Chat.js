import { useState, useEffect } from 'react';

import { compareAsc } from 'date-fns';
import { io } from 'socket.io-client';
import ChatIDB from './utils/db';
import { useConversation } from './context/conversationContext';
import ConversationList from './components/ConversationList';
import SelectedConversation from './components/SelectedConversation';
import conversationsOri from './conversations.json';
import './Chat.css';

const socket = io('http://localhost:4000');

function App() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [senderState, setSenderState] = useState({
    senderId: '',
    isTyping: false,
  });
  const {
    message: { id },
  } = useConversation();

  useEffect(() => {
    async function setUpData() {
      async function initData() {
        await ChatIDB.checkIDBSupport();
        await Promise.all([
          ChatIDB.initConversations(conversationsOri),
          ChatIDB.initMessages(conversationsOri),
        ]);
      }

      async function displayConversations() {
        const result = await ChatIDB.getAllConversations();
        if (!!result.length) setConversations(result);
        else {
          // TODO: make sure user wont get 0 conversation
          const result = initData();
          await result;
          await displayConversations();
        }
      }
      await displayConversations();
    }
    setUpData();
  }, []);

  function fetchMessages(id) {
    return ChatIDB.getMessagesByParentID(id).then((ms) =>
      setMessages(
        ms?.sort((a, b) => compareAsc(a.last_updated, b.last_updated))
      )
    );
  }

  useEffect(() => {
    if (socket) {
      socket.on('getTypingStatus', (typingState) =>
        setSenderState(typingState)
      );

      socket.on('chat message', (_data) => fetchMessages(id));
    }
    return () => socket.off('chat message');
  }, [id, socket]);

  useEffect(() => {
    fetchMessages(id);
  }, [id]);
  return (
    <div className="App">
      <aside className="sidebar">
        <ConversationList data={conversations} activeId={id} />
      </aside>
      <main className="content">
        <SelectedConversation
          data={messages}
          socket={socket}
          senderState={senderState}
        />
      </main>
    </div>
  );
}

export default App;
