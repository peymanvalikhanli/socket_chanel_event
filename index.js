/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import a from './src/Screen/Main/MainIndex';
import A from './src/Screen/Login/LoginIndex';
import m from './src/Screen/Main/TaskList/TaskList';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => A);
