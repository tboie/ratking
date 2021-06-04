import "./widget-wrapper.scss";

// React
import React, { Suspense } from "react";

// Widget Base Components
import WidgetToolbar from "./widget-toolbar";
import WidgetBody from "./widget-body";

// Loader
import Loader from "./widget-loader";

// Widget Components
const Test = React.lazy(() => import("../entity/entity-test"));
const Chart = React.lazy(() => import("../entity/entity-chart"));
const JSONEditor = React.lazy(() => import("../entity/entity-json-editor"));
const Video = React.lazy(() => import("../entity/entity-video"));
const AudioWaveform = React.lazy(
  () => import("../entity/entity-audio-waveform")
);
const RatKing = React.lazy(() => import("../entity/entity-ratking"));
const ChatRoom = React.lazy(() => import("../entity/entity-chatroom"));
const Processing = React.lazy(() => import("../entity/entity-processing"));

export type WidgetType =
  | "test"
  | "chart"
  | "json-editor"
  | "video"
  | "audio-editor"
  | "ratking"
  | "chatroom"
  | "processing";

export type WidgetWrapperProps = {
  type: WidgetType;
  showToolbar?: boolean;
};

const Widget = ({ type, showToolbar }: WidgetWrapperProps) => {
  return (
    <>
      {showToolbar && <WidgetToolbar type={type} />}
      <WidgetBody>
        <Suspense fallback={<Loader />}>
          {type === "test" && <Test />}
          {type === "chart" && <Chart type="bar" />}
          {type === "json-editor" && <JSONEditor />}
          {type === "video" && <Video url="/videos/Audio_bands_Feed.mov" />}
          {type === "audio-editor" && (
            <AudioWaveform url="/videos/Audio_bands_Feed.mov" />
          )}
          {type === "ratking" && <RatKing />}
          {type === "chatroom" && <ChatRoom />}
          {type === "processing" && <Processing />}
        </Suspense>
      </WidgetBody>
    </>
  );
};

export default Widget;
