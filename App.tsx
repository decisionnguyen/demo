/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//@ts-ignore
import React, {useEffect} from 'react';
//@ts-ignore
import ReactNativeHapticFeedback from "react-native-haptic-feedback"; // use by Drawers in react-native-ui-lib

import {LogBox, StatusBar} from "react-native";
import {HomeScreen} from "./src/screens/HomeScreen";
import {PersistGate} from "redux-persist/integration/react";
import {Provider} from "react-redux";
import {fetchCities} from "./src/store/cities/functions";

LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs(['']);

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false
};

ReactNativeHapticFeedback.trigger("impactLight", options);

const App = () => {


    return (
        <Provider store={require('./src/store').default}>
            <PersistGate persistor={require('./src/store').persistor}>
                <StatusBar
                    translucent={true}
                    backgroundColor={'transparent'}
                    barStyle="dark-content"
                />
                <HomeScreen />
            </PersistGate>
        </Provider>
    );
};
export default App;
