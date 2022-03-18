import * as React from 'react';
import {memo} from "react";
import {Image, Text, View} from "react-native-ui-lib/core";
import dayjs from "dayjs";
import {IC_CLOUDY, IC_PIN} from "../assets";
import {getDegree} from "../utils/string";
import {StyleSheet} from "react-native";
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {RawWeather} from "../store/cities/types";


export const WeatherDetail = memo(({value}: {value: RawWeather}) => {
    return (
        <View>
            <Text center text85M grey30 marginT-5>
                Updated: Today at {dayjs(value.dt * 1000).format('YYYY/MM/DD HH:mm')}
            </Text>

            <View row marginT-32 center>
                <Image source={IC_PIN} style={styles.iconPin} tintColor={"#ff2e53"}/>
                <Text text70BO grey10 marginL-4>
                    {value.name}
                </Text>
            </View>
            <View row marginT-12 center>
                <Image source={IC_CLOUDY} style={styles.iconPin} />
                <Text text70L grey10 marginL-4>
                    {value?.weather? value?.weather[0].description : ''}
                </Text>
            </View>

            <Text center marginT-16 text30L>
                {getDegree(value?.main?.temp || 0)}°
            </Text>

            <View row style={styles.row} paddingH-12 paddingT-12>
                <View flex bg-blue>
                    <Text text90L>
                        Wind: {value?.wind?.speed}m/s SSE
                    </Text>
                    <Text text90L marginT-8>
                        Pressure: {value?.wind?.gust} hPA
                    </Text>
                </View>
                <View flex bg-red>
                    <Text text90L>
                        Humidity: {value?.main?.humidity}%
                    </Text>
                    <Text text90L marginT-8>
                        Visibility: {value?.visibility / 1000}km
                    </Text>
                </View>
                <View flex bg-blue>
                    <Text text90L>
                        UV index:{value?.uvi || ''}
                    </Text>
                    <Text text90L marginT-8>
                        Dew point: {getDegree(value?.dew_point || 0)}°C
                    </Text>
                </View>
            </View>
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
