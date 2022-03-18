import * as React from 'react';
import {Text, TouchableOpacity, View} from "react-native-ui-lib/core";
// @ts-ignore
import {Dimensions, Modal, StyleSheet} from "react-native";
import {RawCity, RawWeather} from "../store/cities/types";
import {WebView} from 'react-native-webview';
import {WeatherDetail} from "../components/WeatherDetail";
import {Core} from "../global";

const {width} = Dimensions.get("window");

interface Props {
    modalVisible: boolean,
    onClose: () => void,
    cityWeather: RawWeather,
    cityInfo: RawCity
}

export const DetailLocationModal = React.memo(function CityModal(props: Props) {
    const {modalVisible, onClose, cityWeather, cityInfo} = props;

    const createURL = React.useMemo(() => {
        if (!cityInfo) {
            return ""
        }
        return `https://tile.openweathermap.org/map/wind_new/10/${parseInt(`${cityInfo.coord.lat}`)}/${parseInt(`${cityInfo.coord.lon}`)}.png?appid=${Core.weatherApiKey}`
    }, [cityInfo]);

    return (
        <Modal visible={modalVisible} transparent={true} animationType={"slide"}>
            <View style={styles.modalContainer} flex paddingT-50>
                <View flex bg-white style={styles.modalContent}>
                    <View row paddingH-12>

                        <TouchableOpacity centerV bg-white onPress={onClose} marginL-6 padding-0 style={{width: 60}}>
                            <Text text70BO color={"#007AFF"} marginT-16>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <WeatherDetail value={cityWeather}/>
                    <WebView
                        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.5, maximum-scale=0.5, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
                        scalesPageToFit={false}
                        style={styles.mapViewContent}
                        source={{
                            uri: createURL
                        }}
                    />

                </View>
            </View>
        </Modal>
    )
});

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    mapViewContent: {
        width: width - 32,
        height: (9 / 16) * (width - 32),
        marginLeft: 16,
        marginTop: 16
    },
    modalContent: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    },
    textField: {
        flex: 1,
        height: 44,
        backgroundColor: '#eee',
        borderRadius: 44,
        paddingHorizontal: 12,
        color: "#111"
    },
    iconCheck: {
        width: 16,
        height: 16
    },
});
