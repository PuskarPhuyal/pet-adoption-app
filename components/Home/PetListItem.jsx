import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'


export default function PetListItem({pet}) {
  const router=useRouter();
  return (
    <TouchableOpacity 
    onPress={()=>router.push({
      pathname:'/pet-details',
      params:pet
    })}
    style={{
      padding:10,
      marginRight:15,
      backgroundColor:Colors.WHITE,
      borderRadius:10
    }}>
      <View>
        
      </View>
      <Image source={{uri:pet?.imageUrl}} 
      style={{
        width:150,
        height:135,
        objectFit:'cover',
        borderRadius:10
      }}
      />
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:18
      }}>{pet.name}</Text>

      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
      }}>
          <Text style={{
            color:Colors.GRAY,
            fontFamily:'outfit'
          }}
          >{pet?.breed}</Text>
          <Text style={{
            fontFamily:'outfit',
            color:Colors.PRIMARY,
            paddingHorizontal:7,
            borderRadius:10,
            fontSize:13,
            backgroundColor:Colors.LIGHT_PRIMARY,
        
          }}>{pet.age} Yrs</Text>
      </View>
    </TouchableOpacity>
  )
}