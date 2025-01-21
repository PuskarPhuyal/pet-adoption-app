import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '../../constants/Colors'
import Feather from '@expo/vector-icons/Feather';

export default function OwnerInfo({pet}) {
  return (
    <View style={styles.container}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:20
        

      }}>
      <Image source={{uri:pet?.userImage}}
        style={{
            width:40,
            height:40,
            borderRadius:99
        }}
      />
      <View>
        <Text style={{
            fontFamily:'outfit-medium',
            fontSize:17
        }}>
            {pet?.username}
        </Text>
        <Text style={{
            fontFamily:'outfit',
            color:Colors.GRAY
        }}>Pet Owner</Text>
      </View>
      </View>
      <Feather name="send" size={24} color={Colors.PRIMARY} />
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    margin:20,
    paddingHorizontal:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    gap:20,
    borderWidth:1,
    borderRadius:20,
    padding:15,
    borderColor:Colors.PRIMARY,
    backgroundColor:Colors.WHITE,
    justifyContent:'space-between'
  }
})