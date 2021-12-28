import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform, FlatList } from 'react-native'
import { useDrawerProgress } from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';

// import {BlurView} from '@react-native-community/blur'
// Components
import PropertyCreatorCardInfo from '../../components/PropertyCreatorCardInfo'
import Header from '../../components/Header';

// Contants
import { COLORS, FONTS, SIZES } from '../../constants/theme'
import icons from '../../constants/icons'
import CartQuantityButton from '../../components/CartQuantityButton';
import { sizes } from '../../constants/dummyData';

// const HEADER_HEIGHT = 350;


const PropertyDetail = ({navigation, route}) => {
    const property = route.params.item

    const progress = useDrawerProgress()
    // const flatListRef = React.useRef()

    const scale = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [1, 0.8]
    } )

    const borderRadius = Animated.interpolateNode( progress, {
        inputRange: [0 ,1],
        outputRange: [0, 26]
    } )

    const animatedStyle = { borderRadius, transform: [{scale}] }

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
                }}
            >
                <View>
                    <Image
                        source={icons.locationPin}
                        style={{
                            width:35,
                            height:35,
                            tintColor: COLORS.primary
                        }}
                    />
                </View>
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

    const renderFeatures = () => {
        // console.log(property.features)
        return (
            <FlatList
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    // ...animatedStyle,
                    overflow:"hidden"
                }}
                data={property.features}
                keyExtractor={item => `property-${item}`}
                showsVerticalScrollIndicator={false}
                // ListHeaderComponent={
                //     <View>
                //         {/* Property Detail */}
                //         {renderDetail()}

                //         {/* Rooms Detail */}
                //         {renderRoomsQuantity()}

                //         {/* Map */}
                //         {renderMap()}

                //         {/* Features */}
                //         {renderFeatures()}

                //         {/* Features Header */}
                //         {renderSectionHeader("Features")}

                //     </View>
                // }
                // scrollEventThrottle={16}
                // onScroll={Animated.event([
                //         { nativeEvent: {
                //             contentOffset: {
                //                 y: scrollY
                //             }
                //         } }
                //     ], { useNativeDriver: true } )
                // }
                renderItem={({item, index}) => (
                    <View
                        style={{
                            flexDirection:"row",
                            paddingHorizontal: 30,
                            marginVertical: 5,
                            justifyContent:"space-between",
                            alignItems:'center',
                            height:35
                        }}
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
                ) }
                ListFooterComponent={
                    <View
                        style={{
                            height:120,
                            marginHorizontal: SIZES.padding,
                            // PaddingTop: SIZES.padding,
                        }}
                    >

                        <View
                            style={{
                                flex:1,
                                flexDirection:"row",
                                justifyContent: 'space-between',
                                alignItems:"center",
                                // height:120
                            }}
                        >
                            <Text
                                style={{
                                    flex:1,
                                    ...FONTS.h1,
                                }}
                            >
                                Price
                            </Text>
                            
                            <View
                                style={{
                                    flex:1,
                                    flexDirection:"row",
                                    justifyContent: 'flex-end',
                                    alignItems:"flex-end"
                                }}
                            >
                                <Image
                                    source={icons.poundS}
                                    style={{
                                        width:24,
                                        height: 24,
                                        tintColor:COLORS.black,
                                        marginRight: SIZES.base,
                                        // fontWeight:"bold"
                                        top:-10
                                    }}
                                />
                                <Text
                                    style={{
                                        ...FONTS.h1,
                                        fontSize:32,
                                        // paddingBottom:0
                                    }}
                                >
                                    {property?.price.toString()}
                                </Text>
                            </View>

                        </View>

                    </View>
                }
            />
        )
    };

    // console.log(property.features)

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
                        quantity={0}
                        icons={icons.cart}
                        onPress={() => console.log("Cart")}
                    />
                }
            />

            {/* Body */}
            <ScrollView>

                {/* Property Detail */}
                {renderDetail()}

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


        </Animated.View>
    );
}


// const PropertyDetail = ({navigation, route}) => {
//     const property = route.params.item
    
//     //////////
//     const progress = useDrawerProgress()
//     // const flatListRef = React.useRef()

//     // console.log(Animated)

//     const scale = Animated.interpolateNode( progress, {
//         inputRange: [0 ,1],
//         outputRange: [1, 0.8]
//     } )

//     const borderRadius = Animated.interpolateNode( progress, {
//         inputRange: [0 ,1],
//         outputRange: [0, 26]
//     } )

//     const animatedStyle = { borderRadius, transform: [{scale}] }
//     ///////////

//     const [isFavourite, setIsFavourite] = React.useState(false)

//     // const scrollY = React.useRef( new Animated.Value(0) ).current

//     const renderHeaderBar = () => {
//         return (
//             <View
//                 style={{
//                     position:"absolute",
//                     top:0,
//                     left:0,
//                     right:0,
//                     height:90,
//                     flexDirection:"row",
//                     alignItems:"flex-end",
//                     justifyContent: "space-between",
//                     paddingHorizontal: SIZES.padding,
//                     paddingBottom:10
//                 }}
//             >
//                 {/* Screen Overlay */}
//                 {/* <Animated.View
//                     style={{
//                         position:"absolute",
//                         top:0,
//                         left:0,
//                         right:0,
//                         bottom:0,
//                         backgroundColor:COLORS.black,
//                         opacity: scrollY.interpolate({
//                             inputRange: [HEADER_HEIGHT -100, HEADER_HEIGHT - 70],
//                             outputRange: [0, 1]
//                         })
//                     }}
//                 /> */}

//                 {/* Header Bar Title */}
//                 <Animated.View
//                     style={{
//                         position:"absolute",
//                         top:0,
//                         left:0,
//                         right:0,
//                         bottom:0,
//                         // backgroundColor:COLORS.black,
//                         alignItems:"center",
//                         justifyContent:"flex-end",
//                         paddingBottom:10,
//                         // opacity: scrollY.interpolate({
//                         //     inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
//                         //     outputRange: [0, 1]
//                         // }),
//                         // transform: [
//                         //     {
//                         //         translateY: scrollY.interpolate({
//                         //             inputRange:[HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
//                         //             outputRange: [50, 0],
//                         //             extrapolate:"clamp"
//                         //         })
//                         //     }
//                         // ]
//                     }}
//                 >
//                     <Text style={{color:COLORS.lightGray2, ...FONTS.body4}}>Posted by</Text>
//                     <Text style={{color:COLORS.white2, ...FONTS.h3}}>
//                         {property?.author_name}
//                     </Text>
//                 </Animated.View>

//                 {/* Back Button */}
//                 <TouchableOpacity
//                     style={{
//                         alignItems:"center",
//                         justifyContent:"center",
//                         width:35,
//                         height:35,
//                         borderRadius: 18,
//                         borderWidth:1,
//                         borderColor:COLORS.lightGray,
//                         backgroundColor:COLORS.transparentBlack5
//                     }}
//                     onPress={() => navigation.goBack()}
//                 >
//                     <Image
//                         source={icons.back}
//                         style={{
//                             width:15,
//                             height:15,
//                             tintColor:COLORS.lightGray
//                         }}
//                     />
//                 </TouchableOpacity>

//                 {/* Bookmark Button */}
//                 <TouchableOpacity
//                     style={{
//                         alignItems:"center",
//                         justifyContent:"center",
//                         width:35,
//                         height:35,
//                         // borderRadius: 18,
//                         // borderWidth:1,
//                         // borderColor:COLORS.lightGray,
//                         // backgroundColor:COLORS.transparentBlack5
//                     }}
//                     onPress={() => console.log("Bookmarked")}
//                 >
//                     <Image
//                         source={property?.isBookmarked ? icons.bookmarkFill : icons.bookmark }
//                         style={{
//                             width:25,
//                             height:25,
//                             // tintColor:COLORS.lightGreen1
//                             tintColor:COLORS.primary
//                         }}
//                     />
//                 </TouchableOpacity>
//             </View>
//         )
//     }

//     const renderHeader=() => {
//         return (
//             <View
//                 style={{
//                     marginTop: -1000,
//                     paddingTop:1000,
//                     alignItems:"center",
//                     overflow: "hidden",
//                 }}
//             >
//                 {/* Background Image */}
//                 <Animated.Image
//                     source={{uri:property?.thumbnail}}
//                     resizeMode="cover"
//                     style={{
//                         height: HEADER_HEIGHT,
//                         width:"200%",
//                         // transform: [
//                         //     {
//                         //         translateY: scrollY.interpolate({
//                         //             inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
//                         //             outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
//                         //         })
//                         //     },
//                         //     {
//                         //         scale: scrollY.interpolate({
//                         //             inputRange:[-HEADER_HEIGHT, 0 , HEADER_HEIGHT],
//                         //             outputRange:[2,1,0.75],
//                         //         })
//                         //     }
//                         // ]
//                     }}
//                 />

//                 {/* Creator */}
//                 <Animated.View
//                     style={{
//                         position:"absolute",
//                         bottom:10,
//                         left:30,
//                         right:30,
//                         height:80,
//                         // transform: [
//                         //     {
//                         //         translateY: scrollY.interpolate({
//                         //             inputRange: [0, 170, 250],
//                         //             outputRange: [0, 0, 100],
//                         //             extrapolate: "clamp"
//                         //         })
//                         //     }
//                         // ]
//                     }}
//                 >
//                     <PropertyCreatorCardInfo navigation={navigation} property={property} />
//                 </Animated.View>

//             </View>
//         )
//     }

//     const renderCategories = () => {
//         return (
//             <View
//                 style={{
//                     flex:1
//                 }}
//             >
//                 {  property.cat_names && property.cat_names.length &&
//                     <View
//                         style={{
//                             flexDirection:"row",
//                             alignItems:"center",
//                             marginTop: 10
//                         }}
//                     >
//                         <Image
//                             source={icons.category}
//                             style={{
//                                 width:20,
//                                 height:20,
//                                 tintColor: COLORS.primary
//                             }}
//                         />

//                         {
//                             property?.cat_names.map( (item, index) => (
//                                 <Text
//                                     style={{
//                                         ...FONTS.body3,
//                                         paddingHorizontal: SIZES.base,
//                                         borderLeftWidth: index > 0 ? 1 : 0,
//                                         borderLeftColor: COLORS.gray3
//                                     }}
//                                     key={`${item}`}
//                                 >{item}</Text>
//                             ) )
//                         }

//                     </View>
//                 }
//             </View>
//         )
//     }

//     const renderTypes = () => {
//         return (
//             <View
//                 style={{
//                     flex:1
//                 }}
//             >
//                 { property.cad_names && property.cad_names.length &&
//                     <View
//                         style={{
//                             flexDirection:"row",
//                             alignItems:"center",
//                             marginTop: 10
//                         }}
//                     >
//                         <Image
//                             source={icons.houseMenu}
//                             style={{
//                                 width:20,
//                                 height:20,
//                                 tintColor: COLORS.primary
//                             }}
//                         />

//                         {
//                             property.cad_names.map( (item, index) => (
//                                 <Text
//                                     style={{
//                                         ...FONTS.body3,
//                                         paddingHorizontal: SIZES.base,
//                                         borderLeftWidth: index > 0 ? 1 : 0,
//                                         borderLeftColor: COLORS.gray3
//                                     }}
//                                     key={`${item}`}
//                                 >{item}</Text>
//                             ) )
//                         }

//                     </View>
//                 }
//             </View>
//         )
//     }

//     const renderPropertyContent = () => {
//         return (
//             <View
//                 style={{
//                     marginTop:SIZES.padding
//                 }}
//             >
//                 <Text
//                     style={{
//                         color: COLORS.darkGray,
//                         ...FONTS.body3
//                     }}
//                 >
//                     {property?.content}
//                 </Text>
//             </View>
//         )
//     }

//     const renderSectionHeader = ( label ) => {
//         return (
//             <View
//                 style={{
//                     flexDirection:"row",
//                     alignItems:"center",
//                     paddingHorizontal: 30,
//                     paddingBottom: 20,
//                     marginTop: SIZES.radius,
//                 }}
//             >
//                 <Text
//                     style={{
//                         flex:1,
//                         ...FONTS.h2
//                     }}
//                 >
//                     {label}
//                 </Text>

//                 <Text
//                     style={{
//                         color:COLORS.gray2,
//                         ...FONTS.body4
//                     }}
//                 >
//                     {property?.features.length} item(s)
//                 </Text>

//             </View>
//         )
//     }

//     const renderPropertyInfo = () => {
//         return (
//             <View
//                 style={{
//                     paddingHorizontal: 30,
//                     paddingVertical: 20,
//                     alignItems:"center"
//                 }}
//             >
//                 <View
//                     style={{
//                         flexDirection:"row",
//                         // height:170,
//                         // width:SIZES.width,
//                     }}
//                 >
//                     {/* Info Section */}
//                     <View
//                         style={{
//                             // flex:1.5,
//                             flex:4,
//                             justifyContent:'center',
//                         }}
//                     >
//                         {/* Title */}
//                         <Text
//                             style={{
//                                 ...FONTS.h1,
//                             }}
//                         >
//                             {property?.title}
//                         </Text>

//                         {/* Address */}
//                         <View
//                             style={{
//                                 flexDirection:"row",
//                                 alignItems:"center",
//                                 marginTop: 5
//                             }}
//                         >
//                             <Image
//                                 source={icons.location}
//                                 style={{
//                                     width:20,
//                                     height:20,
//                                     tintColor: COLORS.gray
//                                     // marginRight: SIZES.base
//                                 }}
//                             />
//                             <Text
//                                 style={{
//                                     marginLeft: 5,
//                                     color: COLORS.gray,
//                                     ...FONTS.body4,
//                                 }}
//                             >
//                                 {property?.address}
//                             </Text>
//                         </View>

//                         {/* Category & Type */}
//                         {renderCategories()}

//                         {/* Category & Type */}
//                         {renderTypes()}


//                     </View>
                    
//                     {/* Heart Section */}
//                     <TouchableOpacity
//                         style={{
//                             flex:1,
//                             alignItems:"flex-end",
//                             justifyContent:"flex-start"
//                         }}
//                         onPress={() => setIsFavourite( !isFavourite ) }
//                     >
//                         <Image
//                             source={icons.love}
//                             style={{
//                                 width:40,
//                                 height:40,
//                                 tintColor: isFavourite ? COLORS.primary : COLORS.lightGray1
//                             }}
//                         />
//                     </TouchableOpacity>

//                 </View>

//                 {/* Content */}
//                 {renderPropertyContent()}

//                 {/* Beds, rooms */}
//                 {renderRoomsQuantity()}

//             </View>
//         )
//     }

//     const renderRoomsQuantity = () => {
//         return (
//             <View
//                 style={{
//                     flex:1,
//                     flexDirection:"row",
//                     // flexWrap:'wrap',
//                     alignItems:'flex-end',
//                     justifyContent:'space-around',
//                     marginTop:SIZES.padding,
//                     paddingVertical: SIZES.radius,
//                     borderTopWidth:1,
//                     borderBottomWidth:1,
//                     borderColor: COLORS.lightGray1,

//                 }}
//             >
//                 {
//                     property?.rooms &&
//                     <View
//                         style={{
//                             flexDirection:"row",
//                             alignItems:'flex-end',
//                             justifyContent:'flex-end',
//                             marginRight:SIZES.padding
//                         }}
//                     >
//                         <Image
//                             source={icons.room}
//                             style={{
//                                 width: 30,
//                                 height: 30,
//                                 tintColor: COLORS.primary,
//                                 marginRight: SIZES.base
//                             }}
//                         />
//                         <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.rooms} <Text style={{...FONTS.body5}}>room(s)</Text></Text>
//                     </View>
//                 }
//                 {
//                     property?.bedrooms &&
//                     <View
//                         style={{
//                             flexDirection:"row",
//                             alignItems:'flex-end',
//                             justifyContent:'flex-end',
//                             marginRight:SIZES.padding
//                         }}
//                     >
//                         <Image
//                             source={icons.bedroom}
//                             style={{
//                                 width: 30,
//                                 height: 30,
//                                 tintColor: COLORS.primary,
//                                 marginRight: SIZES.base
//                             }}
//                         />
//                         <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.bedrooms} <Text style={{...FONTS.body5}}>bedroom(s)</Text></Text>
//                     </View>
//                 }
//                 {
//                     property?.bathrooms &&
//                     <View
//                         style={{
//                             flexDirection:"row",
//                             alignItems:'flex-end',
//                             justifyContent:'flex-end',
//                             marginRight:SIZES.padding
//                         }}
//                     >
//                         <Image
//                             source={icons.bathroom}
//                             style={{
//                                 width: 25,
//                                 height: 25,
//                                 tintColor: COLORS.primary,
//                                 marginRight: SIZES.base
//                             }}
//                         />
//                         <Text style={{color:COLORS.gray, ...FONTS.body3}}>{property.bathrooms} <Text style={{...FONTS.body5}}>bathroom(s)</Text></Text>
//                     </View>
//                 }

//             </View>
//         )
//     }

//     const renderMap = () => {
//         return (
//             <View 
//                 style={{
//                     flex:1,
//                     height: 240,
//                     justifyContent:"center",
//                     alignItems:"center",
//                     borderRadius: SIZES.radius,
//                     backgroundColor: COLORS.transparentBlack1,
//                     marginHorizontal: SIZES.padding,
//                     marginVertical: SIZES.padding,
//                 }}
//             >
//                 <View>
//                     <Image
//                         source={icons.locationPin}
//                         style={{
//                             width:35,
//                             height:35,
//                             tintColor: COLORS.primary
//                         }}
//                     />
//                 </View>
//             </View>
//         )
//     }

//     return (
//         <Animated.View
//             style={{
//                 flex: 1,
//                 backgroundColor: COLORS.white,
//                 ...animatedStyle,
//                 overflow:"hidden"
//             }}
//         >         
//             {/* Body */}
//             {/* <Animated.FlatList */}
//             <FlatList
//                 style={{
//                     flex: 1,
//                     backgroundColor: COLORS.white,
//                     ...animatedStyle,
//                     overflow:"hidden"
//                 }}
//                 data={property.features}
//                 keyExtractor={item => `property-${item}`}
//                 showsVerticalScrollIndicator={false}
//                 ListHeaderComponent={
//                     <View>
//                         {/* Header */}
//                         {renderHeader()}

//                         {/* Info */}
//                         {renderPropertyInfo()}

//                         {/* MAP */}
//                         {renderMap()}

//                         {/* Features Header */}
//                         {renderSectionHeader("Features")}

//                     </View>
//                 }
//                 // scrollEventThrottle={16}
//                 // onScroll={Animated.event([
//                 //         { nativeEvent: {
//                 //             contentOffset: {
//                 //                 y: scrollY
//                 //             }
//                 //         } }
//                 //     ], { useNativeDriver: true } )
//                 // }
//                 renderItem={({item, index}) => (
//                     <View
//                         style={{
//                             flexDirection:"row",
//                             paddingHorizontal: 30,
//                             marginVertical: 5,
//                             justifyContent:"space-between",
//                             alignItems:'center',
//                             height:35
//                         }}
//                     >
//                         {/* Name */}
//                         <View
//                             style={{
//                                 flex:1,
//                                 // paddingHorizontal:20,
//                                 justifyContent:"center"
//                             }}
//                         >
//                             <Text style={{ ...FONTS.body4, color:COLORS.gray }}>{item.toUpperCase()}</Text>
//                         </View>

//                         {/* Icon */}
//                         <Image
//                             source={icons.correct}
//                             style={{
//                                 width:20,
//                                 height:20,
//                                 tintColor: COLORS.primary
//                             }}
//                         />
//                     </View>
//                 ) }
//                 ListFooterComponent={
//                     <View
//                         style={{
//                             height:120,
//                             marginHorizontal: SIZES.padding,
//                             // PaddingTop: SIZES.padding,
//                         }}
//                     >

//                         <View
//                             style={{
//                                 flex:1,
//                                 flexDirection:"row",
//                                 justifyContent: 'space-between',
//                                 alignItems:"center",
//                                 // height:120
//                             }}
//                         >
//                             <Text
//                                 style={{
//                                     flex:1,
//                                     ...FONTS.h1,
//                                 }}
//                             >
//                                 Price
//                             </Text>
                            
//                             <View
//                                 style={{
//                                     flex:1,
//                                     flexDirection:"row",
//                                     justifyContent: 'flex-end',
//                                     alignItems:"flex-end"
//                                 }}
//                             >
//                                 <Image
//                                     source={icons.poundS}
//                                     style={{
//                                         width:24,
//                                         height: 24,
//                                         tintColor:COLORS.black,
//                                         marginRight: SIZES.base,
//                                         // fontWeight:"bold"
//                                         top:-10
//                                     }}
//                                 />
//                                 <Text
//                                     style={{
//                                         ...FONTS.h1,
//                                         fontSize:32,
//                                         // paddingBottom:0
//                                     }}
//                                 >
//                                     {property?.price.toString()}
//                                 </Text>
//                             </View>

//                         </View>

//                     </View>
//                 }
//             />

//             {/* HeaderBar */}
//             {renderHeaderBar()}

//         </Animated.View>
//     )
// }

export default PropertyDetail