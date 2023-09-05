import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text,} from 'react-native';
import Realm from 'realm';

class ShoppingCartItem extends Realm.Object {
}

ShoppingCartItem.schema = {
    name: 'ShoppingCartItem',
    primaryKey: 'ordernumber',
    properties: {
        ordernumber: 'string',
        quantity: 'int',
        unitPrice: 'double'
    }
}


function App() {
    useEffect(() => {
        const realm = new Realm({schema: [ShoppingCartItem]});
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.sectionTitle}>
                Demo app
            </Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
