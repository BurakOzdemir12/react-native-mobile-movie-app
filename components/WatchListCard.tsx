import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Link} from "expo-router";

const WatchListCard =
    ({
         movie: {movie_id, title, poster_url},
     }: WatchListCardProps) => {
        return (
            <Link href={`/movies/${movie_id} `} asChild>
                <TouchableOpacity className="w-32 relative  pl-0">
                    <Image source={{uri: poster_url}}
                           className="h-48 w-32 rounded-xl"
                           resizeMode="contain"/>

                    <View className="p-2 gap-5 flex-1  mt-0">
                        <Text className="text-gray-50 text-lg  "
                              numberOfLines={1}
                        >{title}</Text>
                    </View>
                </TouchableOpacity>

            </Link>

        );
    };


export default WatchListCard;