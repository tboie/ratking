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
const CodeEditor = React.lazy(() => import("../entity/entity-code-editor"));
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
  | "code-editor"
  | "video"
  | "audio-editor"
  | "ratking"
  | "chatroom"
  | "processing"
  | "nav"
  | "content"
  | "image-carousel"
  | "list-virtual"
  | "media-controls"
  | "image-slider";

export type WidgetWrapperProps = {
  i: string;
  type: WidgetType;
  showToolbar?: boolean;
  selected: boolean;
  setSelected: (val: string) => void;
  staticHeight?: number;
  staticWidth?: number;
  setStaticHeight: (val?: number) => void;
  setStaticWidth: (val?: number) => void;
} & DataProps;

const Widget = ({
  i,
  type,
  showToolbar,
  data,
  selectedData,
  setSelectedData,
  selected,
  setSelected,
  staticWidth,
  setStaticWidth,
  staticHeight,
  setStaticHeight,
}: WidgetWrapperProps) => {
  const p = {
    i: i,
    selected: selected,
    setSelected: setSelected,
    data: data,
    selectedData: selectedData,
    setSelectedData: setSelectedData,
  };

  return (
    <div className="widget-wrapper">
      {showToolbar && (
        <WidgetToolbar
          i={i}
          type={type}
          staticWidth={staticWidth}
          setStaticWidth={setStaticWidth}
          staticHeight={staticHeight}
          setStaticHeight={setStaticHeight}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <WidgetBody>
        <Suspense fallback={<Loader />}>
          {type === "test" && <Test />}
          {type === "chart" && <Chart type="bar" />}
          {type === "code-editor" && <CodeEditor />}
          {type === "video" && <Video url="/videos/Audio_bands_Feed.mov" />}
          {type === "audio-editor" && (
            <AudioWaveform url="/videos/Audio_bands_Feed.mov" />
          )}
          {type === "ratking" && <RatKing />}
          {type === "chatroom" && <ChatRoom />}
          {type === "processing" && <Processing />}
          {type === "nav" && <Nav />}
          {type === "content" && <Content />}
          {type === "image-carousel" && <ImageCarousel {...p} />}
          {type === "list-virtual" && <ListVirtual {...p} />}
          {type === "media-controls" && <MediaControls {...p} />}
          {type === "image-slider" && <ImageSlider {...p} />}
        </Suspense>
      </WidgetBody>
    </div>
  );
};

export default Widget;
