import { StyleSheet, Text, TextInput, TouchableOpacity, View,Button ,Alert,Keyboard} from 'react-native'
import React, { useState } from 'react'
import {auth} from '../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'


const LoginScreen = ({navigation}) => {
    //const navigation =useNavigation()
   const [email,setEmail] =useState('')
   const [errors,setErrors] = useState('')
   const [emailError,setEmailError] = useState('')
   const [passwordError,setPasswordError] = useState('')
   const [password,setPassword] =useState('')
  const validate = ()=>{
    Keyboard.dismiss();
    let isValid= true;
    if(email===''){
      setEmailError('enter email')
      isValid= false
      }else if (email.match('/\S+@\S+\.\S+/')){
        setEmailError('enter valid email')
      isValid= false;
      
    }
    if(password===""){
      setPasswordError('enter password')
      isValid= false;
    }
    if(isValid){
      handleSubmit()
    }
  }
  
   const handleSubmit=async()=>{
   
    try{
      const isUserLogin= await signInWithEmailAndPassword(auth,email,password);
      console.log(isUserLogin)
       navigation.navigate('home',{
         email:isUserLogin.user.email,
         uid:isUserLogin.user.uid,
       })
   }catch(error){
    let varcode= error.code;
    if(varcode=="auth/invalid-email"){
      setErrors('invalid email')
      setEmail('')
      setPassword('')
    }if(varcode=="auth/wrong-password"){
      setErrors('wrong password')
      setPassword('')
    }if(varcode=="auth/user-not-found"){
      setErrors('invalid user')
      setEmail('')
      setPassword('')
    }
   }
    
   }
   
  
    

  return (
    <View style={styles.container}>
    <View >
      <Text>Login Screen</Text>
    
      <View >
      <TextInput style={styles.inputfeild} 
      placeholder='Enter Email' value={email}
       onChangeText={text=>setEmail(text)} />
        {emailError &&
      <Text style={styles.errorMessage}>{emailError}</Text>
      } 
    </View>                                                                                                      
    
     
    <View>
        <TextInput style={styles.inputfeild} placeholder='Enter Password' 
         secureTextEntry value={password} onChangeText={text=>setPassword(text)}/>
          {passwordError &&
      <Text style={styles.errorMessage}>{passwordError}</Text>
      } 
      </View>

    
      <View style={styles.button}>
       
            <Button title='login' onPress={validate}/>
       
      </View>       
      {errors &&
      <Text style={styles.errorMessage}>{errors}</Text>
      }                                                    
      <View>
        <TouchableOpacity>
            <Text onPress={()=>navigation.navigate('signup')}>Don't have Account ? SignUp</Text>
        </TouchableOpacity>
      
      </View>
      </View>
      </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  flexDirection:'column',
  borderColor:'black',
  justifyContent:'center'
  },
  errorMessage:{
    color:'red'
  },
  
  loginContainer: {
    width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    width: '100%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',

    borderRadius: 10,
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