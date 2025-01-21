// import { useUser } from "@clerk/clerk-expo";
// import { Link, Redirect } from "expo-router";
// import { Pressable, Text, View } from "react-native";

// export default function Index() {

//   const {user}=useUser();
  
//   return (
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
//       {user?
//         <Redirect href={'/(tabs)/home'} />
//         :<Redirect href={'/login'} />} 
      
//     </View>
//   );
// }

// import { useUser } from "@clerk/clerk-expo";
// import { Link, Redirect, useRootNavigationState } from "expo-router";
// import { useEffect } from "react";
// import { Pressable, Text, View } from "react-native";

// export default function Index() {

//   const { user } = useUser();
//   const rootNavigationState= useRootNavigationState();

//   useEffect(()=>{
//     CheckNavLoaded();
//   },[])

//   const CheckNavLoaded=()=>{
//     if(!rootNavigationState.key)
//       return null;
//   }
//   return user && (
//   // return(
//     <View
//       style={{
//         flex: 1,
//       }}
//     >
      
//       {user?
//       <Redirect href={'/(tabs)/home'}/>
//       :<Redirect href={'/login'}/>}
      
//     </View>
//   );
// }

import { useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";

export default function Index() {
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {user ? <Redirect href="/(tabs)/home" /> : <Redirect href="/login" />}
    </View>
  );
}
