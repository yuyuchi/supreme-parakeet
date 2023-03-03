import { useState, useReducer } from 'react';
import { format } from 'date-fns';
import ChatIDB from '../../utils/db';
import { useConversation } from '../../context/conversationContext';
import TypingLoader from '../TypingLoader';
import { INPUT } from './actionTypes';
import { editReducer } from './reducer';
import './SelectedConversation.css';

export default function SelectedConversation({
  data,
  socket,
  senderState: { senderId, isTyping },
}) {
  const {
    message: { id },
  } = useConversation();
  const [sendMode, setSendMode] = useState(true);

  const [editMessage, dispatch] = useReducer(editReducer, {
    editID: '',
    editValue: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!!editMessage.editValue) {
      async function createOrEditMessage() {
        if (sendMode) {
          await ChatIDB.addMessage({
            parent_id: id,
            text: editMessage.editValue,
          });
        } else {
          async function edit() {
            const prevState = await ChatIDB.getMessageByID(editMessage.editID);
            const item = {
              ...prevState,
              id: editMessage.editID,
              text: editMessage.editValue,
            };
            ChatIDB.editMessage(item);
          }
          await edit();
        }
        socket.emit('chat message', {
          id,
          message: editMessage.editValue,
        });
      }
      createOrEditMessage();
      setSendMode(true);
      dispatch({ type: INPUT.RESET });
      handleTyping(false);
    }
  };

  const handleTyping = (isFocus) => {
    socket.emit('typing', {
      senderId: id,
      isTyping: isFocus,
    });
  };
  const handleChange = (e) => {
    if (sendMode) handleTyping(true);
    dispatch({ type: INPUT.CHANGE, editValue: e.target.value });
  };
  const handleMessageClick = (id, value) => {
    setSendMode(false);
    dispatch({
      type: INPUT.ADD,
      editID: id,
      editValue: value,
    });
  };

  return (
    <>
      <ul id="messages">
        {!!data.length ? (
          data?.map((d) => (
            <li key={d.id}>
              <time dateTime={d.last_updated}>
                {format(new Date(d.last_updated), 'cccc eo LLLL HH:mm:ss')}
              </time>
              <div
                className="message-text"
                onClick={() => handleMessageClick(d.id, d.text)}
              >
                {d.text}
                <span className="tooltiptext">Click to edit</span>
              </div>
            </li>
          ))
        ) : (
          <EmptyConversation />
        )}
        {senderId === id && isTyping && (
          <li>
            <TypingLoader />
          </li>
        )}
      </ul>

      <form id="form" onSubmit={handleSubmit}>
        <input
          value={editMessage.editValue}
          id="input"
          name={sendMode ? 'message' : editMessage.editID}
          autoComplete="off"
          placeholder="Enter a message"
          onChange={handleChange}
          onBlur={() => handleTyping(false)}
        />
        <input
          type="submit"
          value={sendMode ? 'Send' : 'Edit'}
          data-testid="send-button"
        />
      </form>
    </>
  );
}

function EmptyConversation() {
  return (
    <pre>
      <code>
        {`
          ,
         /|      __
        / |   ,-~ /
       Y :|  //  /
       | jj /( .^
       >-"~"-v"
      /       Y
     jo  o    |
    ( ~T~     j
     >._-' _./
    /   "~"  | 

  ⬅ Get started  
  
  by clicking on a conversation
`}
      </code>
    </pre>
  );
}
