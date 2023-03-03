import { createContext, useContext, useState } from 'react';

const ConversationContext = createContext();

const ConversationProvider = ({ children }) => {
  const [message, setMessage] = useState({
    id: '',
    message: '',
    typing: false,
  });
  return (
    <ConversationContext.Provider value={{ message, setMessage }}>
      {children}
    </ConversationContext.Provider>
  );
};

const useConversation = () => {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error('useConversation must be used within a ThemeProvider');
  }
  return context;
};

export { ConversationProvider, useConversation };
