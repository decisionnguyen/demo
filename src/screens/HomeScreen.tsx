//@ts-ignore
import * as React from 'react';
import {useEffect} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib/core';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {LocationsComponent} from "../components/LocationsComponent";
import {fetchCities, getCityWeather} from "../store/cities/functions";
import GetLocation from 'react-native-get-location'
import {useAsyncFn} from '../hooks/useAsyncFn';
import {RawWeather} from "../store/cities/types";
import {WeatherDetail} from "../components/WeatherDetail";

export const HomeScreen = React.memo(function () {

    const [{value}, getWeatherLocation] = useAsyncFn(async () => {
        return await new Promise((resolve: (value: RawWeather) => void, reject) => {
            GetLocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 15000,
            })
                .then(location => {
                    getCityWeather(location.latitude, location.longitude).then(res => {
                        resolve(res)
                    })
                })
                .catch(error => {
                    const {code, message} = error;
                    console.warn(code, message);
                    reject(undefined)
                })
        })
    }, []);


    useEffect(() => {
        fetchCities();
        getWeatherLocation().then();

    }, []);

    return (
        <View bg-white flex paddingT-20 style={styles.container}>
            <ScrollView>
                <Text center text60BO marginT-10>
                    Windy Demo
                </Text>

                {
                    value
                        ? <WeatherDetail value={value}/>
                        : null
                }
                <LocationsComponent/>
            </ScrollView>
        </View>
    )
});

const styles = StyleSheet.create({
    container: {
        paddingTop: getStatusBarHeight()
    },
    iconPin: {
        width: 20,
        height: 20,
    },
    row: {
        width: '100%',
    }
});
