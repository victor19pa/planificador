import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import globalStyles from '../styles'

const FormularioGasto = ({setModal, handleGasto, setGasto, gasto}) => {
    const [ nombre, setNombre ] = useState('')
    const [ categoria, setCategoria ] = useState('')
    const [ cantidad, setCantidad ] = useState('')
    const [ id, setId] = useState('')

    useEffect(() => {
        if(gasto?.nombre){
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad)
            setCategoria(gasto.categoria)
            setId(gasto.id)
        }
    }, [gasto])

    return (
        <SafeAreaView style={styles.contenedor}>
            <View >
                <Pressable 
                    style={styles.btnCancelar}
                    onPress={()=>{
                        setModal(false)
                        setGasto({})
                    }}
                >
                    <Text style={styles.btnCancelarTexto}>Cancelar</Text>
                </Pressable>
            </View>

            <View style={styles.formulario}>
                <Text style={styles.titulo}>
                    {gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}    
                </Text>
                <View style={styles.campo}>
                    <Text style={styles.label}>Nombre Gasto:</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='Nombre Gasto'
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Cantidad Gasto:</Text>
                    <TextInput 
                        style={styles.input}
                        keyboardType='numeric'
                        placeholder='Cantidad Gasto'
                        value={cantidad}
                        onChangeText={setCantidad}
                    />
                </View>
                <View style={styles.campo}>
                    <Text style={styles.label}>Categoria Gasto:</Text>
                    <Picker 
                        style={styles.input}
                        selectedValue={categoria}
                        onValueChange={(value) => {
                            setCategoria(value)
                        }}
                    >
                        <Picker.Item label="--Seleccione--" value=""/>
                        <Picker.Item label="Ahorro" value="ahorro"/>
                        <Picker.Item label="Comida" value="comida"/>
                        <Picker.Item label="Casa" value="casa"/>
                        <Picker.Item label="Gastos Varios" value="gastos"/>
                        <Picker.Item label="Entretenimiento" value="entretenimiento"/>
                        <Picker.Item label="Salud" value="salud"/>
                        <Picker.Item label="Suscripciones" value="suscripciones"/>
                    </Picker>
                </View>
                <Pressable 
                    style={styles.submitBtn}
                    onPress={()=> handleGasto({nombre, cantidad, categoria})}
                >
                    <Text style={styles.submitBtnTexto}>
                        {gasto?.nombre ? 'Editar Gasto' : 'Agregar Gasto'}
                    </Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contenedor:{
        backgroundColor: '#1E40AF',
        flex: 1
    },
    btnCancelar:{
        backgroundColor: '#DB2777',
        padding: 10,
        marginTop: 50,
        marginHorizontal: 10,
        borderRadius: 10
    },
    btnCancelarTexto:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF'
    },
    formulario:{
        ...globalStyles.contenedor
    },
    titulo:{
        textAlign:'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#64748B'
    },
    campo:{
        marginVertical: 10
    },
    label:{
        color: '#64748B',
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold'
    },
    input:{
        backgroundColor: '#F5F5F5',
        padding: 10,
        borderRadius: 10,
        marginTop: 10
    },
    submitBtn:{
        backgroundColor: '#3B82F6',
        marginTop: 20,
        padding: 20,
        borderRadius: 10
    },
    submitBtnTexto:{
        textAlign: 'center',
        color: '#FFF',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default FormularioGasto