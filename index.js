/**
 * @format
 */



import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Text, TextInput } from 'react-native';

// Disable font scaling for all <Text> components
if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;


if (TextInput.defaultProps == null) TextInput.defaultProps = {};
TextInput.defaultProps.allowFontScaling = false;

if (__DEV__) {
    require("./reactotronConfig");
  }

AppRegistry.registerComponent(appName, () => App);
