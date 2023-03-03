import { compareDesc } from 'date-fns';
import { useConversation } from '../../context/conversationContext';

import './ConversationList.css';

export default function ConversationList({ data, activeId }) {
  const { setMessage } = useConversation();
  const sortedConversations = () =>
    data.sort((a, b) => compareDesc(a.last_updated, b.last_updated));

  const handleClick = (_e, id) => {
    setMessage((prev) => ({ ...prev, id }));
  };
  return (
    <ul id="conversations">
      {sortedConversations.map((d, i) => (
        <li
          data-testid={`conversation-${i}`}
          key={d.id}
          onClick={(e) => handleClick(e, d.id)}
          className={d.id === activeId ? 'active' : ''}
        >
          {d.name}
        </li>
      ))}
    </ul>
  );
}
