import App from "./src/App";
import TrackPlayer from "react-native-track-player";
import { AppRegistry } from "react-native";
import { playbackService } from "./MusicPlayerServices";
import { name as appName } from "./app.json";

/**
 * @format
 */


AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => playbackService);
