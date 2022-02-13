import React, { useState } from 'react';
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
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import Header from './src/components/Header';
import ListadoGastos from './src/components/ListadoGastos';
import NuevoPresupuesto from './src/components/NuevoPresupuesto';
import { generarId } from './src/helpers';

const App = () => {
  const [ isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [presupuesto, setPresupuesto] = useState(0)
  const [gastos, setGastos] = useState([])
  const [ modal, setModal ] = useState(false)

  const handleNuevoPresupuesto = (presupuesto) =>{
    if(Number(presupuesto) > 0 ){
      setIsValidPresupuesto(true)
    }else{
      console.log('Error')
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
    if(Object.values(gasto).includes('')){
      Alert.alert(
        "Error",
        "Todos los campos son obligatorios"
      );
      return
    }

    //añadir el nuevo gasto al state
    gasto.id = generarId()
    setGastos([...gastos, gasto])
    console.log(gastos)
    setModal(!modal)
    
  }

  return (
    <View>
      <View style={styles.header}>
        
        <Header/>

        {isValidPresupuesto ? (
          <ControlPresupuesto
            gastos={gastos}
            presupuesto={presupuesto}
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
        <ListadoGastos
          gastos={gastos}
        />
      }
      
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
          />
        </Modal>
      )}

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
    backgroundColor: '#3B82F6'
  },
  pressable: {
    width: 60,
    height: 60, 
    position: 'absolute',
    bottom: -200,
    right: 30
  },  
  imagen: {
    width: 60,
    height: 60,
  }
});

export default App;
