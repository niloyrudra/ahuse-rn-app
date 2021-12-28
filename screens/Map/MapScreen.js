import React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
// import MapView, { PROVIDER_GOOGLE, Marker,  AnimatedRegion, Animated, MarkerAnimated } from 'react-native-maps'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { COLORS, SIZES, FONTS } from '../../constants/theme'
import icons from '../../constants/icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MapScreen = ( { navigation, route } ) => {

    const [properties, setProperties] = React.useState([])
    const [region, setRegion] = React.useState({
        latitude: 37.78825, // 37.78825
        longitude: -122.4324, // -122.4324
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    const [coordinate, setCoordinate] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
    })

    React.useEffect(() => {
        if(route?.params?.items)
        {
            setProperties(route.params.items)
            console.log(route.params.items.length)
        }
        return () => {
            setProperties([])
        }
    }, [])


    // const [coordinate, setCoordinate] = React.useState( new AnimatedRegion({
    //     latitude: 37.78825,
    //     longitude: -122.4324,
    //   }))

    const progress = useDrawerProgress()
    const scale = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [1, 0.8]
    } )
    const borderRadius = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [0, 26]
    } )
    const animatedStyle = { borderRadius, transform: [{scale}] }

    // React.useEffect(() => {
    //     if( route.params ) {
    //         setRegion({
    //             latitude: parseFloat(property.latitude), // 37.78825
    //             longitude: parseFloat(property.longitude), // -122.4324
    //             latitudeDelta: 0.0922,
    //             longitudeDelta: 0.0421,
    //         })
    //     }
    // }, [])

    // Handler
    const onRegionChangeHandler = ( region ) => {
        // setRegion( region.setValue(region) )
        setRegion( region )
    }

    return (
        <Animated.View
            style={{
                flex: 1,
                    backgroundColor: COLORS.white,
                    // position:"relative",
                    ...animatedStyle
            }}
        >
                <MapView
                    // mapType={Platform.OS == "android" ? "none" : "standard"}
                    region={region}
                    // initialRegion={region}
                    provider={PROVIDER_GOOGLE}
                    // customMapStyle={mapStyle}
                    showsUserLocation={true}
                    zoomEnabled={true}
                    showsCompass={true}
                    showsScale={true}
                    cacheEnabled={true}
                    loadingEnabled={true}
                    // onRegionChange={onRegionChangeHandler}
                    style={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                    }}
                >
                    {properties &&
                        properties.map( (item,index)  => (
                            <MapView.Marker
                                key={`${item.id}`}
                                title={item?.title}
                                description={item?.address}
                                // coordinate={coordinate}
                                coordinate={{"latitude":parseFloat(item?.latitude),"longitude":parseFloat(item?.longitude)}}
                            >
                                <View
                                    style={{
                                        width:30,
                                        height:30
                                    }}
                                >

                                    <Image
                                        source={icons.locationPin}
                                        style={{
                                            width:"100%",
                                            height:"100%"
                                        }}
                                    />
                                </View>
                            </MapView.Marker>
                        ))
                    }

                </MapView>
        </Animated.View>
    )
}

export default MapScreen

const styles = StyleSheet.create({})
