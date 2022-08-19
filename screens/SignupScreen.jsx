import { StyleSheet, Text, View,TextInput,Button,Keyboard,TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import {auth} from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, 'Invalid name!')
    .required('Name is required!'),
  email: Yup.string().email('Invalid email!').required('Email is required!'),
  password: Yup.string()
    .trim()
    .min(8, 'Password is too short!')
    .required('Password is required!'),
  confirmPassword: Yup.string().equals(
    [Yup.ref('password'), null],
    'Password does not match!'
  ),
});


const SignupScreen = ({navigation}) => {
  const [errors,setErrors] =useState('')
    const [email,setEmail] = useState('');
    const[password,setPassword]= useState('');
    const [name,setName]= useState('')


   const validate = async()=>{
    Keyboard.dismiss();
    let isValid= true;
    if(email===''){
      Alert.alert('enter email')
      isValid= false
      }else if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        Alert.alert('enter valid email')
      isValid= false;
      
    }
    if(name===""){
      Alert.alert('enter fullname')
      isValid=false
    }
    if(password===""){
      Alert.alert('enter password')
      isValid= false;
    }else if(password.length <8){
      Alert.alert('Min password length of 8',"password");
      isValid= false
    }
    if(isValid){
      HandleSignup();
    }
   }
    const HandleSignup=async(e)=>{
  
        try{
            const isUserCreated =await createUserWithEmailAndPassword(auth,email,password);
            navigation.navigate('home');
            console.log(isUserCreated)
        }catch(error){
            console.log(error.message);
          Alert.alert('invalid Email or password')
           
        }
    }
  return (
   
        <View style={styles.container}>
            <View>
            <TextInput style={styles.inputfeild} placeholder='Enter Name' error={errors.name} value={name} onChangeText={text=>setName(text)} />
          </View>
          <View>
            <TextInput style={styles.inputfeild}error={errors.email} placeholder='Enter Email' value={email} onChangeText={text=>setEmail(text)} />
          </View>                                                                                                      
          <View>
            <TextInput style={styles.inputfeild} error={errors.password} placeholder='Enter Password' secureTextEntry value={password} onChangeText={text=>setPassword(text)}/>
          </View>
          <View  style={styles.button}>
           
                <Button title='Signup' onPress={validate}/>
            
          </View>                                                           
          <View>
            <TouchableOpacity>
                <Text onPress={()=>navigation.navigate('login')}>Already have Account ? Login</Text>
            </TouchableOpacity>
          </View>
        </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  flexDirection:'column',
  borderColor:'black',
  justifyContent:'center',
  padding: 10,
  },
  inputfeild:{
    height:30,
    width:300,
    justifyContent:'center',
  
    marginBottom:20,

  },
  button:{
    height:40,
    width:100,
    marginBottom:10,
    marginTop:20,
  }
})