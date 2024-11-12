/**
 * @format
 */

import {AppRegistry} from 'react-native';
import firebase from '@react-native-firebase/app';
// import App from './App';
import firestore from './src/firestore';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => firestore);
