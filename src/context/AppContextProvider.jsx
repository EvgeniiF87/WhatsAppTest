import { useState, createContext } from "react";

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppContextProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [idInstance, setIdInstance] = useState("");
  const [apiTokenInstance, setApiTokenInstance] = useState("");
  const [contacts, setContacts] = useState([]);
  return (
    <AppContext.Provider
      value={{
        isUser,
        setIsUser,
        idInstance,
        setIdInstance,
        apiTokenInstance,
        setApiTokenInstance,
        contacts,
        setContacts,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };
