import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity, Button} from 'react-native';
import {icons} from "@/constants/icons";
import useFetch from "@/services/useFetch";
import {getTrendingMovies, logoutUser} from "@/services/appwrite";
import WatchListCard from "@/components/WatchListCard";
import {useAuth} from "@/context/AuthContext";
import {router} from "expo-router";
import DropDownPicker from 'react-native-dropdown-picker';
import {Avatar} from 'react-native-elements';

const Profile = () => {
    const {user, logoutUser, setUser} = useAuth();
    if (!user) {
        router.push("/Login")
        return <ActivityIndicator className="bg-primary mt-50 flex-1" size="large" color="#0000ff"/>;
    }
    const {
        data: watchlist,
        loading: watchlistLoading,
        error: watchlistError,
    } = useFetch(getTrendingMovies);
    const [menuOpen, setMenuOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Logout', value: 'logout'},
        {label: 'Settings', value: 'settings'},
    ]);
    const handleLogout = async () => {
        await logoutUser();
        setUser(null);
        router.push("/Login");
    }
    return (

        <View className="bg-primary flex-1 px-2">
            <View className="flex justify-start items-center  mt-20 gap-5">

                <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)}>
                    {/*<Image source={icons.person} className="size-10" tintColor="#fff"/>*/}
                    <Avatar
                        rounded
                        icon={{name: 'user', type: 'font-awesome'}}
                        // onPress={() => console.log("Works!")}
                        activeOpacity={0.7}
                        size="xlarge"
                        containerStyle={{flex: 0, marginLeft: 0, marginTop: 0}}
                    />
                </TouchableOpacity>

                {menuOpen && (
                    <DropDownPicker
                        style={{
                            backgroundColor: "#0f0d23",
                        }}
                        dropDownContainerStyle={{
                            backgroundColor: "#0f0d23",
                            borderColor: "white",
                            borderWidth: 0.2,
                        }}
                        labelStyle={{
                            color: "white",
                            fontWeight: 700,
                            borderWidth: 1,
                            borderColor: "white",
                        }}
                        listItemLabelStyle={{
                            color: "white",
                        }}
                        open={menuOpen}
                        value={value}
                        items={items}
                        setOpen={setMenuOpen}
                        setValue={setValue}
                        setItems={setItems}
                        placeholder="Profile Actions"

                        onSelectItem={(item) => {
                            if (item.value === "logout") {
                                setMenuOpen(false); // Menü kapanmadan logout çalışmayabilir, önce kapat
                                setTimeout(() => {
                                    handleLogout();
                                }, 300);
                            }
                        }}
                    />
                )}

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