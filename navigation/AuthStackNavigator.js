import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import SplashScreen from 'react-native-splash-screen'

// Screens
import OnBoarding from '../screens/OnBoarding/OnBoarding'
import SignIn from '../screens/Authentication/SignIn'
import SignUp from '../screens/Authentication/SignUp'
import ForgotPassword from '../screens/Authentication/ForgotPassword'
// import Otp from '../screens/Authentication/Otp'

const Stack = createStackNavigator();

const AuthStackNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown:false
            }}
        >
            <Stack.Screen
                name="SignIn"
                component={SignIn}
            />

            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />

            <Stack.Screen
                name="ForgotPassword"
                component={ForgotPassword}
            />
        </Stack.Navigator>
    )
}

export default AuthStackNavigator

