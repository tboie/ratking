import "./entity-processing.scss";

// React
import { useEffect, useRef, useState } from "react";

// Resize Observer
import useResizeObserver from "use-resize-observer";

// Processing
import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense

const ProcessingWidget = () => {
  const [processing, setProcessing] = useState<p5Types>();
  const { ref, width = 1, height = 1 } = useResizeObserver<HTMLDivElement>();

  let x = 50;
  const y = 50;

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    if (!processing) {
      setProcessing(p5);
      p5.createCanvas(100, 100).parent(canvasParentRef);
    }
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  useEffect(() => {
    resize();
  }, [processing]);

  useEffect(() => {
    resize();
  }, [width, height]);

  const resize = () => {
    if (processing && ref) {
      processing.resizeCanvas(width, height);
    }
  };

  return (
    <div className="entity-processing" ref={ref}>
      <Sketch
        setup={setup}
        draw={draw}
        windowResized={resize}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default ProcessingWidget;
