import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Shared from "../Shared/Shared";
import { useUser } from "@clerk/clerk-expo";

export default function MarkFav({pet}) {
  const { user } = useUser();
  const [favList, setFavList] = useState();

  useEffect(() => {
    user && GetFav();
  }, [user]);

  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    
    setFavList(result?.favorites ? result?.favorites : []);
  };

  const AddToFav=async()=>{
        const favResult = favList;
        favResult.push(pet?.id)
        await Shared.UpdateFav(user,favResult);
        GetFav();
  }

  const removeFromFav = async()=>{
    const favResult = favList.filter(item=>item!=pet.id);
    await Shared.UpdateFav(user,favResult);
    GetFav();
  }
  return (
    <View>
        {favList?.includes(pet.id)? <Pressable onPress={removeFromFav}>
            <Ionicons name="heart" size={30} color="red" />
        </Pressable>:
        <Pressable onPress={()=>AddToFav()}>
            <Ionicons name="heart-outline" size={30} color="black" />
        </Pressable>}
    </View>
  );
}
