import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Tabs} from "expo-router";

const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="index"
                         options={{
                             title: "Home",
                             headerShown: false,
                         }}/>

            {/*<Tabs.Screen name="Search" component={Search} />*/}
            {/*<Tabs.Screen name="Saved" component={Saved} />*/}
            {/*<Tabs.Screen name="Profile" component={Profile} />*/}
        </Tabs>
    );
};


export default _Layout;