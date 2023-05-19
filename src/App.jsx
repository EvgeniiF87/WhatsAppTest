import Login from "./page/login/Login";
import Chat from "./page/chat/Chat";
import useAppContext from "./hooks/useAppContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Content from "./page/content/Content";

const App = () => {
  const { isUser } = useAppContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Chat />,
      children: [
        {
          path: "chat/:phone",
          element: <Content />,
        },
      ],
    },
  ]);

  if (!isUser) {
    return <Login />;
  }

  return <RouterProvider router={router} />;
};

export default App;
