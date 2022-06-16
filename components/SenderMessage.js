import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc'


const SenderMessage = ({ messages }) => {
  return (
	<View
	style={[
		tw`bg-purple-600 rounded-lg rounded-tr-none px-5 py-3 mx-3 my-2`,
		{alignSelf: "flex-start", marginLeft: "auto"}
	]}
	>
	  <Text style={tw`text-white`}>{messages.message}</Text>
	</View>
  )
}

export default SenderMessage;