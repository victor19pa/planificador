import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Gasto from './Gasto'


const ListadoGastos = ({gastos, setModal, setGasto, filtro, gastosFiltrados}) => {
    return (
    <View style={styles.contenedor}>
        <Text style={styles.titulo}>Gastos</Text>
        {/***recorrer los gastos para mostrar */}
        { filtro ? gastosFiltrados.map( gasto => (
            <Gasto
                key={gasto.id}
                gasto={gasto}
                setModal={setModal}
                setGasto={setGasto}
            />
        )): gastos.map( gasto => (
            <Gasto
                key={gasto.id}
                gasto={gasto}
                setModal={setModal}
                setGasto={setGasto}
            />
        ))}
        {/***Evaluar si no hay gastos para mostrar el label "NO HAY GASTOS" */}
        { (gastos.length === 0 || (gastosFiltrados.length === 0 && !!filtro)) &&(
                <Text style={styles.noGastos}>No hay gastos</Text>
            )
        }
    </View>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        marginTop: 30,
        marginBottom: 100
    },
    titulo:{
        color: '#64748B',
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20
    },
    noGastos:{
        marginTop: 20,
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 20
    }
})

export default ListadoGastos