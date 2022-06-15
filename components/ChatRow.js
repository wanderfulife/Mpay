import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../hooks/useAuth';
import React, { useState, useEffect } from 'react';
import getMatchedUserInfo from '../lib/getMatchedUserInfo'




const ChatRow = ({ matchDetails }) => {
	const navigation = useNavigation();
	const { user } = useAuth();
	const [matchedUserInfo, setMatchedUserInfo] = useState(null);

	useEffect(() => {
		setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid))
	}, [matchDetails, user]);





  return (
	<TouchableOpacity>
	  <Image
		style={tw`rounded-full h-16 w-16 mr-4`}
	
	  />
	</TouchableOpacity>
  )
}

export default ChatRow