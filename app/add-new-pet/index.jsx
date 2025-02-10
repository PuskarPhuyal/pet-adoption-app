import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import Colors from '../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db, storage } from '../../config/FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useUser } from '@clerk/clerk-expo';




export default function AddNewPet() {
    const navigation=useNavigation();
    const [formData, setFormData] = useState({
      category:'Fish',sex:'Male'
    });
    const [gender,setGender]=useState();
    const [categoryList, setCategoryList] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState();
    const [image,setImage] = useState();
    const [loader,setLoader]=useState(false);
    const {user}=useUser();
    const router = useRouter();

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
 
    //Used to pick image from gallery
    const imagePicker = async () => {
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'], // Use the correct option
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled && result.assets && result.assets.length > 0) {
          setImage(result.assets[0].uri);
        } else {
          console.log("Image selection was canceled or no assets found.");
        }
      } catch (error) {
        console.error("Error picking image:", error);
      }
    };

    const handleInputChange=(fieldName,fieldValue)=>{
        setFormData(prev=>({
          ...prev,
          [fieldName]:fieldValue
        }));
    }

    const onSubmit=()=>{
      if(Object.keys(formData).length!=8)
      { ToastAndroid.show('Enter All Details',ToastAndroid.SHORT)
        return;
      }
      
      UploadImage();
    }

    //Used to upload Pet Image to firebase storage 

    const UploadImage=async()=>{
        setLoader(true);
        const resp = await fetch(image);
        const blobImage = await resp.blob();
        const storageRef = ref(storage,'/PetAdopt/'+Date.now()+'.jpg');

        uploadBytes(storageRef,blobImage).then((snapshot)=>{
          console.log('File Uploaded')
        }).then(resp=>{
          getDownloadURL(storageRef).then(async(downloadUrl)=>{
            console.log(downloadUrl);
            SaveFormData(downloadUrl);
          })
        })

    }

    const SaveFormData =async(imageUrl)=>{
      const docId = Date.now().toString();
      await setDoc(doc(db,'Pets',docId),{
          ...formData,
          imageUrl:imageUrl,
          username:user?.fullName,
          email:user?.primaryEmailAddress.emailAddress,
          userImage:user?.imageUrl,
          id:docId
      })
      setLoader(false);
      router.replace('/(tabs)/home')
    }

    // const SaveFormData = async (downloadUrl) => {
    //   const docId = Date.now().toString();
    //   try {
    //     // Ensure `user` and nested properties exist
    //     if (!user || !user.primaryEmailAddress?.emailAddress) {
    //       throw new Error("User details are incomplete");
    //     }
    
    //     // Save the document to Firestore
    //     await setDoc(doc(db, 'Pets', docId), {
    //       ...formData, // Ensure formData is sanitized
    //       imageUrl: downloadUrl,
    //       username: user.fullName || "Anonymous", // Fallback for username
    //       email: user.primaryEmailAddress.emailAddress,
    //       userImage: user.imageUrl || "", // Fallback for user image
    //       id: docId,
    //     });
    //   } catch (error) {
    //     console.error("Error saving data:", error);
    //     // Handle the error, e.g., show a toast or alert
    //   } finally {
    //     setLoader(false); // Always reset the loader, success or failure
    //   }
    // };
    

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

      <Pressable onPress={imagePicker}>
        {!image? <Image source={require('./../../assets/images/placeholder.jpg')}
        style={{
          width:100,
          height:100,
          borderRadius:15,
          borderWidth:1,
          borderColor:Colors.GRAY
        }}
        />:
        <Image source={{uri:image}} style={{
          width:100,
          height:100,
          borderRadius:15,
          borderWidth:1,
          borderColor:Colors.GRAY
        }}/>}
      </Pressable>

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
          keyboardType='number-pad'
        onChangeText={(value)=>handleInputChange('age',value)}/>
      </View>

{/* Pet's Gender  */}
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
        <Text style={styles.label}>Weight in kg *</Text>
        <TextInput placeholder="Pet's Weight" style={styles.input} 
          keyboardType='number-pad'
        onChangeText={(value)=>handleInputChange('weight',value)}/>
      </View>

{/* Address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput placeholder="Pet's Address" style={styles.input} 
        onChangeText={(value)=>handleInputChange('address',value)}/>
      </View>
      
{/* About Section  */}
      <View style={styles.inputContainer}>
        <Text style={styles.label} >About *</Text>
        <TextInput  style={styles.input} 
        numberOfLines={10}
        multiline={true}
        onChangeText={(value)=>handleInputChange('about',value)}/>
      </View>

      <TouchableOpacity 
      style={styles.button} 
      disabled={loader}
      onPress={onSubmit}>
        {loader?<ActivityIndicator size={'large'}/>:
        <Text style={{
          fontFamily:'outfit-medium',
          textAlign:'center'
        }}>Submit</Text>}
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