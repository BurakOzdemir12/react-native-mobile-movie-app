import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Link} from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import {images} from "@/constants/images";

const TrendingCard =
    ({
         movie: {movie_id, title, poster_url},
         index,
     }: TrendingCardProps) => {
        return (
            <Link href={`/movies/${movie_id}`} asChild>
                <TouchableOpacity className="w-32 relative pl-5">
                    <Image
                        source={{uri: poster_url}}
                        className="w-32 h-48 rounded-lg"
                        resizeMode="cover"/>
                    <View
                        className="absolute  bottom-9 -left-3.5 px-2 py-1 rounded-full  ">
                        <MaskedView maskElement={
                            <Text className=" text-white text-6xl font-bold ">{String(index + 1)}</Text>
                        }>
                            <Image source={images.rankingGradient}
                                   resizeMode="cover"
                                   className="size-14"
                            />
                        </MaskedView>
                    </View>
                    <Text className=" text-sm font-bold mt-2 text-light-200" numberOfLines={1}>
                        {title}
                    </Text>
                </TouchableOpacity>
            </Link>
        );
    };


export default TrendingCard;