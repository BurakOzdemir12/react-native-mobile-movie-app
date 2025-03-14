import React from 'react';
import {View, Text, StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native';
import {icons} from "@/constants/icons";
import useFetch from "@/services/useFetch";
import {getTrendingMovies} from "@/services/appwrite";
import WatchListCard from "@/components/WatchListCard";
import {useAuth} from "@/context/AuthContext";
import {router} from "expo-router";

const Profile = () => {
    const {user,logoutUser,setUser} = useAuth();
    if(!user){
        router.push("/Login")
        return <ActivityIndicator className="bg-primary mt-50 flex-1" size="large" color="#0000ff"/>;
    }
    const {
        data: watchlist,
        loading: watchlistLoading,
        error: watchlistError,
    } = useFetch(getTrendingMovies);

    return (

        <View className="bg-primary flex-1 px-2">
            <View className="flex justify-start items-center   mt-20 gap-5">
                <Image source={icons.person} className="size-10" tintColor="#fff"/>
                <Text className="text-gray-50 text-3xl font-bold ">Profile Name</Text>
            </View>
            <View className="flex-1 mt-10">
                <Text className="text-white mb-5 text-xl">Continue to Watch</Text>
                <FlatList

                    className="mt-0  pb-0"
                    scrollEnabled={true}
                    data={watchlist}
                    keyExtractor={(item) => item.movie_id.toString()}
                    renderItem={({item, index}) => (
                        <WatchListCard movie={item} index={index}/>
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={() => <View className="w-4"/>}


                />
            </View>

        </View>
    );
};


export default Profile;