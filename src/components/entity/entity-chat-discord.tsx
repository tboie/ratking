import "./entity-chat-discord.scss";

// TODO: finish implementation

const defaultWidth = 350;
const defaultHeight = 500;

export interface DiscordWidgetProps {
  theme?: string;
  username?: string;
  serverId: string;
  width?: number;
  height?: number;
}

const getSrc = ({ theme, username, serverId }: DiscordWidgetProps) =>
  `https://discordapp.com/widget?id=${serverId}&theme=${
    theme ? theme : "dark"
  }${username ? `&username=${username}` : ""}`;

const Discord = (props: DiscordWidgetProps) => (
  <iframe
    title={`Discord Server Widget '${props.serverId}'`}
    src={getSrc(props)}
    width={props.width ?? defaultWidth}
    height={props.width ?? defaultHeight}
    frameBorder="0"
    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
  ></iframe>
);

export default Discord;
