import "./entity-audio-waveform.scss";

// React
import { useEffect } from "react";

// WaveSurfer
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions";

// Config
const options = {
  container: "#waveform",
  waveColor: "teal",
  progressColor: "cyan",
  plugins: [
    RegionsPlugin.create({
      regionsMinLength: 2,
      regions: [
        {
          start: 1,
          end: 3,
          loop: false,
          color: "hsla(400, 100%, 30%, 0.5)",
        },
        {
          start: 5,
          end: 7,
          loop: false,
          color: "hsla(200, 50%, 70%, 0.4)",
          minLength: 1,
        },
      ],
      dragSelection: {
        slop: 5,
      },
    }),
  ],
};

type AudioWaveformProps = {
  url: string;
};

const AudioWaveform = ({ url }: AudioWaveformProps) => {
  useEffect(() => {
    const wavesurfer = WaveSurfer.create(options);
    wavesurfer.load(url);

    return () => wavesurfer.destroy();
  }, [url]);

  return <div id="waveform"></div>;
};

export default AudioWaveform;
