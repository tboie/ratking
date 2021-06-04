import "./entity-video.scss";

const Video = ({ url }) => {
  /*
  useEffect(() => {
    var context = new AudioContext();
    var video = document.querySelector("video") as HTMLMediaElement;

    var source = context.createMediaElementSource(video);
    var analyser = context.createAnalyser();
    analyser.fftSize = 256;
    const bar_count = 32;

    let fbc_array = new Uint8Array(analyser.frequencyBinCount);

    var gain = context.createGain();
    source.connect(analyser);

    source.connect(gain);
    gain.connect(context.destination);

    // run this part on loop to sample the current audio position
    //while (true) {

    setInterval(function () {
      //video.play();

      for (var i = 0; i < bar_count; i++) {
        //let val = -(fbc_array[i] / 2);
      }
    }, 500);

    document.addEventListener(
      "click",
      function () {
        // check if context is in suspended state (autoplay policy)
        if (context.state === "suspended") {
          context.resume();
        }
      },
      false
    );
  }, []);
  */

  return (
    <video className="widget-video" autoPlay={false}>
      <source src={url} type="video/mp4" />
    </video>
  );
};

export default Video;
