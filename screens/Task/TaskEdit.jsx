import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ScrollView} from 'react-native';
import {updateDoc,doc,deleteDoc} from 'firebase/firestore'
import Icon from 'react-native-vector-icons/FontAwesome'
import { db } from '../../firebase';

const TaskEdit = (props) => {

const [updatedTodo,setUpdatedTodo]=useState();

  const [visible , setVisible] = useState(true);

const UpdateTodo= async(id)=>{

  if(updatedTodo===""){
    return Alert.alert('enter Text')
  }
  const update = doc(db,'todoItem',id);
    try{
    
      await updateDoc(update,{
        text:updatedTodo,
        timesstamp:new Date()
      })
      setVisible(!visible)
      Alert.alert('list item updated')
    }catch(err){
      Alert.alert(err.message)
      console.log(err.message)
    }
    setUpdatedTodo('')
 props.getTodos();
}
const deleteTodo = async (id) => {

  try{
    const del = doc(db, 'todoItem', id);
    await deleteDoc(del);
    Alert.alert('list item deleted')
  }catch(err){
    console.log(err.message)
  }
  props.getTodos();
};


  return (

    <View style={styles.editBox}>
     
       <ScrollView style={styles.wrapper}>
       <View >
          {
            visible ?
              
                <View>
                <View  style={styles.list}  > 
              <Text>{props.todo}</Text>   
              <Icon name='pencil' size={20} color='black' onPress={()=>setVisible(false)} />
              <Icon name='remove' size={20} color='black' onPress={()=>deleteTodo(props.delTodo)} />
              </View>
              </View>
              
  :
  <View style={styles.edit}>
  <TextInput placeholder='Enter Todo' value={updatedTodo}   onChangeText={(e)=>setUpdatedTodo(e)} />
     <Icon  name='check' size={20} color='white' onPress={()=>UpdateTodo(props.editTodo)}/>
            </View>
              
               
          }  
          </View>
       </ScrollView>
        
        
       
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  editBox:{
      flexDirection:'column',
      justifyContent:'space-around',
  },
  edit:{
    flexDirection:'row',
    justifyContent:'space-around',
    backgroundColor:'blue',
    height:50,
    alignItems:'center',
    color:'white'
  },
  list:{
    backgroundColor:"red",
    flexDirection:'row',
    height:50,
  
   alignItems:'center',
    justifyContent:"space-around",
    marginTop:20,
 borderRadius:5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});


export default TaskEdit;