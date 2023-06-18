import { createContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Register from "./pages/register/Register";
import Error from "./pages/error/Error";

export const userContext = createContext();

function App() {
  const [usm, setUsm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState({
    id: "",
    type: "",
  });
  const [isDone, setIsDone] = useState(false);
  const [conv, setConv] = useState([]);
  const [msg, setMsg] = useState([]);
  const [otherName, setOtherName] = useState("");
  const [usersOnline, setUsersOnline] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState({
    state: false,
    profile: "own",
    msgdeleted: Boolean
  });
  const [refresh, setRefresh] = useState(Boolean);
  const [groupMessage, setGroupMessage] = useState([]);
  const [unseenMsgs, setUnseenMsgs] = useState([]);

  return (
    <>
      <userContext.Provider
        value={{
          usm,
          setUsm,
          isOpen,
          setIsOpen,
          conversationId,
          setConversationId,
          isDone,
          setIsDone,
          conv,
          setConv,
          msg,
          setMsg,
          otherName,
          setOtherName,
          usersOnline,
          setUsersOnline,
          isProfileOpen,
          setIsProfileOpen,
          refresh,
          setRefresh,
          groupMessage,
          setGroupMessage,
          unseenMsgs,
          setUnseenMsgs,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Messenger />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/error" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
