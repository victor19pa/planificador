import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { formatearCantidad } from '../helpers'
import globalStyles from '../styles'
import CircularProgress from 'react-native-circular-progress-indicator';

const ControlPresupuesto = ({presupuesto, gastos, resetearApp}) => {
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [ porcentaje, setPorcentaje ] = useState(0)
    //Calculo de porcentaje, usando la suma del total gastado y lo disponible
    useEffect(() =>{
        const totalGastado = gastos.reduce( (total, gasto) => Number(gasto.cantidad) + total, 0)
        const totalDisponible = presupuesto-totalGastado
        //console.log(totalGastado)

        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto)*100
        )
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)    
        }, 500)
        
        setGastado(totalGastado)
        setDisponible(totalDisponible)
    },[gastos])

    return (
        <View style={styles.contenedor}>
            {/***Barra progreso */}
            <View style={styles.centrarGrafica}>
                <CircularProgress 
                    value={ porcentaje }
                    duration={1300}
                    radius={150}
                    valueSuffix={'%'}
                    //valuePrefix={'$'}
                    title='Gastado'
                    inActiveStrokeColor='#F5F5F5'
                    inActiveStrokeWidth={20}
                    activeStrokeColor={'#3B82F6'}
                    activeStrokeWidth={20}
                    titleStyle={{fontWeight: 'bold', fontSize: 20}}
                    titleColor= {'#64748B'}
                />
            </View>
            {/**datos recuadro principal */}
            <View style={styles.contenedorTexto} >
                <Pressable
                    style={styles.boton}
                    onPress={resetearApp}
                >
                    <Text style={styles.txtBoton}>Reiniciar App</Text>
                </Pressable>

                <Text style={styles.valor} >
                    <Text style={styles.label}>Presupuesto: {''}</Text>
                    {formatearCantidad(presupuesto)}
                </Text>

                <Text style={styles.valor}>
                    <Text style={styles.label}>Disponible: {''}</Text>
                    {formatearCantidad(disponible)}
                </Text>

                <Text style={styles.valor}>
                    <Text style={styles.label}>Gastado: {''}</Text>
                    {formatearCantidad(gastado)}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        ...globalStyles.contenedor
    },
    centrarGrafica:{
        alignItems: 'center'
    },
    contenedorTexto:{
        marginTop: 50
    },
    valor:{
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    label:{
        fontWeight: '700',
        color: '#3B82F6'
    },
    boton:{
        backgroundColor: '#DB2777',
        padding: 10,
        borderRadius: 8,
        marginBottom: 40
    },
    txtBoton:{
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default ControlPresupuesto