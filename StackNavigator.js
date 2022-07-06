import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens.js/HomeScreen';
import ChatScreen from './Screens.js/ChatScreen';
import LoginScreen from './Screens.js/LoginScreen';
import useAuth from './hooks/useAuth';
import ModalScreen from './Screens.js/ModalScreen';
import SignUpScreen from './Screens.js/SignUpScreen';
import MatchedScreen from './Screens.js/MatchedScreen'
import MessageScreen from './Screens.js/MessageScreen';
import ModalScreenPics from './Screens.js/ModalScreenPics';
import ModalScreenJob from './Screens.js/ModalScreenJob';
import ModalScreenAge from './Screens.js/ModalScreenAge';



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
				<Stack.Screen name="Message" component={MessageScreen} />

			</Stack.Group>
			<Stack.Group screenOptions={{ presentation: "modal"}}>
				<Stack.Screen name="Modal" component={ModalScreen} />
				<Stack.Screen name="ModalPics" component={ModalScreenPics} />
				<Stack.Screen name="ModalJob" component={ModalScreenJob} />
				<Stack.Screen name="ModalAge" component={ModalScreenAge} />




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