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
import useAuth  from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";

const ModalScreen = () => {
  const navigation = useNavigation();
  const { setName } = useAuth();
  
  // const incompleteForm = !name ;

  const updateUserProfile = () => {
        navigation.navigate("ModalJob");
};

  return (
	<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={10} style={tw`flex-1 items-center bg-white`}>
    
      <Image
        style={tw`h-20 w-full`}
        resizeMode="contain"
        source={require("../assets/IMG_9482.jpg")}
      />
      <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>Step 1 / 4</Text>

    
   
      {/* shorturl.at/grvCK */}

    
      <TextInput
        onChangeText={setName}
        style={tw`text-center text-xl p-12`}
        placeholder="Enter your name"
      />
  

      <TouchableOpacity
        // disabled={incompleteForm}
        onPress={updateUserProfile}
        style={tw`w-64  p-3 rounded-xl absolute bottom-70 bg-red-400`}
      >
        <Text style={tw`text-center text-white text-xl`}>Next</Text>
      </TouchableOpacity>
   
	</ KeyboardAvoidingView>

  );
};

export default ModalScreen;
