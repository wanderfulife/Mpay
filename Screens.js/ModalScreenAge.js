import {
	View,
	Image,
	Text,
	TextInput,
	TouchableOpacity,
	Button,
	KeyboardAvoidingView,
  } from "react-native";
  import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
  import { db } from "../firebase";
  import React, { useState } from "react";
  import tw from "twrnc";
  import useAuth from "../hooks/useAuth";
  import { useNavigation } from "@react-navigation/core";

function ModalScreenAge() {

	const navigation = useNavigation();
	const { user } = useAuth();
	const [image, setImage] = useState(null);
	const [job, setJob] = useState();
	const [age, setAge] = useState();
	const [name, setName] = useState();
  
	const incompleteForm = !age ;

	const updateUserProfile = () => {
		setDoc(doc(db, "users", user.uid), {
			id: user.uid,
			age: age,
			timestamp: serverTimestamp(),
		})
		  .then(() => {
			navigation.navigate("ModalPics");
		  })
		  .catch((error) => {
			alert(error.message);
		  });
	  };
	
	  return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10} style={tw`flex-1 items-center bg-white`}>
		
		  <Image
			style={tw`h-20 w-full`}
			resizeMode="contain"
			source={require("../assets/IMG_9482.jpg")}
		  />
		  <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>Step 3/4</Text>
	
		
	   
		  {/* shorturl.at/grvCK */}
	
		
		  <TextInput
			onChangeText={setAge}
			style={tw`text-center text-xl p-12`}
			placeholder="Enter your Age"
		  />
	  
	
		  <TouchableOpacity
			disabled={incompleteForm}
			onPress={updateUserProfile}
			style={[
			  tw`w-64  p-3 rounded-xl absolute bottom-70`,
			  incompleteForm ? tw`bg-gray-400` : tw`bg-red-400`,
			]}
		  >
			<Text style={tw`text-center text-white text-xl`}>Next</Text>
		  </TouchableOpacity>
	   
		</ KeyboardAvoidingView>
	
	  );
	};
	

export default ModalScreenAge