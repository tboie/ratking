import "./entity-chatroom.scss";

const ChatRoom = () => {
  return (
    <iframe
      src="https://kiwiirc.com/client/irc.kiwiirc.com/?nick=LABRAT|?&theme=cli#labratdotart"
      style={{ border: 0, width: "100%", height: "450px" }}
    ></iframe>
  );
};

export default ChatRoom;
