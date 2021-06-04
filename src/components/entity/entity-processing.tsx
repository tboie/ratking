import "./entity-processing.scss";

import Sketch from "react-p5";
import p5Types from "p5"; //Import this for typechecking and intellisense
import { useEffect } from "react";

const ProcessingWidget = () => {
  let canvasRef;
  let x = 50;
  const y = 50;

  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    /*
    console.log(
      "width: " +
        canvasParentRef.clientWidth +
        " height: " +
        canvasParentRef.clientHeight
    );
    */

    // TODO: fix canvas size (p5.resizeCanvas) ?
    p5.createCanvas(100, 100).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    x++;
  };

  useEffect(() => {}, []);

  return (
    <Sketch
      setup={setup}
      draw={draw}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default ProcessingWidget;
