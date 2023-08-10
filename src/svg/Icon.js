import React from "react";
import Svg, {Circle, Defs, G, Image, LinearGradient, Path, Rect, Stop} from "react-native-svg";

/**
 * 播放
 * @param props
 * @returns {*}
 * @constructor
 */
export const PlayIcon = (props) => (
  <Svg t="1691646588807" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="6509" width={props.width || "16"} height={props.height || "16"}>
    <Path
      d="M744.727273 551.563636L325.818182 795.927273c-30.254545 18.618182-69.818182-4.654545-69.818182-39.563637v-488.727272c0-34.909091 39.563636-58.181818 69.818182-39.563637l418.909091 244.363637c30.254545 16.290909 30.254545 62.836364 0 79.127272z"
      p-id="6510"
      fill={props.fill || "#14101C"}
    />
  </Svg>
);
/**
 * 暂停
 * @param props
 * @returns {*}
 * @constructor
 */
export const PauseIcon = (props) => (
  <Svg t="1691647151786" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="9988" width={props.width || "16"} height={props.height || "16"}>
    <Path
      d="M320 128A64 64 0 0 0 256 192v640a64 64 0 0 0 128 0v-640A64 64 0 0 0 320 128z m384 0A64 64 0 0 0 640 192v640a64 64 0 0 0 128 0v-640A64 64 0 0 0 704 128z"
      fill={props.fill || "#14101C"} p-id="9989"/>
  </Svg>
);
export const MusicDetailIcon = (props) => (
  <Svg t="1691647909181" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
       p-id="17151" width="20" height="20">
    <Path d="M64 64m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="17152"   fill={props.fill || "#14101C"}/>
    <Path
      d="M991.4 94.9H256c-17.7 0-32-14.3-32-32s14.3-32 32-32h735.4c17.7 0 32 14.3 32 32s-14.3 32-32 32zM991.4 544.6H36c-17.7 0-32-14.3-32-32s14.3-32 32-32h955.4c17.7 0 32 14.3 32 32s-14.3 32-32 32zM991.4 992.2H36c-17.7 0-32-14.3-32-32s14.3-32 32-32h955.4c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
      p-id="17153"
      fill={props.fill || "#14101C"}
    />
  </Svg>
);
