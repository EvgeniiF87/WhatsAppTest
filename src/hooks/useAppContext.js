import { useContext } from "react";
import { AppContext } from "../context/AppContextProvider";

const useAppContext = () => {
  const {
    isUser,
    setIsUser,
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    contacts,
    setContacts,
  } = useContext(AppContext);

  return {
    isUser,
    setIsUser,
    idInstance,
    setIdInstance,
    apiTokenInstance,
    setApiTokenInstance,
    contacts,
    setContacts,
  };
};

export default useAppContext;
