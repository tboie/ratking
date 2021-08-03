import "./widget-wrapper.scss";

// React
import React, { Suspense } from "react";

// Typescript DataProps type
import { DataProps } from "../layout/layout-grid";

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
const Nav = React.lazy(() => import("../entity/entity-nav"));
const Content = React.lazy(() => import("../entity/entity-content"));
const ImageCarousel = React.lazy(
  () => import("../entity/entity-image-carousel")
);
const ListVirtual = React.lazy(() => import("../entity/entity-list-virtual"));
const MediaControls = React.lazy(
  () => import("../entity/entity-media-controls")
);
const ImageSlider = React.lazy(() => import("../entity/entity-image-slider"));

export type WidgetType =
  | "test"
  | "chart"
  | "json-editor"
  | "video"
  | "audio-editor"
  | "ratking"
  | "chatroom"
  | "processing"
  | "nav"
  | "content"
  | "imagecarousel"
  | "listvirtual"
  | "mediacontrols"
  | "imageslider";

export type WidgetWrapperProps = {
  type: WidgetType;
  showToolbar?: boolean;
} & DataProps;

const Widget = ({
  type,
  showToolbar,
  data,
  selectedData,
  setSelectedData,
}: WidgetWrapperProps) => {
  const p = {
    data: data,
    selectedData: selectedData,
    setSelectedData: setSelectedData,
  };

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
          {type === "nav" && <Nav />}
          {type === "content" && <Content />}
          {type === "imagecarousel" && <ImageCarousel {...p} />}
          {type === "listvirtual" && <ListVirtual {...p} />}
          {type === "mediacontrols" && <MediaControls {...p} />}
          {type === "imageslider" && <ImageSlider {...p} />}
        </Suspense>
      </WidgetBody>
    </>
  );
};

export default Widget;
