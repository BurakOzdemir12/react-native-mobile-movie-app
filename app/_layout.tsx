import {Stack} from "expo-router";
import './globals.css'
import {StatusBar} from "react-native";
import {AuthProvider} from "@/context/AuthContext";
export default function RootLayout() {
    return (
        <>

            <AuthProvider>
            <StatusBar hidden={true}/>
            <Stack>
                <Stack.Screen
                    name="(tabs)"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="movies/[id]"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Login"
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Register"
                    options={{headerShown: false}}
                />
            </Stack>;
            </AuthProvider>

        </>
    )
}
