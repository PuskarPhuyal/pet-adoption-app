import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Shared from '../../Shared/Shared'
import { useUser } from '@clerk/clerk-expo'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import PetListItem from '../../components/Home/PetListItem'

export default function Favorite() {

  const {user} = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState([]);
  const [loader,setLoader] = useState(false);
  useEffect(()=>{
    user&&GetFavPetIds();
  },[user])

  // // Fav Id
  const GetFavPetIds = async()=>{
    setLoader(true);
    const result = await Shared.GetFavList(user);
    setFavIds(result?.favorites);
    setLoader(false)
    GetFavPetList(result?.favorites);
    
  }


  // Fetch Related Pet List 
  const GetFavPetList =async(favId_)=>{
    setLoader(true);
    setFavPetList([])
    const q=query(collection(db,'Pets'),where('id','in',favId_));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc)=>{
      console.log(doc.data());
      setFavPetList(prev=>[...prev,doc.data()])
      
    })
    setLoader(false);
  }

  return (
    <View style={{
      padding:20,
      marginTop:20,
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Favorites</Text>

      <FlatList
      data={favPetList}
      onRefresh={GetFavPetIds}
      refreshing={loader}
      renderItem={({item,index})=>(

        <View>
          <PetListItem pet={item}/>
        </View>
      )}
      />
    </View>
  )
}

// import { View, Text, FlatList } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Shared from '../../Shared/Shared';
// import { useUser } from '@clerk/clerk-expo';
// import { collection, getDocs, query, where } from 'firebase/firestore';
// import { db } from '../../config/FirebaseConfig';
// import PetListItem from '../../components/Home/PetListItem';

// export default function Favorite() {
//   const { user } = useUser();
//   const [favIds, setFavIds] = useState([]);
//   const [favPetList, setFavPetList] = useState([]);
//   const [loader, setLoader] = useState(false);

//   useEffect(() => {
//     if (user) GetFavPetIds();
//   }, [user]);

//   // Fetch Favorite Pet IDs
//   const GetFavPetIds = async () => {
//     try {
//       setLoader(true);
//       const result = await Shared.GetFavList(user);
//       const favorites = result?.favorites || [];
//       setFavIds(favorites);
//       setLoader(false)

//       if (favorites.length > 0) {
//         await GetFavPetList(favorites); // Pass the IDs directly
//       } else {
//         setFavPetList([]); // Clear the list if no favorites
//       }
//     } catch (error) {
//       console.error("Error fetching favorite pet IDs:", error);
//     }
//   };

//   // Fetch Related Pet List
//   const GetFavPetList = async (favoriteIds) => {
//     try {
//       setLoader(true);
//       const q = query(collection(db, 'Pets'), where('id', 'in', favoriteIds.slice(0, 10))); // Firebase limit: 10 IDs
//       const querySnapshot = await getDocs(q);

//       const pets = querySnapshot.docs.map((doc) => doc.data());
//       setFavPetList(pets); // Set the state with the fetched pets
//     } catch (error) {
//       console.error("Error fetching favorite pet list:", error);
//     }
//     setLoader(false)
//   };

//   return (
//     <View style={{ padding: 20, marginTop: 20 }}>
//       <Text style={{ fontFamily: 'outfit-medium', fontSize: 30 }}>Favorites</Text>

//       <FlatList
//         data={favPetList}
//         keyExtractor={(item, index) => index.toString()}
//         onRefresh={GetFavPetIds}
//         refreshing={loader}
//         renderItem={({ item }) => (
//           <View>
//             <PetListItem pet={item} />
//           </View>
//         )}
//       />
//     </View>
//   );
// }
