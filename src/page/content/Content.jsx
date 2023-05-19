import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formatPhone } from "../../lib/formatPhone";
import style from "./content.module.scss";
import useAppContext from "../../hooks/useAppContext";
import useNotification from "../../hooks/useNotification";
import MessageItem from "../../components/message-item/MessageItem";
import { useRef } from "react";

const Content = () => {
  const { idInstance, apiTokenInstance } = useAppContext();
  const { phone } = useParams();
  const { register, reset, handleSubmit } = useForm();

  const { messages, handleSetMessages } = useNotification();

  const messagesData = messages.length && messages.reverse();

  const onSubmit = (dataForm) => {
    const message = dataForm.message;
    const dataMessage = {
      im: true,
      textMessage: message,
    };

    const apiUrl = `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;

    axios
      .post(apiUrl, {
        chatId: `7${phone}@c.us`,
        message,
      })
      .then(({ data }) => {
        if (data.idMessage) {
          handleSetMessages(dataMessage);
          reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style.wrap}>
      <div className={style.header}>
        <h3>Чат с номером:</h3>
        <span>{formatPhone(phone)}</span>
      </div>
      <div className={style.body}>
        <div className={style.body_content}>
          {messages.length &&
            messagesData.map((message) => (
              <MessageItem key={message.textMessage} message={message} />
            ))}
        </div>
      </div>
      <div className={style.footer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("message", { maxLength: 1000 })} />
          <button>отправить</button>
        </form>
      </div>
    </div>
  );
};

export default Content;
