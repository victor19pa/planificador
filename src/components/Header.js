import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header = () => {
    return (
        <View >
            <Text style={styles.texto}>Planificador de Gastos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
    texto:{
        textAlign: 'center',
        fontSize: 30,
        color: '#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 30
    }
})
export default Header