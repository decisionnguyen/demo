//@ts-ignore
import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text, View} from 'react-native-ui-lib/core';
import {getStatusBarHeight} from "react-native-iphone-x-helper";
import {LocationsComponent} from "../components/LocationsComponent";
import {useEffect} from "react";
import {fetchCities} from "../store/cities/functions";


export const HomeScreen = React.memo(function () {
    useEffect(() => {
        fetchCities()
    }, []);

    return (
        <View bg-white flex paddingT-20 style={styles.container}>
            <ScrollView>
                <Text center text60BO marginT-10>
                    Demo
                </Text>
                <Text center text85M grey30 marginT-5>
                    Updated: Today at 21:29:01
                </Text>

                <View row marginT-32 center>
                    {/*<Image source={IC_PIN} style={styles.iconPin} tintColor={"#ff2e53"}/>*/}
                    <Text text70BO grey10 marginL-4>
                        Ha Noi
                    </Text>
                </View>
                <View row marginT-12 center>
                    {/*<Image source={IC_CLOUDY} style={styles.iconPin} />*/}
                    <Text text70L grey10 marginL-4>
                        Sun and cloudy
                    </Text>
                </View>

                <Text center marginT-16 text30L>
                    22{/*22°*/}
                </Text>

                <View row style={styles.row} paddingH-12>
                    <View flex bg-blue>
                        <Text text90L>
                            Wind: 5.0m/s SSE
                        </Text>
                        <Text text90L marginT-4>
                            Pressure: 1014 hPA
                        </Text>
                    </View>
                    <View flex bg-red>
                        <Text text90L>
                            Humidity: 78%
                        </Text>
                        <Text text90L marginT-4>
                            Visibility: 10.0km
                        </Text>
                    </View>
                    <View flex bg-blue>
                        <Text text90L>
                            UV index: 0.0
                        </Text>
                        <Text text90L marginT-4>
                            Dew point: 18°C
                        </Text>
                    </View>
                </View>
                <LocationsComponent />
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
