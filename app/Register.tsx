import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image, TouchableOpacity, SafeAreaView, ScrollView} from 'react-native';
import {registerUser} from "@/services/appwrite";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "expo-router";
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";
import {Label} from "@react-navigation/elements";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const {registerUser, setUser} = useAuth();
    const router = useRouter();

    const handleRegister = async () => {
        const newUser = await registerUser(email, password, name);
        if (newUser) {
            setUser(newUser);
            router.push('/Login')
        }
    }
    return (
        <SafeAreaView className="bg-dark-200" style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>

                <Image source={icons.ap} resizeMode="contain" style={styles.logo}/>
                <Text className="text-white text-center text-3xl">SignUp</Text>

                <View style={styles.form}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="John Doe"
                            placeholderTextColor="gray"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="hello@example.com"
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            placeholderTextColor="gray"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <Text className=" self-end mt-10"
                      style={styles.rightAlignedText}>
                    Already have an account?{" "}
                    <Text
                        style={{color: "#6366F1"}}
                        onPress={() => router.push("/Login")}
                    >
                        Sign In
                    </Text>
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 240,
        height: 240,
        marginBottom: 30,
    },
    form: {
        width: "100%",
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: "white",
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#1e293b",
        height: 50,
        paddingHorizontal: 10,
        color: "white",
        borderWidth: 0.3,
        borderColor: "white",
        borderRadius: 8,
    },
    button: {
        marginTop: 20,
        backgroundColor: "#6366F1",
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        width: "75%",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
    rightAlignedText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-end", // Öğeyi sağa yaslar
    },
});

export default Register;