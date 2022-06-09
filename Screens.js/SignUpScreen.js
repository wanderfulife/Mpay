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
			<ImageBackground resizeMode='cover' style={tw`flex-1`} source={require("../assets/IMG_9325.jpg")}>
			<KeyboardAvoidingView behavior='padding' style={[tw`absolute bottom-50 `, {marginHorizontal: "23%"}]}>
			<TextInput style={tw`text-center bg-white p-4 m-1 rounded-2xl w-50 font-semibold`}
			  placeholder="Email"
			  value={email}
			  onChangeText={text => setEmail(text)}
			/>
			<TextInput style={tw`text-center bg-white p-4 m-1 rounded-2xl w-50 font-semibold`}
			  placeholder="Password"
			  value={password}
			  onChangeText={text => setPassword(text)}
			  secureTextEntry
			/>
	
			<TouchableOpacity
			  onPress={
				  () => {
					  handleSignUp(email,password)
					}}
			  
			>
			  <Text style={tw`text-center text-white font-bold m-1`}>Sign up</Text>
			</TouchableOpacity>
		  </KeyboardAvoidingView>
			</ImageBackground>
		</View>
  )
}

export default SignUpScreen