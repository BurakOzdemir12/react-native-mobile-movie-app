import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";

export default function Index() {
    const router = useRouter();
    const {
        data: movies,
        loading: moviesLoading,
        error: moviesError
    } = useFetch(() => fetchMovies({
        query: ''
    }))
    return (
        <View className="flex-1 bg-primary">
            <Image source={images.bg} className="w-full absolute z-0"/>
            <ScrollView className="flex-1 px-5"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}
            >
                <Image source={icons.logo}
                       className="w-12 h-10 mt-20 mb-5 mx-auto"/>
                {moviesLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center"/>
                ) : moviesError ? (
                    <Text style={{color: "red"}}>Error: {moviesError?.message}</Text>
                ) : (
                    <FlatList
                        className="mt-2 pb-32"
                        scrollEnabled={false}
                        data={movies}
                        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                        renderItem={({item}) => (

                                <MovieCard
                                    {... item}
                                />
                        )}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent:'flex-start',
                            gap:20,
                            paddingRight:5,
                            marginBottom:10
                        }}
                        ListEmptyComponent={<Text style={{color: "gray", textAlign: "center"}}>No movies found.</Text>}
                    />
                )}

            </ScrollView>
        </View>
    );
}
