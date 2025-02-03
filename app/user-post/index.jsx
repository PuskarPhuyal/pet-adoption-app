import { View, Text, FlatList, Pressable, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-expo';
import { db } from '../../config/FirebaseConfig';
import PetListItem from '../../components/Home/PetListItem'
import Colors from '../../constants/Colors';

export default function UserPost() {
    const nagivation = useNavigation();
    const {user}=useUser();
    const [loader, setLoader] = useState(false);
    const [userPostList, setUserPostList] = useState([]);
    
    useEffect(()=>{
        nagivation.setOptions({
            headerTitle:'User Post'
        })
        if (user) {
            GetUserPost();
        }
    },[user])


    //Used to get User Post
    const GetUserPost=async()=>{
        setLoader(true);
        setUserPostList([]);
        const q = query(collection(db,'Pets'),where('email','==',user?.primaryEmailAddress?.emailAddress));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setUserPostList(prev=>[...prev,doc.data()])
            
        })
        setLoader(false);
    }

    const OnDeletePost =(docId) =>{
        Alert.alert(
            "Confirm Deletion", // Title
            "Do you want to delete this post?", // Message (previously missing)
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Click"),
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => deletePost(docId)
                }
            ]
        );   
    }

    const deletePost=async(docId)=>{
        await deleteDoc(doc(db,'Pets',docId));
        GetUserPost();
    }

  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>UserPost</Text>

    <FlatList
        data={userPostList}
        numColumns={2}
        refreshing={loader}
        onRefresh={GetUserPost}
        keyExtractor={(item, index) => index.toString()} // Ensure unique keys
        renderItem={({ item }) => 
            <View>
                <PetListItem pet={item}/>
                <Pressable onPress={()=>OnDeletePost(item?.id)} style={styles.deleteButton}>
                    <Text style={{
                        fontFamily:'outfit',
                        textAlign:'center'
                    }}>Delete</Text>
                </Pressable>
            </View>
        }
        ListEmptyComponent={<Text>No posts found.</Text>} // Handle empty state
        />
    </View>
  )
}

const styles = StyleSheet.create({
    deleteButton:{
        backgroundColor:Colors.LIGHT_PRIMARY,
        padding:5,
        borderRadius:7,
        marginTop:5,
        marginRight:10
    }
})