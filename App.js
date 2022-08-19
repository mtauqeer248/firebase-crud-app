import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import {HomeScreen} from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const stack = createNativeStackNavigator();
export default function App({navigation}) {
  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='login'>
        <stack.Screen name='login' component={LoginScreen} />
        <stack.Screen name='signup' component={SignupScreen}/>  
        <stack.Screen name='home' component={HomeScreen}/>
        <stack.Screen name='details' component={DetailScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
