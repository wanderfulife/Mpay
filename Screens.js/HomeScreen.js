import { Text, Button, SafeAreaView, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useLayoutEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/core'
import useAuth from '../hooks/useAuth'
import tw from 'twrnc'
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Swiper from "react-native-deck-swiper"

export const DUMMY_DATA = [
	{
		firstName: "Waldeck",
		lastName : "Ray",
		occupation : "Manager",
		photoURL : "https://instagram.fsyd5-1.fna.fbcdn.net/v/t51.2885-15/271488792_971943813462506_5760556957299882870_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=instagram.fsyd5-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Ouzc0sRgnCwAX-4IlKf&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjc0NjM2ODU0OTQxNTkzNzA3Ng%3D%3D.2-ccb7-5&oh=00_AT_mGP57y4XFpvG7AnILAkpdbEeIeupOPvZylHRgy9IiFA&oe=62906EFF&_nc_sid=30a2ef",
		age : 32,
		id : 123
	},
	{
		firstName: "Annabelle",
		lastName : "De Barroszer",
		occupation : "Floor Manager",
		photoURL : "https://scontent.fsyd5-1.fna.fbcdn.net/v/t1.18169-9/480524_4247239453263_285297353_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=de6eea&_nc_ohc=LYMXfLzfa9kAX9ODEr5&tn=gl0y96iNgmUCX24i&_nc_ht=scontent.fsyd5-1.fna&oh=00_AT_KcHm4m9RtMPvCFRxz1IQTSKAIDp0kZFSm616R13302w&oe=62AE3241",
		age : 12,
		id : 456
	},
	{
		firstName: "Ilian",
		lastName : "Sakhrani",
		occupation : "Cook",
		photoURL : "https://instagram.fsyd5-1.fna.fbcdn.net/v/t51.2885-15/241765652_648783619360626_6432554868092165677_n.jpg?stp=dst-jpg_e35_p480x480&_nc_ht=instagram.fsyd5-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=xNW5XEbjduUAX-x0wro&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjY2MTQxNDcxNjI3NDI0Mzg0NQ%3D%3D.2-ccb7-5&oh=00_AT_IVyXhe2v3VYCjjrkvoxvDVrvdfRExIVpUEWS90ZOURQ&oe=6292B900&_nc_sid=30a2ef",
		age : 22,
		id : 789
	},
	{
		firstName: "Zak",
		lastName : "Klausner",
		occupation : "Waiter",
		photoURL : "https://scontent.fsyd5-1.fna.fbcdn.net/v/t1.18169-9/13343153_10154888146294829_4787532410768874240_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=0O99kHb1J_gAX-zGj8k&tn=gl0y96iNgmUCX24i&_nc_ht=scontent.fsyd5-1.fna&oh=00_AT9fbnX-YtR000mOTcEIt6UKp119zflYqlP5EQ3NGVl7_g&oe=62AF0C12",
		age : 38,
		id : 789
	},
	{
		firstName: "Mathilde",
		lastName : "Dominique",
		occupation : "Waitress",
		photoURL : "https://instagram.fsyd5-1.fna.fbcdn.net/v/t51.2885-15/72532315_139569797327631_1027811079743607424_n.jpg?stp=dst-jpg_e35&_nc_ht=instagram.fsyd5-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=N6wJvwzip0MAX8BII6q&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjE0OTUxMDExODY4ODU0NDU1NA%3D%3D.2-ccb7-5&oh=00_AT_bAFBEe0AJF638ADaCpkn3EtLUxeawAkdL8qtiWa0G_g&oe=6292229E&_nc_sid=30a2ef",
		age : 23,
		id : 789
	},
	{
		firstName: "Jonathan",
		lastName : "Wander",
		occupation : "Bartender",
		photoURL : "https://instagram.fsyd5-1.fna.fbcdn.net/v/t51.2885-15/126212263_965711937284731_4273665339525301938_n.jpg?stp=dst-jpg_e35_s640x640_sh0.08&_nc_ht=instagram.fsyd5-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=mhOeG8rWUMoAX_3yRAz&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=MjQ0NzgzODY0NDMxMTUxMTEwNg%3D%3D.2-ccb7-5&oh=00_AT87hWfPzXuptPPB5zWUPw3ELOawNreudUpSbXp9Du42VQ&oe=629290C3&_nc_sid=30a2ef",
		age : 30,
		id : 789
	},
	{
		firstName: "Waldzer",
		lastName : "Rayzer",
		occupation : "Manager",
		photoURL : "https://instagram.fsyd5-1.fna.fbcdn.net/v/t51.2885-15/271488792_971943813462506_5760556957299882870_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08&_nc_ht=instagram.fsyd5-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Ouzc0sRgnCwAX-4IlKf&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjc0NjM2ODU0OTQxNTkzNzA3Ng%3D%3D.2-ccb7-5&oh=00_AT_mGP57y4XFpvG7AnILAkpdbEeIeupOPvZylHRgy9IiFA&oe=62906EFF&_nc_sid=30a2ef",
		age : 32,
		id : 983
	},
]



const HomeScreen = () => {

	const navigation = useNavigation();
	const {user, logout } = useAuth();
	const swipeRef = useRef(null);




	return (
	<SafeAreaView style={tw`flex-1`}>

		{/* header */}
		<View style={tw`flex-row items-center justify-between px-5`}>
			<TouchableOpacity onPress={logout}>
				<Image style={tw`h-10 w-10 rounded-full`} source={{uri:"https://instagram.fsyd5-1.fna.fbcdn.net/v/t51.2885-15/283346331_1007706799929558_7531566825738411971_n.jpg?stp=dst-jpg_e35_p750x750_sh0.08&_nc_ht=instagram.fsyd5-1.fna.fbcdn.net&_nc_cat=106&_nc_ohc=kq38494yq2kAX9tvIVC&tn=1qWg8LadzTAUevzR&edm=ALQROFkBAAAA&ccb=7-5&ig_cache_key=Mjg0NDMzMTcyMzQyNjg5Mjc5MQ%3D%3D.2-ccb7-5&oh=00_AT-M2bQxjX4M7_xPmLsIvqyIP7x8aHpD8UVIhayzh_fhWA&oe=6294270F&_nc_sid=30a2ef"}} />
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
	  cards={DUMMY_DATA}
	  stackSize={5}
	  cardIndex={0}
	  animateCardOpacity
	  verticalSwipe={false}
	  onSwipedLeft={()=>{
		  console.log('Swipe PASS')
	  }}
	  onSwipedRight={()=>{
		console.log('Swipe MATCH')
	}}
	  backgroundColor={"#4FD0E9"}
	  overlayLabels={{
		  left: {
			  title: 'next',
			  style : {
				  label: {
					  textAlign: "right",
					  color: 'red'
				  },
			  },
		  },
		  right: {
			title: 'hired',
			style : {
				label: {
					color: '#4DED30'
				},
			},
		}
	  }}
	  renderCard={(card)=> (
		  <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
			  <Image 
			  style={tw`absolute top-0 h-full w-full rounded-xl`} 
			  source={{uri : card.photoURL}}/>
			  <View style={[tw`absolute bottom-0 bg-white w-full flex-row items-center justify-between
			    h-20 px-6 py-2 rounded-b-xl`,
				styles.cardShadow
				]}>
				  <View>
					  <Text style={tw`text-xl font-bold`}>{card.firstName} {card.lastName}</Text>
					  <Text>
						  {card.occupation}
					  </Text>
				  </View>
				  <Text style={tw`text-xl font-bold`}>{card.age}</Text>
			  </View>
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