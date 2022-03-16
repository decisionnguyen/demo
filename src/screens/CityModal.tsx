import {memo, useCallback, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View, Image} from "react-native-ui-lib/core";
import * as React from "react";
import {FlatList, Modal, StyleSheet, TextInput} from "react-native";
import {cities} from "../assets/city";
import {RawCity} from "../store/cities/types";
import {setSelectedCityAction, useSelectedCity} from "../store/constant";
import {IC_CHECK} from "../assets";
import {normalizeStringForSearch} from "../utils/string";
import {text} from "stream/consumers";

interface Props {
    modalVisible: boolean,
    onClose: () => void
}


const CityItem = memo(({item}: { item: RawCity }) => {
    const selectedCities = useSelectedCity();

    const onToggle = useCallback(() => {
        setSelectedCityAction(item.id.toString())
    }, []);

    return (
        <TouchableOpacity onPress={onToggle} row centerV spread paddingH-16>
            <Text grey marginV-12>
                {item.name}
            </Text>
            {selectedCities.includes(item.id.toString()) ?
                <Image style={styles.iconCheck} source={IC_CHECK} tintColor={'#007ed8'}/> : null}
        </TouchableOpacity>
    )
});

export const CityModal = memo(function CityModal(props: Props) {
    const {modalVisible, onClose} = props;
    const [textSearch, setTextSearch] = useState('');

    const renderItem = useCallback(({item}: { item: RawCity }) => {
        return <CityItem item={item}/>
    }, []);

    const data = useMemo(() => {
        if (!textSearch) {
            return cities
        }
        return cities.filter(item => normalizeStringForSearch(item.name).indexOf(normalizeStringForSearch(textSearch)) > 0)
    }, [textSearch]);

    return (
        <Modal visible={modalVisible} transparent={true} animationType={"slide"}>
            <View style={styles.modalContainer} flex paddingT-50>
                <View flex bg-white style={styles.modalContent}>
                    <Text center black70 marginT-6 marginB-6>
                        Enter city name to search
                    </Text>
                    <View row paddingH-12>
                        <TextInput
                            value={textSearch}
                            onChangeText={setTextSearch}
                            style={styles.textField}
                            placeholder={"Enter city name to search "}/>
                        <TouchableOpacity centerV bg-white onPress={onClose} marginL-6 padding-0 style={{width: 60}}>
                            <Text text70BO color={"#007AFF"} padding-0>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList data={data} renderItem={renderItem}/>
                </View>
            </View>
        </Modal>
    )
});

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
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
    }
})
