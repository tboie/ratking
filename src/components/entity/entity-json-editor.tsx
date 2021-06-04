import "./entity-json-editor.scss";

import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-solarized_dark";

// TODO: make this widget fit parent

const data = {};

const JSONEditor = () => {
  const handleChange = (e: any) => {
    //console.log(e);
  };

  return (
    <AceEditor
      height="100%"
      width="100%"
      mode="json"
      theme="solarized_dark"
      onChange={handleChange}
      showGutter={false}
      defaultValue={JSON.stringify(data, null, "\t")}
    />
  );
};

export default JSONEditor;
