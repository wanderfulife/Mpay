import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core'
import tw from 'twrnc'

const SignUpScreen = () => {

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { handleSignUp } = useAuth();
const navigation = useNavigation();

useLayoutEffect(() => {
	navigation.setOptions({
		headerShown: false,
	});
}, []);

 

  return (
	<View style={tw`flex-1`}>
			<ImageBackground resizeMode='cover' style={tw`flex-1`} source={require("../assets/IMG_9478.jpg")}>
			<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10} style={[tw`absolute bottom-70 `, {marginHorizontal: "23%"}]}>
			<TextInput style={tw`text-center bg-white p-4  rounded-2xl w-50 font-semibold`}
			  placeholder="Email"
			  value={email}
			  onChangeText={text => setEmail(text)}
			/>
			<TextInput style={tw`text-center bg-white p-4 my-2 rounded-2xl w-50 font-semibold`}
			  placeholder="Password"
			  value={password}
			  onChangeText={text => setPassword(text)}
			  secureTextEntry
			/>
	
			<TouchableOpacity
			style={tw`p-2 rounded-2xl my-2 bg-green-400`}
			  onPress={
				  () => {
					  handleSignUp(email,password)
					}}
			  
			>
			  <Text style={tw`text-center text-white font-bold m-2`}>Sign up</Text>
			</TouchableOpacity>
			<TouchableOpacity
			  onPress={
				() => navigation.navigate('Login')}
			  
			>
			  <Text style={tw`text-center text-white font-bold m-2`}>Login</Text>
			</TouchableOpacity>
		  </KeyboardAvoidingView>
			</ImageBackground>
		</View>
  )
}

export default SignUpScreen