import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'

export default function AddNewPet() {
    const navigation=useNavigation();

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Add New Pet'
        })
    },[])
  return (
    <View style={{
        padding:20
    }}>
      <Text
      style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }
      }
      >Add New Pet for adoption</Text>
      <Image source={require('./../../assets/images/placeholder.jpg')}/>
    </View>
  )
}