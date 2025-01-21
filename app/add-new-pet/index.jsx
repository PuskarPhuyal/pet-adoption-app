import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';


export default function AddNewPet() {
    const navigation=useNavigation();
    const [formData, setFormData] = useState();
    const [gender,setGender]=useState();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Add New Pet'
        })
        GetCategories();
    },[])

      // Used to get Category List from DB 
      
      const GetCategories=async()=>{
        setCategoryList([]);
        const snapshot = await getDocs(collection(db,'Category'));
        snapshot.forEach((doc)=>{
          
          setCategoryList(categoryList=>[...categoryList,doc.data()])
        })
      }

    const handleInputChange=(fieldName,fieldValue)=>{
        setFormData(prev=>({
          ...prev,
          [fieldName]:fieldValue
        }));
    }

  return (
    <ScrollView style={{
        padding:20
    }}>
      <Text
      style={{
        fontFamily:'outfit-medium',
        fontSize:20
      }
      }
      >Add New Pet for adoption</Text>
      <Image source={require('./../../assets/images/placeholder.jpg')}
      style={{
        width:100,
        height:100,
        borderRadius:15,
        borderWidth:1,
        borderColor:Colors.GRAY
      }}
      />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput placeholder='Pet Name' style={styles.input} 
        onChangeText={(value)=>handleInputChange('name',value)}/>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Pet Category *</Text>
          <Picker
              selectedValue={selectedCategory}
              style={{padding:0,
                backgroundColor:Colors.WHITE,
                borderRadius:7,
                fontFamily:'outfit'}}
              onValueChange={(itemValue, itemIndex) =>{
                setSelectedCategory(itemValue);
                handleInputChange('category',itemValue)
              }}>
                {categoryList.map((category,index)=>(
                    <Picker.Item key={index} label={category.name} value={category.name} />
                ))}
              
          </Picker>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput placeholder="Pet's Breed" style={styles.input} 
        onChangeText={(value)=>handleInputChange('breed',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput placeholder="Pet's Age" style={styles.input} 
        onChangeText={(value)=>handleInputChange('age',value)}/>
      </View>

      <View style={styles.inputContainer}>
      <Text style={styles.label}>Gender *</Text>
          <Picker
              selectedValue={gender}
              style={{padding:0,
                backgroundColor:Colors.WHITE,
                borderRadius:7,
                fontFamily:'outfit'}}
              onValueChange={(itemValue, itemIndex) =>{
                setGender(itemValue);
                handleInputChange('sex',itemValue)
              }}>
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
          </Picker>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput placeholder="Pet's Weight" style={styles.input} 
        onChangeText={(value)=>handleInputChange('weight',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput placeholder="Pet's Address" style={styles.input} 
        onChangeText={(value)=>handleInputChange('address',value)}/>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label} >About *</Text>
        <TextInput  style={styles.input} 
        numberOfLines={10}
        multiline={true}
        onChangeText={(value)=>handleInputChange('about',value)}/>
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={{
          fontFamily:'outfit-medium',
          textAlign:'center'
        }}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer:{
    marginVertical:5
  },
  input:{
    padding:15,
    backgroundColor:Colors.WHITE,
    borderRadius:7,
    fontFamily:'outfit'
  },
  label:{
    marginVertical:5,
    fontFamily:'outfit'
  },
  button:{
    padding:15,
    backgroundColor:Colors.PRIMARY,
    marginTop:10,
    borderRadius:7,
    marginBottom:35

  }
})