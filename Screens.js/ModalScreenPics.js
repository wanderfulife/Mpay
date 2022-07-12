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


const ModalScreenPics = () => {
	const navigation = useNavigation();
	const { user, job, age, name, choice } = useAuth();
	const [image, setImage] = useState(null);

	const profile = {
		id: user.uid,
		displayName: name,
		photoURL: image,
		job: job,
		age: age,
		research: choice,
		timestamp: serverTimestamp(),
	}

	const updateUserProfile = () => {
		setDoc(doc(db, "users", user.uid), {
		  id: user.uid,
		  displayName: name,
		  photoURL: image,
		  job: job,
		  age: age,
		  research: choice,
		  timestamp: serverTimestamp(),
		})
		  .then(() => {
			if (profile.research === "employer"){
				setDoc(doc(db, "employer", user.uid), profile);
			} else {
				setDoc(doc(db, "employee", user.uid), profile);
			}
			navigation.navigate("Home");
		  })
		  .catch((error) => {
			alert(error.message);
		  })	  
	  };

	  
		
	
	
  
	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10} style={tw`flex-1 items-center bg-white`}>
		
		  <Image
			style={tw`h-20 w-full`}
			resizeMode="contain"
			source={require("../assets/IMG_9482.jpg")}
		  />
		  <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>Step 5 / 5</Text>
	
		
	   
		  {/* shorturl.at/grvCK */}
	
		
		  <TextInput
			onChangeText={setImage}
			style={tw`text-center text-xl p-12`}
			placeholder="Choose a Profile Picture"
		  />
	  
	
		  <TouchableOpacity
			onPress={updateUserProfile}
			style={[
			  tw`w-64  p-3 rounded-xl absolute bottom-70 bg-red-400`,
			]}
		  >
			<Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
		  </TouchableOpacity>
	   
		</ KeyboardAvoidingView>
	
	  );
  };

export default ModalScreenPics