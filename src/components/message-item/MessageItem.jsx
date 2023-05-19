import style from "./message-item.module.scss";

// eslint-disable-next-line react/prop-types
const MessageItem = ({ message }) => {
  // eslint-disable-next-line react/prop-types
  const cln = message.im ? style.im : style.wrap;
  // eslint-disable-next-line react/prop-types
  const cln2 = message.im ? style.im_message_block : style.message_block;
  return (
    <div className={cln}>
      <div className={cln2}>{message.textMessage}</div>
    </div>
  );
};

export default MessageItem;
