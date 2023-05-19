import style from "./message-item.module.scss";

// eslint-disable-next-line react/prop-types
const MessageItem = ({ message }) => {
  // eslint-disable-next-line react/prop-types
  const cln = message.im ? style.im : style.wrap;
  // eslint-disable-next-line react/prop-types
  const cln2 = message.im ? style.im_message_block : style.message_block;

  // eslint-disable-next-line react/prop-types
  const statusSuccessMessage = !message.success ? style.wait : style.success;
  // eslint-disable-next-line react/prop-types
  const statusErrorMessage = message.error ? style.error : "";

  return (
    <div className={cln}>
      <div
        className={cln2 + " " + statusSuccessMessage + " " + statusErrorMessage}
      >
        {message.textMessage}
      </div>
    </div>
  );
};

export default MessageItem;
