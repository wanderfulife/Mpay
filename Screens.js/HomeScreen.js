import { Text, SafeAreaView, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc'
import { Entypo, Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swiper from "react-native-deck-swiper"
import { collection, doc, getDoc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../firebase'
import generateId from '../lib/generateId'





const HomeScreen = () => {

	const navigation = useNavigation();
	const {user, logout } = useAuth();
	const [profiles , setProfiles] = useState([]);
	const swipeRef = useRef(null);
	const [profilePics, setProfilePics] = useState(null)





	useLayoutEffect(
		() => 
		onSnapshot(doc(db, 'users', user.uid), snapshot => {
		  if (!snapshot.exists()) {
			  navigation.navigate("Modal");
		  }
	  }),
	 []
	)

	useEffect(() => {
		let unsub;


	const getPicture = async () => {
		const picture =  await ( 
			await getDoc(doc(db, 'users', user.uid))
			).data();
			setProfilePics(picture.photoURL)
	}
	

		const fetchChards = async () => {

			const passes = await getDocs(collection(db, 'users', user.uid , "passes")).then
			(snapshot => snapshot.docs.map((doc) => doc.id)
			);

			const swipes = await getDocs(collection(db, 'users', user.uid , "swipes")).then
			(snapshot => snapshot.docs.map((doc) => doc.id)
			);

			const passedUserIds = passes.length > 0 ? passes : ['test'];
			const swipedUserIds = swipes.length > 0 ? swipes : ['test'];

			

			
			

			unsub = onSnapshot(query(collection(db, "users"), where('id', 'not-in', [...passedUserIds, ...swipedUserIds])),
			(snapshot) => {
				setProfiles(
					snapshot.docs.filter(doc => doc.id != user.uid).map(doc => ({
						id: doc.id,
						...doc.data()
					}))
				)
			})
		}

		fetchChards();
		getPicture();
		return unsub;
	}, [db])


	const swipeLeft = (cardIndex) => {
		if (!profiles[cardIndex]) return;

		const userSwiped = profiles[cardIndex];
		console.log(`You swiped PASS on ${userSwiped.displayName}`)
		
		setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id),
		userSwiped);
	};

	const swipeRight = async (cardIndex) => {
		if (!profiles[cardIndex]) return;

		const userSwiped = profiles[cardIndex];
		const loggedInProfile = await ( 
			await getDoc(doc(db, 'users', user.uid))
			).data();

		getDoc(doc(db, 'users', userSwiped.id, 'swipes', user.uid)).then(
			(DocumentSnapshot) => {
				if (DocumentSnapshot.exists()) {

				console.log(`Hooray you MATCHED with ${userSwiped.displayName}`);

				setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id), userSwiped);

				setDoc(doc(db, 'matches', generateId(user.uid, userSwiped.id)), {
					users: {
						[user.uid]: loggedInProfile,
						[userSwiped.id]: userSwiped
					},
					usersMatched: [user.uid, userSwiped.id],
					timestamp: serverTimestamp()
				});

				navigation.navigate('Match', {
					loggedInProfile,
					userSwiped,
				});

				} else {

					console.log(`You swiped on ${userSwiped.displayName} (${userSwiped.job})`);
					setDoc(doc(db, "users", user.uid, "swipes", userSwiped.id),userSwiped);
				}
			})


		
	};

	return (
	<SafeAreaView style={tw`flex-1`}>

		{/* header */}
		<View style={tw`flex-row items-center justify-between px-5`}>
			<TouchableOpacity onPress={logout}>
				<Image style={tw`h-10 w-10 rounded-full`} source={{uri: profilePics}} />
			</TouchableOpacity>

			<TouchableOpacity onPress={()=> navigation.navigate("Modal")}>
				<Image style={tw`h-13 w-13 m-2`} source={require("../assets/IMG_9327.jpg")}></Image>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate('Chat')}>
				<Ionicons name='chatbubbles-sharp' size={30} color="#EB7773"/>
			</TouchableOpacity>
		</View>


		{/* End of header */}

		{/* Cards */}

	  {/* <Text>I am the HomeScreen</Text>
	  <Button title="Go to chat screen" onPress={() => navigation.navigate("Chat") }/>
	  <Button title="Logout" onPress={logout}/> */}
	<View style={tw`flex-1 -mt-6`}>
	  <Swiper 
	  ref={swipeRef}
	  containerStyle={{ backgroundColor: "transparent" }}
	  cards={profiles}
	  stackSize={5}
	  cardIndex={0}
	  animateCardOpacity
	  verticalSwipe={false}
	  onSwipedLeft={(cardIndex)=>{
		  console.log('Swipe PASS');
		  swipeLeft(cardIndex);
	  }}
	  onSwipedRight={(cardIndex)=>{
		console.log('Swipe MATCH');
		swipeRight(cardIndex);
	}}
	  backgroundColor={"#4FD0E9"}
	  overlayLabels={{
		  left: {
			  title: 'no',
			  style : {
				  label: {
					  textAlign: "right",
					  color: 'red'
				  },
			  },
		  },
		  right: {
			title: 'yes',
			style : {
				label: {
					color: '#4DED30'
				},
			},
		}
	  }}
	  renderCard={(card)=> card ?(
		  <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
			  <Image 
			  style={tw`absolute top-0 h-full w-full rounded-xl`} 
			  source={{uri: card.photoURL}}/>
			  <View style={[tw`absolute bottom-0 bg-white w-full flex-row items-center justify-between
			    h-20 px-6 py-2 rounded-b-xl`,
				styles.cardShadow
				]}
				>
				  <View>
					  <Text style={tw`text-xl font-bold`}>{card.displayName} {card.lastName}</Text>
					  <Text>
						  {card.job}
					  </Text>
				  </View>
				  <Text style={tw`text-xl font-bold`}>{card.age}</Text>
			  </View>
		  </View>
		) : (
			<View
			style={[tw`relative bg-white h-3/4 rounded-xl justify-center items-center`,
			styles.cardShadow,
			]}
			>
			<Text style={tw`font-bold pb-5`}>No more profiles</Text>

			<Image
				style={tw`h-20 w-full`}
				height={100}
				width={100}
				source={{ uri: "https://links.papareact.com/6gb" }}
			/>
			</View>
		)}
		  />
	</View>

	<View style={tw`flex flex-row justify-evenly`}>
		<TouchableOpacity
		onPress={() => swipeRef.current.swipeLeft()}
		style={tw`absolute bottom-6 left-20 items-center justify-center rounded-full w-16 h-16 bg-red-200`}>
			<Entypo name='cross' color='red' size={24}/>
		</TouchableOpacity>
		<TouchableOpacity 
		onPress={() => swipeRef.current.swipeRight()}
		style={tw`absolute bottom-6 right-20 items-center justify-center rounded-full w-16 h-16 bg-green-200`}>
			<MaterialCommunityIcons name="cash-fast" size={24} color="green" />
		</TouchableOpacity>
	</View>
	</SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
	cardShadow : {
		shadowColor: '#000',
		shadowOffset: {
			width:0,
			height:1
		},
		shadowOpacity: 0.2,
		shadowRadius: 1.41,

		elevation: 2,
	}
})