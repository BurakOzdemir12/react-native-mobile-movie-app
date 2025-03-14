import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Button} from 'react-native';
import {Link, useRouter} from "expo-router";
import {useAuth} from "@/context/AuthContext";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const {loginUser, setUser} = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        const session = await loginUser(email, password);
        if (session) {
            setUser(session);
            router.replace("/profile");
        } else {
            router.push("/Login");
        }
    }
    return (
        <View className="flex-1  bg-dark-200">
            <View className="flex mt-40 justify-start items-center ">
                <Text className="text-white text-3xl">Sign in to your account</Text>
                <TextInput
                    className="mt-10"
                    style={{
                        backgroundColor: "#1e293b",
                        width: "75%",
                        height: 50,
                        padding: 10,
                        borderWidth: 1,
                        color: "white",
                        borderColor: "white",
                        borderRadius: 100,

                    }}
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={setEmail}/>
                <TextInput
                    style={{
                        marginTop: 20,
                        backgroundColor: "#1e293b",
                        width: "75%",
                        height: 50,
                        padding: 10,
                        borderWidth: 1,
                        color: "white",
                        borderColor: "white",
                        borderRadius: 100,

                    }}
                    placeholderTextColor="white"
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry/>
            </View>
            <View className="flex gap-10  items-center mt-20">
                < TouchableOpacity className=" min-w-[75%] rounded-3xl min-h-[5%]
                 bg-indigo-600 text-white justify-center align-middle text-center" onPress={handleLogin}>
                    <Text className="text-white text-center text-3xl justify-center font-bold">
                        Sign In
                    </Text>
                </TouchableOpacity>
                < TouchableOpacity className="  min-w-[75%] rounded-3xl min-h-[5%]
                 bg-indigo-600 text-white justify-center align-middle text-center"
                                   onPress={() => router.push("/Register")}>
                    <Text className="text-white text-center text-3xl justify-center font-bold">
                        Register
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};


