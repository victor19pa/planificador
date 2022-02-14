import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyles from '../styles'

const NuevoPresupuesto = ({handleNuevoPresupuesto, presupuesto, setPresupuesto}) => {
    return (
        <View style={styles.contenedor}>
            <Text style={styles.label}>Definir Presupuesto</Text>
            {/**VENTANA PRINCIPAL PARA AGREGAR EL PRESUPUESTO INICIAL */}
            <TextInput
                keyboardType='numeric'
                placeholder='Agrega tu presupuesto: Ej. 300'
                style={styles.input}
                value={presupuesto.toString()}
                onChangeText={setPresupuesto}
            />

            <Pressable 
                style={styles.boton}
                onPress={ () => handleNuevoPresupuesto(presupuesto)}
            >
                <Text style={styles.botonTexto}>Agregar Presupuesto</Text>
            </Pressable>
        </View>
    )
}
const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },
    label:{
        textAlign: 'center',
        fontSize: 24,
        color: '#3B82F6'
    },
    input:{
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 10,
        textAlign: 'center',
        marginTop: 30
    },
    boton:{
        marginTop: 30,
        backgroundColor: '#1048A4',
        padding: 10,
        borderRadius: 10
    },
    botonTexto:{
        color: '#FFF',
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold'

    }
})

export default NuevoPresupuesto