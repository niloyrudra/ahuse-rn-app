import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ActivityIndicator
} from 'react-native';

import useAxios from 'axios-hooks';

import { connect } from 'react-redux'
import { getAllCats, getAllTypes, getRecommendedProp, getPopularProp, getAllTaxData } from '../../store/property/propertyActions';

// Constants
import constants from '../../constants/constants';
import icons from '../../constants/icons';
import { COLORS ,FONTS ,SIZES } from '../../constants/theme';
import {menu, myProfile} from '../../constants/dummyData'

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import HorizontalCard from '../../components/HorizontalCard';
// import VerticalCard from '../../components/VerticalCard';
// import Section from '../../components/Section';

// Modal
import FilterModal from './FilterModal';
import PopularSection from '../../components/PopularSection';
import RecommendedSection from '../../components/RecommendedSection';

const Home = ({ navigation, allProperties, categories, selectedCats, selectedRecommended, selectedPopular, setAllCats, setPopularList, setRecommendedList }) => {

    const dispatch = useDispatch()
    React.useEffect(() => dispatch( getAllTaxData() ), []);
    // const allTaxData = useSelector( state => state.propertyReducer.allTax )

    // const [propertyByCat, setPropertyByCat] = React.useState([])
    const [recommendedProperty, setRecommendedProperty] = React.useState([])
    const [selectedCategoryId, setSelectedCategoryId] = React.useState()
    const [selectedMenuType, setSelectedMenuType] = React.useState(1)
    const [menuList, setMenuList] = React.useState([])
    // const [taxinomies, setTaxinomies] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const [showFilterModal, setShowFilterModal] = React.useState(false)

    // React.useEffect(() => {
    //     if(allTaxData) {
    //         // console.log(allTaxData)
    //         setTaxinomies( allTaxData )
    //     }
    // }, [allTaxData])

    React.useEffect(() => {

        if( categories && categories[0]){
            setSelectedCategoryId( categories[0].id )
            getPropertiesByCategoryHandler(  categories[0].id )
        }

    },[categories])

    React.useEffect(() => {
        setRecommendedProperty(allProperties.filter( i => i.recommended == 1 ))
    },[allProperties])

    // Handler
    const getPropertiesByCategoryHandler = ( categoryId ) => {
        // Retrieve the recommended properties
        let selectedProductsByCatID = allProperties.filter( item => item.cat_ids.includes( categoryId ) )
        // console.log("selectedProductsByCatID")
        // Set the featured properties as recommended properties
        setRecommendedProperty( selectedProductsByCatID );
    }

    const handleChangeCategory = ( categoryId, menuTypeId=null ) => {

        // Set the Selected Cat ID
        setSelectedCategoryId( categoryId )

        // Get Filtered properties by category name
        getPropertiesByCategoryHandler(categoryId)

        // console.log(propertyByCat.length)
        // Find the menu based on  the menu type
        if(menuTypeId)
        {
            let selectedMenu = menu.find( item => item.id == menuTypeId )
            // Set the menu base don the categoryId
            setMenuList( selectedMenu.list.filter( item => item?.categories.includes( categoryId ) ) )
        }

    }

    // Render Sections
    const renderSearch = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 40,
                    alignItems:"center",
                    marginHorizontal: SIZES.padding,
                    marginVertical: SIZES.base,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.lightGray2
                }}
            >
                {/* Icon */}
                <Image
                    source={icons.search}
                    style={{
                        height:20,
                        width:20,
                        tintColor: COLORS.black
                    }}
                />

                {/* Text Input */}
                <TextInput
                    style={{
                        flex:1,
                        marginLeft:SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder="Search Properties"
                />

                {/* Filter Button */}
                <TouchableOpacity
                    onPress={() => setShowFilterModal(true)}
                >
                    <Image
                        source={icons.filter}
                        style={{
                            height: 20,
                            width:20,
                            tintColor: COLORS.black
                        }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    const renderLocationSection = () => {
        return (
            <View
                style={{
                    marginTop:SIZES.padding,
                    marginHorizontal: SIZES.padding
                }}
            >
            <View
                style={{
                    flexDirection:"row",
                    alignItems:"center"
                }}
            >
                <Image
                    source={icons.location}
                    style={{
                        width:20,
                        height:20,
                        marginRight: SIZES.base,
                        tintColor: COLORS.primary
                    }}
                />
                <Text
                    style={{
                        color: COLORS.primary,
                        ...FONTS.body3
                    }}
                >
                    YOUR LOCATION
                </Text>
            </View>

                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        marginTop:SIZES.base,
                        alignItems: "center"
                    }}
                    // onPress={() => navigation.navigate( "MapScreen" )}
                >
                    <Text 
                        style={{
                            ...FONTS.h3
                        }}
                    >
                        {myProfile?.address}
                    </Text>

                    <Image
                        source={icons.down_arrow}
                        style={{
                            marginLeft: SIZES.base,
                            height: 20,
                            width:  20,
                            tintColor: COLORS.primary
                        }}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    const renderCatSection = () => {
        return (
            <FlatList
                horizontal
                data={selectedCats}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={ ( { item, index } ) => (
                    <TouchableOpacity
                        style={{
                            // flexDirection: "row",
                            flex:1,
                            height: 55,
                            marginTop: SIZES.padding,
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                            marginRight: index == menu.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 8,
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2,
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                        onPress={() => handleChangeCategory( item.id, selectedMenuType )}
                    >
                        <Text
                            style={{
                                color: selectedCategoryId == item.id ? COLORS.white : COLORS.darkGray,
                                alignSelf: 'center',
                                marginRight: SIZES.base,
                                // ,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }


    const renderMenuTitles = () => {
        return (
            <FlatList
                horizontal
                data={menu}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={ ( { item, index } ) => (
                    <TouchableOpacity
                        style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == menu.length - 1 ? SIZES.padding : 0
                        }}
                        onPress={() => {
                            // console.log("menu section")
                            setSelectedMenuType( item.id )
                            handleChangeCategory( selectedCategoryId, item.id )
                        }}
                    >
                        <Text
                            style={{
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                ...FONTS.h3
                            }}
                        >
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        )
    }

    return (
        <View
            style={{
                flex:1
            }}
        >
            {/* Search Section */}
            {renderSearch()}
            
            {/* Filter Section */}
            {/* Modal */}
            {showFilterModal &&
                <FilterModal
                    isVisible={showFilterModal}
                    catList={selectedCats}
                    // typeList={selectedTypes}
                    onClose={() => setShowFilterModal(false)}
                />
            }

            {/* List */}
            <FlatList
                data={allProperties}
                keyExtractor={item => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Top Location */}
                        {renderLocationSection()}

                        {/* Categories */}
                        {renderCatSection()}

                        {/* Popular Section */}
                        <PopularSection navigation={navigation} data={recommendedProperty} catId={selectedCategoryId} />

                        {/* Recommended Section */}
                        <RecommendedSection navigation={navigation} data={recommendedProperty} catId={selectedCategoryId} />

                        {/* Menu Titles */}
                        {renderMenuTitles()}
                    </View>
                }
                renderItem={( { item, index } ) => {
                    if(isLoading){
                        return (
                            <View
                                style={{
                                    flex:1,
                                    alignItems:"center",
                                    justifyContent:"center"
                                }}
                            >
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            </View>

                        )
                    }
                    else{

                        return(
                            <HorizontalCard
                                containerStyle={{
                                    height:130,
                                    alignItems:"center",
                                    marginHorizontal: SIZES.padding,
                                    marginBottom: SIZES.radius
                                }}
                                imageStyle={{
                                    // marginTop: 20,
                                    margin: 10,
                                    height:110,
                                    width:110,
                                    borderRadius: SIZES.radius
                                }}
                                item={item}
                                onPress={() => navigation.navigate("PropertyDetail", {item:item})}
                            />
                        )
                    }
                    
                }}
                ListFooterComponent={
                    <View style={{height:200}} />
                }
            />

        </View>
    )
}

function mapStateToProps( state ) {
    // console.log(state?.propertyReducer.recommended)
    return {
        // selectedProperties: state?.propertyReducer?.allProperties,
        selectedCats: state?.propertyReducer?.allCategories,
        selectedPopular: state?.propertyReducer?.popular,
        selectedRecommended: state?.propertyReducer?.recommended,
    }
}

function mapDispatchToProps( dispatch ) {
    return {
        // setAllProperties: selectedProperties => dispatch( getAllProperties( selectedProperties ) ),
        setAllCats: selectedCats => dispatch( getAllCats( selectedCats ) ),
        setPopularList: selectedPopular => dispatch( getPopularProp( selectedPopular ) ),
        setRecommendedList: selectedRecommended => dispatch( getRecommendedProp( selectedRecommended ) ),
    }
}

export default connect( mapStateToProps, mapDispatchToProps ) ( Home )
