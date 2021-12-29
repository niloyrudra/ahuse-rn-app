import React from 'react'
import { Text, View, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

import { useDispatch } from 'react-redux'
import { setNewCartItem } from '../../store/cart/cartActions';

// Components
import Header from '../../components/Header';
import LineDivider from '../../components/LineDivider';
// Contants
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import icons from '../../constants/icons'
import CartQuantityButton from '../../components/CartQuantityButton';
import StepperInput from '../../components/StepperInput';
import TextButton from '../../components/TextButton';

const PropertyDetail = ({navigation, route}) => {
    const property = route.params.item
    const dispatch = useDispatch()

    const [quantity, setQuantity] = React.useState(1)
    const [region, setRegion] = React.useState({
        latitude: 37.78825, // 37.78825
        longitude: -122.4324, // -122.4324
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    React.useEffect(() => {
        if( route.params ) {
            setRegion({
                latitude: parseFloat(property.latitude), // 37.78825
                longitude: parseFloat(property.longitude), // -122.4324
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        }
        return () => {
            setQuantity(1)
        }
    }, [])

    // const [markers, setMarkers] = React.useState([
    //     {
    //         latlng: { latitude : 37.78825, longitude : -122.4324 },
    //         title: 'Title',
    //         description: 'Description',
    //     },
    //     {
    //         latlng: { latitude : 36.78825, longitude : -102.4324 },
    //         title: 'Title 1',
    //         description: 'Description 1',
    //     },
    //     {
    //         latlng: { latitude : 30.78825, longitude : -111.4324 },
    //         title: 'Title 2',
    //         description: 'Description 2',
    //     },
    // ])

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

    // Handler
    const onRegionChangeHandler = ( region ) => {
        setRegion( region )
    }

    // Render Sections
    const renderDetail= () => {
        return (
            <View
                style={{
                    marginTop:SIZES.radius,
                    marginBottom:SIZES.padding,
                    paddingHorizontal:SIZES.padding
                }}
            >
                {/* Property Card */}
                <View
                    style={{
                        height: 190,
                        borderRadius: 15,
                        backgroundColor: COLORS.lightGray2
                    }}
                >
                    {/* Category & Favourite */}
                    <View
                        style={{
                            flexDirection:"row",
                            justifyContent:"space-between",
                            marginTop:SIZES.base,
                            paddingHorizontal:SIZES.radius
                        }}
                    >
                        {/* Category */}
                        <View
                            style={{
                                // flexDirection:"row",
                                flex:1,
                            }}
                        >
                            {renderCategories()}
                        </View>

                        {/* Favourite */}
                        <Image
                            source={icons.love}
                            style={{
                                width:20,
                                height:20,
                                tintColor: property?.isFav ? COLORS.primary : COLORS.gray
                            }}
                        />

                    </View>

                    {/* Banner Image */}
                    <View
                        style={{
                            flex:1,
                            padding:SIZES.base,
                            overflow:"hidden",
                        }}
                    >

                        <Image
                            source={{uri:property.thumbnail}}
                            resizeMode='cover'
                            style={{
                                // height:170,
                                height:'100%',
                                width:'100%',
                            borderRadius:SIZES.radius
                            }}
                        />
                    </View>

                </View>

                {/* Property info */}
                <View
                    style={{
                        marginTop:SIZES.padding
                    }}
                >
                    {/* Title */}
                    <Text
                        style={{
                            ...FONTS.h1
                        }}
                    >
                        { property?.title }
                    </Text>
                    {/* Address */}
                    <Text
                        style={{
                            color:COLORS.gray,
                            ...FONTS.body4
                        }}
                    >
                        { property?.address }
                    </Text>

                    {/* Type */}
                    {renderTypes()}

                    {/* Description */}
                    <Text
                        style={{
                            marginTop:SIZES.base,
                            color:COLORS.darkGray,
                            textAlign: 'justify',
                            ...FONTS.body3
                        }}
                    >
                        { property?.content }
                    </Text>

                </View>

            </View>
        )
    };

    const renderCategories = () => {
        return (
            <View
                style={{
                    flex:1
                }}
            >
                {  property.cat_names && property.cat_names.length &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center",
                            // marginTop: 10
                        }}
                    >
                        <Image
                            source={icons.category}
                            style={{
                                width:20,
                                height:20,
                                tintColor: COLORS.gray
                            }}
                        />

                        {
                            property?.cat_names.map( (item, index) => (
                                <Text
                                    style={{
                                        ...FONTS.body4,
                                        paddingHorizontal: SIZES.base,
                                        borderLeftWidth: index > 0 ? 1 : 0,
                                        borderLeftColor: COLORS.gray,
                                        color:COLORS.gray
                                    }}
                                    key={`${item}`}
                                >{item}</Text>
                            ) )
                        }

                    </View>
                }
            </View>
        )
    }

    const renderTypes = () => {
        return (
            <View
                style={{
                    flex:1,
                    marginVertical: SIZES.base
                }}
            >
                { property.cad_names && property.cad_names.length &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:"center",
                            marginTop: 10
                        }}
                    >
                        <Image
                            source={icons.houseMenu}
                            style={{
                                width:20,
                                height:20,
                                tintColor: COLORS.primary
                            }}
                        />

                        {
                            property.cad_names.map( (item, index) => (
                                <Text
                                    style={{
                                        ...FONTS.body3,
                                        paddingHorizontal: SIZES.base,
                                        borderLeftWidth: index > 0 ? 1 : 0,
                                        borderLeftColor: COLORS.gray3
                                    }}
                                    key={`${item}`}
                                >{item}</Text>
                            ) )
                        }

                    </View>
                }
            </View>
        )
    }

    const renderMap = () => {

        return (
            <View 
                style={{
                    flex:1,
                    height: 240,
                    justifyContent:"center",
                    alignItems:"center",
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.transparentBlack1,
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.padding,
                    overflow:"hidden"
                }}
            >
                <MapView
                    // mapType={Platform.OS == "android" ? "none" : "standard"}
                    // region={region}
                    initialRegion={region}
                    provider={PROVIDER_GOOGLE}
                    // customMapStyle={mapStyle}
                    showsUserLocation={true}
                    onRegionChange={onRegionChangeHandler}
                    style={{
                        width:'100%',
                        height: '100%'
                    }}
                >
                    <MapView.Marker
                        title={property?.title}
                        description={property?.address}
                        coordinate={{"latitude":parseFloat(property?.latitude),"longitude":parseFloat(property?.longitude)}}
                        // width={80}
                        // height={60}
                        // tracksViewChanges={false}
                        // image={icons.location_clr}
                        // icon={icons.location_clr}
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

                </MapView>

            </View>
        )
    }

    const renderRoomsQuantity = () => {
        return (
            <View
                style={{
                    flex:1,
                    flexDirection:"row",
                    // flexWrap:'wrap',
                    alignItems:'flex-end',
                    justifyContent:'space-around',
                    marginTop:SIZES.radius,
                    // paddingVertical: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    // borderTopWidth:1,
                    // borderBottomWidth:1,
                    // borderColor: COLORS.lightGray1,

                }}
            >
                {
                    property?.rooms &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:'flex-end',
                            justifyContent:'flex-end',
                            // paddingRight:SIZES.padding
                        }}
                    >
                        <Image
                            source={icons.room}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.primary,
                                marginRight: SIZES.base
                            }}
                        />
                        <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.rooms} <Text style={{...FONTS.body5}}>room(s)</Text></Text>
                    </View>
                }
                {
                    property?.bedrooms &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:'flex-end',
                            justifyContent:'flex-end',
                            // marginRight:SIZES.padding,
                            paddingHorizontal: SIZES.radius,
                            borderLeftWidth:1,
                            borderRightWidth:1,
                            borderColor:COLORS.gray3
                        }}
                    >
                        <Image
                            source={icons.bedroom}
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: COLORS.primary,
                                marginRight: SIZES.base
                            }}
                        />
                        <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.bedrooms} <Text style={{...FONTS.body5}}>bedroom(s)</Text></Text>
                    </View>
                }
                {
                    property?.bathrooms &&
                    <View
                        style={{
                            flexDirection:"row",
                            alignItems:'flex-end',
                            justifyContent:'flex-end',
                            marginRight:SIZES.padding
                        }}
                    >
                        <Image
                            source={icons.bathroom}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.primary,
                                marginRight: SIZES.base
                            }}
                        />
                        <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.bathrooms} <Text style={{...FONTS.body5}}>bathroom(s)</Text></Text>
                    </View>
                }

            </View>
        )
    }

    const renderSectionHeader = ( label ) => {
        return (
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center",
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 20,
                    marginTop: SIZES.radius,
                }}
            >
                <Text
                    style={{
                        flex:1,
                        ...FONTS.h2
                    }}
                >
                    {label}
                </Text>

                <Text
                    style={{
                        color:COLORS.gray2,
                        ...FONTS.body4
                    }}
                >
                    {property?.features?.length} item(s)
                </Text>

            </View>
        )
    }

    const renderFooter = () => {
        return (
            <View
                style={{
                    flexDirection:"row",
                    height:120,
                    alignItems:"center",
                    paddingHorizontal:SIZES.padding,
                    paddingBottom:SIZES.radius
                }}
            >
                {/* Stepper Input */}
                <StepperInput
                    value={quantity}
                    // containerStyle={{}}
                    onMinus={() => {
                        if( quantity > 1 ){
                            setQuantity(quantity-1)
                        }
                    }}
                    onAdd={() => setQuantity(quantity+1)}
                />

                {/* Button */}
                <TextButton
                    label="Buy Now"
                    label2={property?.price ? `£${property?.price}` : `£00.00`}
                    // labelStyle={{}}
                    buttonContainerStyle={{
                        flex:1,
                        flexDirection:"row",
                        // alignItems:"center",
                        // justifyContent:"center",
                        height:60,
                        marginLeft:SIZES.radius,
                        // paddingHorizontal:SIZES.radius,
                        paddingHorizontal:SIZES.padding,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.primary
                    }}
                    onPress={() => {
                        dispatch( setNewCartItem( property, quantity ) )
                        // navigation.navigate("Cart", {item:property, qnt: quantity})
                        navigation.navigate("Cart")
                    }}
                />

            </View>
        )
    }

    return (
        <Animated.View
            style={{
                flex: 1,
                 backgroundColor: COLORS.white,
                 ...animatedStyle
            }}
        >
            {/* Header */}
            <Header
                containerStyle={{
                    height:50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: 'center'
                }}
                // title={property ? property?.title?.toUpperCase() : 'DETAIL'}
                title='DETAIL'
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width:40,
                            height:40,
                            justifyContent:"center",
                            alignItems: "center",
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius,
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            source={icons.back}
                            style={{
                                width:20,
                                height:20,
                                tintColor:COLORS.gray2
                            }}
                        />
                    </TouchableOpacity>
                }
                rightComponent={
                    <CartQuantityButton
                        containerStyle={{}}
                        iconStyle={{}}
                        quantity={quantity}
                        icons={icons.cart}
                        onPress={() => navigation.navigate("Cart")}
                    />
                }
            />

            {/* Body */}
            <ScrollView>

                {/* Property Detail */}
                {renderDetail()}

                {/* Line Devider */}
                <LineDivider/>

                {/* Rooms Detail */}
                {renderRoomsQuantity()}

                {/* Map */}
                {renderMap()}

                {/* Features */}
                {renderSectionHeader("Features")}

                {/* Features */}
                <View
                    style={{
                        flex:1,
                        paddingHorizontal: SIZES.padding,
                        marginBottom:SIZES.padding
                    }}
                >
                    {
                        property.features && property.features.map( (item, index) => (
                            <View
                                style={{
                                    flexDirection:"row",
                                    marginVertical: 5,
                                    justifyContent:"space-between",
                                    alignItems:'center',
                                    height:35
                                }}
                                key={`${index}`}
                            >
                                {/* Name */}
                                <View
                                    style={{
                                        flex:1,
                                        // paddingHorizontal:20,
                                        justifyContent:"center"
                                    }}
                                >
                                    <Text style={{ ...FONTS.body4, color:COLORS.gray }}>{item.toUpperCase()}</Text>
                                </View>

                                {/* Icon */}
                                <Image
                                    source={icons.correct}
                                    style={{
                                        width:20,
                                        height:20,
                                        tintColor: COLORS.primary
                                    }}
                                />
                            </View>
                        ) )
                    }
                </View>

            </ScrollView>

            {/* Line Devider */}
            <LineDivider/>
            
            {/* Render Footer */}
            {renderFooter()}

        </Animated.View>
    );
}

export default PropertyDetail