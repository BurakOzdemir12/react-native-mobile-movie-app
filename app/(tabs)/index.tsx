import {ActivityIndicator, FlatList, Image, ScrollView, Text, View} from "react-native";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";
import SearchBar from "@/components/SearchBar";
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import {getTrendingMovies} from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";

const Index = () => {
    const router = useRouter();
    const {
        data: trendingMovies,
        loading: trendingMoviesLoading,
        error: trendingMoviesError,
    } = useFetch(getTrendingMovies);
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
                {moviesLoading || trendingMoviesLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="mt-10 self-center"/>
                ) : moviesError || trendingMoviesError ? (
                    <Text className="text-red-950" >
                        {moviesError?.message ? `Error: ${moviesError.message}` : ""}
                        {trendingMoviesError?.message ? `Error: ${trendingMoviesError.message}` : ""}
                    </Text>

                ) : (
                    <View className="flex-1 mt-5">
                        <SearchBar onPress={() => {
                            router.push("/search")
                        }}
                                   placeholder="Search for a movie"/>

                        {trendingMovies && (
                            <View className="mt-10">
                                <Text className="text-lg text-white font-bold mt-5 mb-3 ">
                                    Trending Movies
                                </Text>
                            </View>
                        )}


                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ItemSeparatorComponent={() => <View className="w-4"/>}
                            className="mb-4 mt-3"
                            data={trendingMovies}
                            renderItem={(
                                {item, index}) => (
                                <TrendingCard movie={item} index={index}/>
                            )}
                            keyExtractor={(item) => item.movie_id.toString()}
                            scrollEnabled={true}
                        />
                        <Text className="text-md text-white font-bold mt-5 mb-3 ">
                            Latest Movies
                        </Text>
                        <FlatList
                            className="mt-5 pb-32"
                            scrollEnabled={false}
                            data={movies}
                            keyExtractor={(item) => item.id?.toString()}
                            renderItem={({item}) => (

                                <MovieCard
                                    {...item}
                                />
                            )}
                            numColumns={3}
                            columnWrapperStyle={{
                                justifyContent: 'flex-start',
                                gap: 20,
                                paddingRight: 5,
                                marginBottom: 10
                            }}
                            ListEmptyComponent={<Text className="text-gray-400 text-center">
                                No movies found.</Text>}
                        />
                    </View>
                )}

            </ScrollView>
        </View>
    );
}
export default Index;