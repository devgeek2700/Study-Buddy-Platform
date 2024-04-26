import React from "react";
import { studyGroups } from "./Data";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";

function ChatsPage(props) {
  const chatprops = useMultiChatLogic(
    "f2323406-13f4-4a9f-ba32-26fe76fc62a2",
    props.user.username,
    props.user.secret
  );

  const chats = chatprops.chats.map((chat) => (
    <li key={chat.url}>
      {chat.title} - {chat.url}
    </li>
  ));

  console.log(chats);
  return (
    <div style={{ height: "100vh", width: '100vw' }}>
      <MultiChatSocket {...chatprops} />
      <div style={{ height: "100%" }}>
        <MultiChatWindow {...chatprops} />
      </div>
    </div>
  );
}

export default ChatsPage;
