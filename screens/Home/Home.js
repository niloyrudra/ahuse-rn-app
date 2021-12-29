import React, { useRef } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage'

import { connect } from 'react-redux'
import { getAllCats, getAllTypes, getRecommendedProp, getPopularProp, getAllTaxData } from '../../store/property/propertyActions';

// Constants
import constants from '../../constants/constants';
import icons from '../../constants/icons';
import { COLORS ,FONTS ,SIZES } from '../../constants/theme';
import {myProfile} from '../../constants/constants'

// Redux
import { useDispatch, useSelector } from 'react-redux';

// Components
import HorizontalCard from '../../components/HorizontalCard';

// Modal
import FilterModal from './FilterModal';
import PopularSection from '../../components/PopularSection';
import RecommendedSection from '../../components/RecommendedSection';
import SearchModal from './SearchModal';

const Home = ({ navigation, allProperties, categories, selectedCats, selectedRecommended, selectedPopular, setAllCats, setPopularList, setRecommendedList }) => {

    const searchRef = useRef()

    const dispatch = useDispatch()
    React.useEffect(() => dispatch( getAllTaxData() ), []);
    const allTaxData = useSelector( state => state.propertyReducer.allTax )

    const [ searchQuery, setSearchQuery ] = React.useState('')
    const [ searchResultData, setSearchResultData ] = React.useState([])
    const [recommendedProperty, setRecommendedProperty] = React.useState([])
    const [selectedCategoryId, setSelectedCategoryId] = React.useState()
    const [propertiesByType, setPropertiesByType] = React.useState([])
    const [ typeId , setTypeId ] = React.useState([])
    const [typeTaxonomies, setTypeTaxonomies] = React.useState([])
    const [catTaxonomies, setCatTaxonomies] = React.useState([])
    const [areaTaxonomies, setAreaTaxonomies] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [isLoggedIn, setIsLoggedIn] = React.useState(false)

    const [showFilterModal, setShowFilterModal] = React.useState(false)
    const [showSearchResultModal, setShowSearchResultModal] = React.useState(false)

    React.useEffect(() => {
        if(allTaxData) {
            if( allTaxData.action_cat ) setTypeTaxonomies( allTaxData.action_cat.filter( item => item.count > 0 ) )
            if( allTaxData.cat ) {
                setCatTaxonomies( allTaxData.cat.filter( item => item.count > 0 ) )
                setAllCats( allTaxData.cat.filter( item => item.count > 0 ) )
            }
            if( allTaxData.area ) setAreaTaxonomies( allTaxData.area.filter( item => item.count > 0 ) )
        }
    }, [allTaxData])

    React.useEffect(() => {

        if( categories && categories[0]){
            setSelectedCategoryId( categories[0].id )
            getPropertiesByCategoryHandler(  categories[0].id )
        }

    },[categories])

    React.useEffect(() => {
        setRecommendedProperty(allProperties.filter( i => i.recommended == 1 ))
    },[allProperties])

    React.useEffect(() => {
        setTypeId(typeTaxonomies[0]?.id)
        if(allProperties.length) setPropertiesByType(allProperties.filter( i => i.cad_ids.includes( typeTaxonomies[0]?.id ) ))
    },[typeTaxonomies])

    // Handler
    const getPropertiesByCategoryHandler = ( categoryId ) => {
        // Retrieve the recommended properties
        let selectedProductsByCatID = allProperties.filter( item => item.cat_ids.includes( categoryId ) )
        // Set the featured properties as recommended properties
        setRecommendedProperty( selectedProductsByCatID );
    }

    const getPropertiesByTypeHandler = ( typeId ) => {
        // Retrieve the recommended properties
        let selectedProductsByType = allProperties.filter( item => item.cad_ids.includes( typeId ) )
        // Set the featured properties as recommended properties
        setPropertiesByType( selectedProductsByType );
    }

    const handleChangeTax = ( categoryId, typeId ) => {

        // Set the Selected Cat ID
        setSelectedCategoryId( categoryId )

        // Get Filtered properties by category name
        getPropertiesByCategoryHandler(categoryId)

        if(typeId)
        {
            getPropertiesByTypeHandler( typeId )
        }
        else
        {
            getPropertiesByTypeHandler( typeTaxonomies[0]?.id )
        }

    }

    React.useEffect(() => {if(showSearchResultModal == false) setSearchResultData([])}, [showSearchResultModal])

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
                    ref={searchRef}
                    style={{
                        flex:1,
                        marginLeft:SIZES.radius,
                        ...FONTS.body3
                    }}
                    // value={searchQuery}
                    placeholder="Search Properties"
                    onChangeText={(value) => {
                        searchRef.current = value
                        if(searchRef.current.length > 1)
                        {
                            setSearchQuery(value)
                            setTimeout(() => {
                                if(allProperties)
                                {
                                    allProperties.forEach(item => {
                                        if(item.title.toLowerCase().includes( value.toLowerCase() ))
                                        {
                                            setSearchResultData([...searchResultData, item])
                                        }
                                    })
                                    setShowSearchResultModal(true)
                                }
                            }, 500)
                        }
                    }}
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
                            marginRight: index == selectedCats.length - 1 ? SIZES.padding : 0,
                            paddingHorizontal: 8,
                            borderRadius: SIZES.radius,
                            backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2,
                            justifyContent:"center",
                            alignItems:"center"
                        }}
                        onPress={() => handleChangeTax( item.id, typeId )}
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

    const renderTypes = () => {
        return (
            <FlatList
                horizontal
                data={typeTaxonomies}
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
                            marginRight: index == typeTaxonomies.length - 1 ? SIZES.padding : 0
                        }}
                        onPress={() => {
                            setTypeId( item.id )
                            handleChangeTax( selectedCategoryId, item.id )
                        }}
                    >
                        <Text
                            style={{
                                color: typeId == item.id ? COLORS.primary : COLORS.black,
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

    React.useEffect(() => {
        if(allProperties.length == 0)
        {
            console.log("___________________________NO DATA!!!")
        }
        else{
            console.log("___________________________HAVE DATA!!!")
        }
    }, [])

    // React.useEffect(() => {
    //     const checkForUser = async () => {
    //         const hasToken = await AsyncStorage.getItem("token")
    //         if( hasToken ) setIsLoggedIn(true)
    //     };        
    //     checkForUser()

    //     return () => {
    //         setIsLoggedIn(false)
    //     }
    // }, [])

    // console.log(isLoggedIn)

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
                    data={allProperties}
                    isVisible={showFilterModal}
                    catList={catTaxonomies}
                    typeList={typeTaxonomies}
                    areaList={areaTaxonomies}
                    onClose={() => setShowFilterModal(false)}
                    onGenerateSearchData={(data) => setSearchResultData(data)}
                    onShowSearchModal={() => setShowSearchResultModal(true)}
                />
            }
            {showSearchResultModal &&
                <SearchModal
                    navigation={navigation}
                    isVisible={showSearchResultModal}
                    searchResultData={ searchResultData }
                    query={searchQuery}
                    onClose={() => setShowSearchResultModal(false)}
                />
            }

            {/* List */}
            <FlatList
                // data={allProperties}
                data={propertiesByType}
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

                        {/* Types */}
                        {renderTypes()}

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
