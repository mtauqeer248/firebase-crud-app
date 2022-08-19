
import { Alert, StyleSheet, Button, TextInput, View } from 'react-native';
import {getDocs,collection,addDoc} from 'firebase/firestore'
import {db} from '../firebase';
import TaskEdit from './Task/TaskEdit';
import React,{useEffect, useState} from 'react';

export  function HomeScreen() {
  const todoCollectionRef = collection(db, "todoItem")
  const [todoItem,setTodoItem] =useState([]);
  const [todo,setTodo] =useState('')
  useEffect(() => {
    getTodos();
}, []);

const getTodos = async () => {
  try{
    const data = await getDocs(todoCollectionRef);
    setTodoItem(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }catch(err){
    console.log(err.message)
  }
};
const AddTodo = async (e) => {
  e.preventDefault(e);
  if(todo===""){
    return Alert.alert('enter Text')
  }
  try {
    const DocRef = await addDoc(todoCollectionRef, {
      text: todo,
      timesstamp:new Date(),
    })
    console.log('TodoItem', DocRef.id);
  } catch (err) {
    console.log(err.message)
    Alert.alert(err.message)
  }
  setTodo('')
  getTodos();
}

  return (
    <>
    <View>

           <TextInput placeholder='enter todo' value={todo} onChangeText={(text) => setTodo(text)} />
      <Button title="Add" onPress={AddTodo} />
     </View>
    <View>
              {
                todoItem.map((todos)=>{
                  return(
                    <View>
                          <TaskEdit key={todos.id} id={todos.id} todo={todos.text} delTodo={todos.id} editTodo={(todos.text,todos.id)} getTodos={()=>getTodos()} />
                    </View>
                  )
                })
              }
              
     
  
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBox:{
      flexDirection:'row',
      justifyContent:'space-around',
  },
  list:{
    backgroundColor:"red",
    flexDirection:'row',
    height:50,
    width:200,
    paddingTop: 22,
    paddingLeft:20,
    paddingRight:20,
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
})