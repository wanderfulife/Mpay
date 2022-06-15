import { View, Image, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import { doc, serverTimestamp, setDoc } from "@firebase/firestore"
import { db } from "../firebase"
import React, { useState } from 'react'
import tw from 'twrnc'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/core'
import * as ImagePicker from 'expo-image-picker';



const ModalScreen = () => {



const navigation = useNavigation()
const { user } = useAuth();
const [image, setImage] = useState(null);
const [job, setJob] = useState();
const [age, setAge] = useState();
const [name, setName] = useState();

const incompleteForm =  !job || !age || !name;

//shorturl.at/vKRSZ

// const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

// 	console.log(result);

//     if (!result.cancelled) {
//       setImage(result.uri);
//     }
//   };




const updateUserProfile = () => {
	setDoc(doc(db,'users', user.uid), {
		id: user.uid,
		displayName: name,
		photoURL: image,
		job: job,
		age: age,
		timestamp: serverTimestamp()
	}).then(() => {
		navigation.navigate('Home');
	}).catch(error => {
		alert(error.message); 
	})
};

  return (
	<View style={tw`flex-1 items-center pt-1`}>
	  <Image
	  style={tw`h-20 w-full`}
	  resizeMode="contain"
	  source={require("../assets/IMG_9331.jpg")}
	  />
	  <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>
		  welcome {name}
	  </Text>

	  <Text style={tw`text-center p-4 font-bold text-red-400`}>
		Step 1: The Profile Picture
	  </Text>
	
	  <TextInput 
	  value={image}
	  onChangeText={setImage}
	  	style={tw`text-center text-xl pb-2`}
		placeholder="Enter your imageURL"

	  />

<Text style={tw`text-center p-4 font-bold text-red-400`}>
		Step 2: The Age
	  </Text>
	  <TextInput 
	  value={age}
	  onChangeText={setAge}
	  	style={tw`text-center text-xl pb-2`}
		placeholder="Enter your age"
		maxLength={2}
		keyboardType="numeric"
	  />
	  {/* shorturl.at/grvCK */}

<Text style={tw`text-center p-4 font-bold text-red-400`}>
		Step 3: The Name
	  </Text>
	  <TextInput 
	  value={name}
	  onChangeText={setName}
	  	style={tw`text-center text-xl pb-2`}
		  placeholder="Enter your name"
	  />

		<Text style={tw`text-center p-4 font-bold text-red-400`}>
		Step 4: The Job
	  </Text>
	  <TextInput 
	  value={job}
	  onChangeText={setJob}
	  	style={tw`text-center text-xl pb-2`}
		  placeholder="Enter your occupation"
	  />

		

	  <TouchableOpacity 
	 	disabled={incompleteForm} 
		onPress={updateUserProfile}
	 	style={[tw`w-64  p-3 rounded-xl absolute bottom-10`, 
		incompleteForm? tw`bg-gray-400`: tw`bg-red-400`]}
		>
		  <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
	  	</TouchableOpacity>
	</View>
  )
}

export default ModalScreen