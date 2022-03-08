import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import useAxios from 'axios-hooks';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import constants from "../constants/constants";

import { connect } from 'react-redux'
import { getAllProperties } from '../store/property/propertyActions';

// Navigator | DRAWER
import DrawerNavigator from "./DrawerNavigator";
// import OnBoardingStackNavigator from "./OnBoardingStackNavigator";
import AuthStackNavigator from "./AuthStackNavigator";

const Stack = createStackNavigator();

const MainStackNavigator = ( { selectedProperties, setAllProperties } ) => {

    const [{ data, loading, error, response }, refetch] = useAxios(
        `${constants.ROOT_URL}/ahuse/api/v1/properties`,
        {
            manual: false, // if TRUE, it will not execute immediately
            useCache: true,
            autoCancel: true
        }
    );

    React.useEffect(() => {
        if( !error && data) setAllProperties( data )
        // console.log("Main Stack Nav all properties useEffect action")
        return () => setAllProperties([])
    },[data]);

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Home'}
            // initialRouteName={isLoggedIn ? 'Home' : 'OnBoarding'}
        >
            {/* { !isLoggedIn &&  */}
                {/* <Stack.Screen
                    name="OnBoarding"
                    component={OnBoardingStackNavigator}
                /> */}
            {/* } */}
            <Stack.Screen
                name="Auth"
                component={AuthStackNavigator}
            />
            <Stack.Screen
                name="Home"
                component={DrawerNavigator}
            />

        </Stack.Navigator>
    )
}

// export default MainStackNavigator
function mapStateToProps( state ) {
    // console.log(state)
    return {
        selectedProperties: state?.propertyReducer?.allProperties,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( MainStackNavigator )