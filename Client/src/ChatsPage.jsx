import React from "react";
import { studyGroups } from "./Data";
import {
  MultiChatSocket,
  MultiChatWindow,
  useMultiChatLogic,
} from "react-chat-engine-advanced";

function ChatsPage(props) {
  const chatprops = useMultiChatLogic(
    "Project ID from ChatEngine",
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
