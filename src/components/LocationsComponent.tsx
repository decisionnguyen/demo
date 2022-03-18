import * as React from 'react';
import {memo, useCallback, useEffect, useMemo} from 'react';
//@ts-ignore
import {Button, Drawer, Text, View, TouchableOpacity} from "react-native-ui-lib"; //eslint-disable-line
import {Alert, StyleSheet} from "react-native";
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {CityModal} from "../screens/CityModal";
import {setSelectedCityAction, useSelectedCity} from "../store/constant";
import {useCity} from "../store/cities";
import {useAsyncFn} from "../hooks/useAsyncFn";
import {RawWeather} from "../store/cities/types";
import {getCityWeather} from "../store/cities/functions";
import {DetailLocationModal} from "../screens/DetailLocationModal";
import {getDegree} from "../utils/string";


const LocationSelected = memo(({id}: { id: string }) => {
    const city = useCity(id);
    const [modalVisible, setModal] = React.useState<boolean>(false)

    const [{value}, getWeatherLocation] = useAsyncFn(async () => {
        if (!city) {
            return
        }
        return await new Promise((resolve: (value: RawWeather) => void) => {
            getCityWeather(city.coord.lat, city.coord.lon).then(res => {
                resolve(res)
            })
        })
    }, [city]);

    useEffect(() => {
        if (!city) {
            return
        }
        getWeatherLocation().then()
    }, [city]);

    const onRemove = useCallback(() => {
        if (!city) {
            return
        }
        Alert.alert("Remove " + city.name, "Do you want remove from favorite list", [
            {
                text: "Cancel",
                style: "cancel",
                onPress: () => {

                }
            },
            {
                text: "Remove",
                style: "destructive",
                onPress: () => {
                    setSelectedCityAction(id);
                }
            },

        ])
    }, [city, id]);

    const onOpenDetail = useCallback(() => {
        setModal(true)
        return
    }, []);

    const onCloseDetail = useCallback(() => {
        setModal(false)
    }, []);

    if (!city) {
        return null
    }

    return (
        <>
            <Drawer
                // @ts-ignore
                showRightItems={true}
                showLeftItem={true}
                unread={true}
                testID={"drawer"}
                useNativeAnimations
                rightItems={[{text: 'Remove', background: '#cc1534', onPress: onRemove}]}
            >
                <TouchableOpacity flex onPress={onOpenDetail}>
                    <View row centerV paddingH-16 paddingV-12 bg-white style={styles.itemContainer}>
                        <Text text80 flex>
                            {city.name}
                        </Text>
                        {
                            value
                                ? <>
                                    <View style={styles.degreeView}>
                                        <Text text80>
                                            {getDegree(value?.main?.temp || 0)}°C
                                        </Text>
                                    </View>
                                    <View style={styles.windView}>
                                        <Text text80>
                                            {value?.wind?.speed || 0}m/s
                                        </Text>
                                    </View>
                                </> : null
                        }
                    </View>
                </TouchableOpacity>
            </Drawer>
            {
                value && <DetailLocationModal
                    cityInfo={city}
                    modalVisible={modalVisible}
                    onClose={onCloseDetail}
                    cityWeather={value}/>
            }
        </>
    )
});

const renderItem = (value: string) => {
    return (
        <LocationSelected id={value}/>
    )
};

export const LocationsComponent = gestureHandlerRootHOC(function LocationsComponent() {
    const [modalVisible, setModal] = React.useState<boolean>(false)
    const selectedCities = useSelectedCity();

    const openModal = React.useCallback(() => {
        setModal(true)
    }, []);

    const hideModal = React.useCallback(() => {
        setModal(false)
    }, []);

    const renderCities = useMemo(() => {
        return (selectedCities || []).map(item => renderItem(item))
    }, [selectedCities]);

    return (
        <>
            <View paddingT-12/>
            {renderCities}
            <Button margin-12 backgroundColor={'#2bc4e7'} onPress={openModal}>
                <Text white>
                    Add location
                </Text>
            </Button>
            <CityModal modalVisible={modalVisible} onClose={hideModal}/>
        </>
    )
});

const styles = StyleSheet.create({
    itemContainer: {
        borderTopWidth: 1,
        borderTopColor: "#cccccc"
    },
    degreeView: {
        width: 60,
    },
    windView: {
        width: 70,
    },
});
