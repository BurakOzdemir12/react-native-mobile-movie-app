import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Button,
    SafeAreaView,
    ScrollView
} from 'react-native';
import {Link, useRouter} from "expo-router";
import {useAuth} from "@/context/AuthContext";
import {icons} from "@/constants/icons";

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
        <SafeAreaView className="flex-1  bg-dark-200">
            <ScrollView className="
            px-5" contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
                flexGrow: 1,
            }}>

                <Image source={icons.ap} resizeMode="contain" style={styles.logo}/>
                <Text className="text-white text-center text-3xl">Sign in to your account</Text>

                <View className="min-w-full  ">
                    <View className="mb-5">
                        <Text className="text-white text-xl mb-1">Email</Text>
                        <TextInput
                            className=""
                            style={styles.textInput}
                            placeholder="hello@example.com"
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={setEmail}/>
                    </View>
                    <View className="mb-5">
                        <Text className="text-white text-xl mb-1">Password</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholderTextColor="gray"
                            placeholder="********"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry/>
                    </View>
                </View>
                <View className=" gap-10  items-center mt-10">
                    < TouchableOpacity className=" min-w-[75%] rounded-lg min-h-[5%]
                 bg-indigo-600 text-white justify-center align-middle text-center" onPress={handleLogin}>
                        <Text className="text-white text-center text-3xl justify-center font-bold">
                            Sign In
                        </Text>
                    </TouchableOpacity>

                </View>
                <Text className=" self-end mt-10 " style={styles.rightAlignedText}>
                    Don't have an account? <Link href="/Register" className=" "
                                                 style={{color: "#6366F1"}}
                >Sign Up</Link>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    logo: {
        width: 240,
        height: 240,
        marginBottom: 30,
        alignSelf: "center"
    },
    textInput: {
        width: "100%",
        backgroundColor: "#1e293b",
        height: 50,
        paddingHorizontal: 10,
        color: "white",
        borderWidth: 0.3,
        borderColor: "white",
        borderRadius: 8,


    },
    rightAlignedText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-end",
    },

})

