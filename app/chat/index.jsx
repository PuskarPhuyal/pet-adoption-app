import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useUser } from '@clerk/clerk-expo';

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const {user} = useUser();

  useEffect(()=>{
    GetUserDetails();
    // console.log("Logged-in user's email:", user?.primaryEmailAddress?.emailAddress);
  },[]);

  const GetUserDetails = async() =>{
    const docRef = doc(db,'Chat',params?.id);
    const docSnap = await getDoc(docRef);

    const result = docSnap.data();
    // console.log(result);
    
    const otherUser = result?.users.filter(item=>item.email.toLowerCase()!==user?.primaryEmailAddress?.emailAddress);
    console.log(otherUser);
    
    
    
    //Set Chat person name on top of screen 
    navigation.setOptions({
      headerTitle:otherUser[0].name
    })
    
    
  }
  
  return (
    <View>
      <Text>..</Text>
    </View>
  )
}