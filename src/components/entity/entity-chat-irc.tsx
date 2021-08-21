import "./entity-chat-irc.scss";

const ChatRoom = () => {
  return (
    <iframe
      src="https://kiwiirc.com/client/irc.kiwiirc.com/?nick=LABRAT|?&theme=cli#labratdotart"
      style={{ border: 0, width: "100%", height: "450px" }}
      title={"chatroom"}
    ></iframe>
  );
};

export default ChatRoom;
