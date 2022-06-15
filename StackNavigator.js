import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens.js/HomeScreen';
import ChatScreen from './Screens.js/ChatScreen';
import LoginScreen from './Screens.js/LoginScreen';
import useAuth from './hooks/useAuth';
import ModalScreen from './Screens.js/ModalScreen';
import SignUpScreen from './Screens.js/SignUpScreen';
import MatchedScreen from './Screens.js/MatchedScreen'



const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const { user } = useAuth();

  return (
	<Stack.Navigator
	screenOptions={{
		headerShown: false
	}}
	>
		{user ? (
			<>
			<Stack.Group>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Chat" component={ChatScreen} />
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: "modal"}}>
				<Stack.Screen name="Modal" component={ModalScreen} />
			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: "transparentModal"}}>
				<Stack.Screen name="Match" component={MatchedScreen} />
			</Stack.Group>
			</>
		) : (
			<>
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Signup" component={SignUpScreen} />
			</>	
		)}
	</Stack.Navigator>
  )
}

export default StackNavigator