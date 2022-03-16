import * as React from 'react';
//@ts-ignore
import {Button, Drawer, Text, View} from "react-native-ui-lib"; //eslint-disable-line
import {FlatList, Modal, StyleSheet, TextInput} from "react-native";
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {TouchableOpacity} from "react-native-ui-lib/core";
import {CityModal} from "../screens/CityModal";
import {useSelectedCity} from "../store/constant";
import {memo, useMemo} from "react";
import {useCity} from "../store/cities";


const LocationSelected = memo(({id}: { id: string }) => {
    const city = useCity(id);

    if (!city) {
        return null
    }
    return (
        <Drawer
            hideItem={false}
            showRightItems={true}
            showLeftItem={true}
            unread={true}
            testID={"drawer"}
            useNativeAnimations
            rightItems={[{text: 'Remove', background: '#cc1534', onPress: () => console.log('read pressed')}]}
        >
            <View centerV padding-s4 bg-white style={{height: 60}}>
                <Text text70>
                    {city.name}
                </Text>
            </View>
        </Drawer>
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
