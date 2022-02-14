import React, { useEffect, useState } from 'react';
import { Alert,
    Image,
    Modal, 
    Pressable, 
    SafeAreaView, 
    ScrollView, 
    StatusBar, 
    StyleSheet, 
    Text,
    View 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ControlPresupuesto from './src/components/ControlPresupuesto';
import Filtro from './src/components/Filtro';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header';
import ListadoGastos from './src/components/ListadoGastos';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import { generarId } from './src/helpers';

const App = () => {
  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)
  const [ presupuesto, setPresupuesto ] = useState(0)
  const [ gastos, setGastos ] = useState([])
  const [ modal, setModal ] = useState(false)
  const [ gasto, setGasto ] = useState({})
  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState([])

  //Get Presupuesto
  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0
        console.log(presupuestoStorage)

        if(presupuestoStorage>0){
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    obtenerPresupuestoStorage()
  },[])
  //get gastos , obtener
  useEffect(()=> {
    const obtenerGastosStorage = async () =>{
      try {
        const gastosStorage = await AsyncStorage.getItem('planificador_gastos') ?? []
        
        setGastos( gastosStorage ? JSON.parse(gastosStorage) : [])
      } catch (error) {
        console.log(error)
      }
    }
    obtenerGastosStorage()
  },[])
  //set gastos, setear
  useEffect(() => {
    const guardarGastosStorage = async () =>{
      try {
        await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
      } catch (error) {
        console.log(error)
      }
    }
    guardarGastosStorage()
  }, [ gastos ])
  //guardarPresupuesto
  useEffect(() => {
    if(isValidPresupuesto){
      const guardarPresupuestoStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', presupuesto)
        } catch (error) {
          console.log(error)
        }
      }
      guardarPresupuestoStorage()
    }
  },[ isValidPresupuesto ])

  const handleNuevoPresupuesto = (presupuesto) =>{
    if(Number(presupuesto) > 0 ){
      setIsValidPresupuesto(true)
    }else{
      Alert.alert(
        "Error",
        "Presupuesto no puede ser 0 o menor",
        [
          { text: "OK" }
        ]
      );
    }
  }
  const handleGasto = (gasto) => {
    if([gasto.nombre, gasto.categoria, gasto.cantidad].includes('')){
      Alert.alert(
        "Error",
        "Todos los campos son obligatorios"
      );
      return
    }

    if(gasto.id){
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)

      setGastos(gastosActualizados)
    }else{
      gasto.id = generarId()
      gasto.fecha = Date.now()

      setGastos([...gastos, gasto])
    }    
    setModal(!modal) 
  }
  const eliminarGasto = (id) =>{
    Alert.alert(
      "¿Deseas eliminar este registro?",
      "Un gasto eliminado no puede restaurarse",
      [
        { text: 'No', style: 'cancel'},
        { text: 'Si, Eliminar', onPress: () => {
          const gastosActualizados = gastos.filter( gastoState => gastoState.id !== id )

          setGastos(gastosActualizados)
          setModal(!modal)
          setGasto({})
        }}
      ]
    );
  }
  const resetearApp = () =>{
    Alert.alert(
      'Deseas eliminar todos los datos?',
      'Esto eliminara presupuesto y gastos',
      [
        { text: 'No', style: 'cancel'},
        { text: 'Si, Eliminar', onPress: async () => {
            try {
              await AsyncStorage.clear()
              setIsValidPresupuesto(false)
              setPresupuesto(0)
              setGastos([])
            } catch (error) {
              console.log(error)
            }
          }
        }
      ]
    )
  }

  return (
    <View>
      <ScrollView>
      <View style={styles.header}>
        <Header/>
        {/**pantalla ingreso presupuesto o mostrar principal */}
        {isValidPresupuesto ? (
          <ControlPresupuesto
            gastos={gastos}
            presupuesto={presupuesto}
            resetearApp={resetearApp}
          />
        ) : (
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            handleNuevoPresupuesto = { handleNuevoPresupuesto }
          />
        )}
      </View>

      {isValidPresupuesto &&
        <>
          <Filtro
            setFiltro={setFiltro}
            filtro={filtro}
            gastos={gastos}
            setGastosFiltrados={setGastosFiltrados}
          />
          <ListadoGastos
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </>
      }
      </ScrollView>
      
      {modal && (
        <Modal
          animationType='slide'
          visible={modal}
          onRequestClose={()=>{
            setModal(!modal)
          }}
        >
          <FormularioGasto
            setModal={setModal}
            handleGasto={handleGasto}
            setGasto={setGasto}
            gasto={gasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}
      {/**Boton con imagen  para agregar gasto */}
      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
          onPress={() => setModal(!modal)}
        >
          <Image
            style={styles.imagen}
            source={ require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}

      
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#F5F5F5',
    flex: 1 
  },
  header:{
    backgroundColor: '#3B82F6',
    minHeight: 400
  },
  pressable: {
    width: 60,
    height: 60, 
    position: 'absolute',
    bottom: 40,
    right: 30
  },  
  imagen: {
    width: 60,
    height: 60
  }
});

export default App;
