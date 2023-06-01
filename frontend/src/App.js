import { createContext, useState } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import Messenger from "./pages/messenger/Messenger";
import Register from "./pages/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const userContext = createContext();

function App() {
  const [usm, setUsm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [conversationId, setConversationId] = useState("");
  const [isDone, setIsDone] = useState(false);

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
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/home" element={<Messenger />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
