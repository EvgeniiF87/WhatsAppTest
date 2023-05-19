import { useEffect, useState } from "react";
import useAppContext from "./useAppContext";
import axios from "axios";

const deleteNotification = (receiptId, idInstance, apiTokenInstance) => {
  const url = `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`;

  axios
    .delete(url)
    .then(({ data }) => {
      if (data.result) return true;
      return;
    })
    .catch((err) => console.log(err));
};

const useNotification = () => {
  const { idInstance, apiTokenInstance } = useAppContext();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const apiUrl = `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`;

      axios
        .get(apiUrl)
        .then(({ data }) => {
          if (data !== null) {
            if (
              // eslint-disable-next-line no-prototype-builtins
              data.hasOwnProperty("body") &&
              data.body.typeWebhook !== "incomingMessageReceived"
            ) {
              deleteNotification(data.receiptId, idInstance, apiTokenInstance);
            } else {
              return data;
            }
          }

          return null;
        })
        .then((data) => {
          if (data !== null) {
            if (
              // eslint-disable-next-line no-prototype-builtins
              data.hasOwnProperty("body") &&
              data.body.typeWebhook === "incomingMessageReceived"
            ) {
              const dataMessage = {
                im: false,
                textMessage: data.body.messageData.textMessageData.textMessage,
              };
              setMessages([...messages, dataMessage]);
              deleteNotification(data.receiptId, idInstance, apiTokenInstance);
            }
          }
        });
    }, 1000);

    return () => clearInterval(interval);
  }, [apiTokenInstance, idInstance, messages]);

  const handleSetMessages = (objData) => {
    setMessages([...messages, objData]);
  };

  return { messages, setMessages, handleSetMessages };
};

export default useNotification;
