import React, { useState } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Antd
import { Input, Button } from 'antd';

// Socket
import { showLiveSendMessage } from '../../../lib/socketConnection';

// Styles
import styles from './Chat.module.scss';

const Chat = () => {
  const [inputValue, setInputValue] = useState('');

  // Redux
  const { messages } = useSelector((state) => state.showLive);

  const onChange = ({ target }) => {
    const { value } = target;
    setInputValue(value);
  };

  const onClickHandler = () => {
    if (!inputValue.trim()) return;
    showLiveSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <section className={styles.chat}>
      <header className={styles['chat-header']}>聊天室</header>
      <div id="show-live-chat-content" className={styles['chat-content']}>
        {
          messages.map((m) => (
            <div key={m.id} className={styles.message}>
              <div className={styles['message-item']}>
                <p>
                  {m.message}
                </p>
              </div>
            </div>
          ))
        }
      </div>
      <div className={styles['chat-bottom']}>
        <div className={styles['input-box']}>
          <Input
            value={inputValue}
            onKeyUp={(e) => {
              if (e.code === 'Enter') {
                onClickHandler();
              }
            }}
            onChange={onChange}
            placeholder="Message..."
          />
          <Button onClick={onClickHandler} type="primary">Send</Button>
        </div>
      </div>
    </section>
  );
};

export default Chat;
