import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {colors} from '../utils/constants';

const Header = () => {
    return (
        <View  style={styles.header}>
          <Text style={styles.headerTitle}>Imagiflix</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#333333",
        padding: 20,
        paddingTop: 42
    },
        headerTitle: {
        color: colors.primary,
        textTransform: "uppercase",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold"
    },
})

export default Header;