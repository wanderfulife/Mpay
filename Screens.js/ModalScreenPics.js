import {
  Image,
  Text,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import { doc, serverTimestamp, setDoc } from "@firebase/firestore";
import { db, storage, ref, uploadBytes, getDownloadURL } from "../firebase";
import React, { useState } from "react";
import tw from "twrnc";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/core";
import * as ImagePicker from "expo-image-picker";

const ModalScreenPics = () => {
  const navigation = useNavigation();
  const { user, job, age, name, choice } = useAuth();
  const [imageUrl, setimageUrl] = useState("");

  const profile = {
    id: user.uid,
    displayName: name,
    photoURL: imageUrl,
    job: job,
    age: age,
    research: choice,
    timestamp: serverTimestamp(),
  };

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      displayName: name,
      photoURL: imageUrl,
      job: job,
      age: age,
      research: choice,
      timestamp: serverTimestamp(),
    })
      .then(() => {
        if (profile.research === "employer") {
          setDoc(doc(db, "employer", user.uid), profile);
        } else {
          setDoc(doc(db, "employee", user.uid), profile);
        }
        navigation.navigate("Home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

	setimageUrl(result.uri);


    if (!result.cancelled) {
      reference = ref(storage, user.uid);
      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(reference, bytes);
      await getDownloadURL(reference).then((x) => {
        setimageUrl(x);
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={10}
      style={tw`flex-1 items-center bg-white`}
    >
      <Image
        style={tw`h-20 w-full`}
        resizeMode="contain"
        source={require("../assets/IMG_9482.jpg")}
      />
      <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>Step 5 / 5</Text>

      {/* shorturl.at/grvCK */}

      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
      ) : null}

      <TouchableOpacity
        onPress={updateUserProfile}
        style={[tw`w-64  p-3 rounded-xl absolute bottom-50 bg-red-400`]}
      >
        <Text style={tw`text-center text-white text-xl`}>Update Profile</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ModalScreenPics;
