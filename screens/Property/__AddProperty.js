import React from 'react';
import { Text, View, StyleSheet, TextInput, Button , KeyboardAvoidingView, Switch, FlatList, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from 'react-hook-form';

// Constants
import images from '../../constants/images';
import icons from '../../constants/icons';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

// Component
import TextInputComponent from '../../components/TextInputComponent'
import SwitchButtonComponent from '../../components/SwitchButtonComponent';
import TextButton from '../../components/TextButton'
import ExpoImagePickerComponent from '../../components/ExpoImagePickerComponent';
import PickerComponent from '../../components/PickerComponent';
import DatePickerComponent from '../../components/DatePickerComponent';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { insertNewProperty } from '../../store/property/propertyActions';
import { SafeAreaView } from 'react-native-safe-area-context';
import constants from '../../constants/constants';
import CustomSwitch from '../../components/CustomSwitch';
import CustomSwitchComponent from '../../components/CustomSwitchComponent';

const AddProperty = ({ navigation, route }) => {
    
    // const formRef = React.useRef(null)

    const dispatch = useDispatch()
    const [token, setToken] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const [propertyStatus, setPropertyStatus] = React.useState([])
    const [city, setCity] = React.useState([])
    const [countyState, setCountyState] = React.useState([])
    const [area, setArea] = React.useState([])
    const [features, setFeatures] = React.useState([])
    const [typeOrActionCat, setTypeOrActionCat] = React.useState([])
    const [categories, setCategories] = React.useState([])


    const { register, setValue, handleSubmit, control, reset, formState: { errors, isValid } } = useForm({
        defaultValues: {
          title: '',
          content: '',
          imageUri: '',
          cat: '',
          action_category: '',
          listedIn: '',
          propertyStatus: '',
          features: [],
          address: '',
          county: '',
          country: '',
          city: '',
          zip: '',
          neighborhood: '',
          price: '',
          beforePrice: '',
          afterPrice: '',
          yrTaxRate: '',
          ownersFee:'',
          featured:false,
          size: '',
          lotSize: '',
          rooms: '',
          bathrooms: '',
          bedrooms: '',
          energyIndex:'',
          energyClasses:'',
          garages: '',
          garageSize: '',
          year: '',
          yearTax:'',
          garden:false,
          date:'',
          customVideo:false,
          availability:'',
          basement:'',
          extConstruction:'',
          roofing:'',
          latitude: '',
          longitude: '',
          use_floor_plans:false,
          attic:false,
          gas_heat:false,
          wine_cellar:false,
          basketball_court:false,
          gym:false,
          pound:false,
          fireplace:false,
          ocean_view:false,
          lake_view:false,
          pool:false,
          back_yard:false,
          front_yard:false,
          fenced_yard:false,
          sprinklers:false,
          washer_and_Dryer:false,
          deck:false,
          balcony:false,
          laundry:false,
          concierge:false,
          chair_accessible:false,
          doorman:false,
          private_space:false,
          storage:false,
          recreation:false,
          roof_deck:false,
          header_type:false,
        //   min_height:false,
        //   max_height:false,
        //   keep_min:false,
        //   keep_max:false,
        //   pageCustomImage:false,
          internet:false,
        },
        mode: 'onBlur'
    });

    // const selectedToken = useSelector( state => state.userReducer.tempToken )
    const selectedToken = useSelector( state => state.userReducer.token )
    const selectedStatus = useSelector( state => state.propertyReducer?.allTax?.status )
    const selectedCity = useSelector( state => state.propertyReducer?.allTax?.city )
    const selectedCountyState = useSelector( state => state.propertyReducer?.allTax?.county_state )
    const selectedArea = useSelector( state => state.propertyReducer?.allTax?.area )
    const selectedFeature = useSelector( state => state.propertyReducer?.allTax?.features )
    const selectedCategories = useSelector( state => state.propertyReducer?.allTax?.cat )
    const selectedTypes = useSelector( state => state.propertyReducer?.allTax?.action_cat )

    React.useEffect(() => {
        if(selectedToken){
            // console.log((selectedToken))
            setToken(selectedToken)
        }
    }, [selectedToken])
    
    React.useEffect(() => {
        if(selectedStatus){
            // console.log((selectedStatus))
            setPropertyStatus(selectedStatus)
        }
    }, [selectedStatus])
    
    React.useEffect(() => {
        if(selectedCity){
            // console.log((selectedCity))
            setCity(selectedCity)
        }
    }, [selectedCity])
    
    React.useEffect(() => {
        if(selectedCountyState){
            // console.log((selectedCountyState))
            setCountyState(selectedCountyState)
        }
    }, [selectedCountyState])
    
    React.useEffect(() => {
        if(selectedArea){
            // console.log((selectedArea))
            setArea(selectedArea)
        }
    }, [selectedArea])
    
    React.useEffect(() => {
        if(selectedCategories){
            // console.log((selectedCategories))
            setCategories(selectedCategories)
        }
    }, [selectedCategories])

    React.useEffect(() => {
        if(selectedTypes){
            // console.log((selectedTypes))
            setTypeOrActionCat(selectedTypes)
        }
    }, [selectedTypes])

    React.useEffect(() => {
        if(selectedFeature){
            // console.log((selectedFeature))
            setFeatures(selectedFeature)
        }
    }, [selectedFeature])


    const onSubmit = data => {
        setIsLoading(true)
        if(data) {
            dispatch( insertNewProperty( data, token, setIsLoading ) )
        }
    };

    // const _scrollToInput = (reactNode) => {
        // Add a 'scroll' ref to your ScrollView
        // this.scroll.props.scrollToFocusedInput(reactNode)
        // console.log(reactNode)
    //   }
    // const _scrollToInput = index => {
        //console.log('called _scrollToIndex: ', index);
        // if (index <= comments.length && index >= 0){
            // formRef.current.scrollToIndex({animated: true, index: index})
        // }else{
        //   console.log('index out of range, scroll to bottom');
        //   formRef.current.scrollToIndex({animated: true, index: comments.length-1})
        // }
    //   }
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    return (
        // <ScrollView style={{flex: 1}} ref = 'scroll'>
        
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={keyboardVerticalOffset}
                style={{
                    flex:1,
                    backgroundColor:COLORS.white,
                }}
            >
            {/* <ImageBackground
                source={images.screenBg}
                resizeMode='cover'
                style={{
                    flex:1,
                    // width:'100%',
                    // height:'100%',
                    // background
                }}
            > */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    paddingHorizontal:SIZES.padding,
                }}
            >

                <SafeAreaView>
    {/* 
                // <KeyboardAwareScrollView
                //     style={{
                //         flex:1,
                //         backgroundColor:COLORS.white,
                //         paddingHorizontal:SIZES.padding,
                //         // marginBottom:160
                //     }}
                //     enableOnAndroid={true}
                //     resetScrollToCoords={{ x: 0, y: 220 }}
                //     // scrollEnabled={false}
                //     // innerRef={ref => formRef = ref }
                //     // getTextInpurRefs={() => [formRef]}
                //     // onKeyboardWillShow={(frames) => {
                //     //     console.log('Keyboard event', frames)
                //     // }}
                // > */}

                    {/* TITLE */}
                    <TextInputComponent
                        name="title"
                        placeholder="Property Title"
                        isRequired={true}
                        control={control}
                        errors={errors}
                        errorMsg="Title is required"
                    />

                    {/* DESCRIPTION */}
                    <TextInputComponent
                        // ref={formRef}
                        name="content"
                        placeholder="Property description"
                        isRequired={true}
                        numberOfLines={6}
                        multiline={true}
                        control={control}
                        errors={errors}
                        errorMsg="Description is required"
                        textAlignVertical="top"
                        additionalCss={{
                            height:170,
                            justifyContent:"flex-start",
                            alignItems:"flex-start"
                        }}
                        // onFocus={(event) => {
                            // `bind` the function if you're using ES6 classes
                            // _scrollToInput(ReactNative.findNodeHandle(event.target))
                            // _scrollToInput(event.target)
                        // }}
                    />
                    {/* CATEGORY */}
                    <PickerComponent name="category" label="Category" optionList={categories} control={control} />
                    {/* TYPES */}
                    <PickerComponent name="action_category" label="Types" optionList={typeOrActionCat} control={control} />
                    {/* PROPERTY STATUS */}
                    <PickerComponent name="propertyStatus" label="Property Status" optionList={propertyStatus} control={control} />

                    {/* MEDIA STARTS */}
                    <Text style={{...styles.header, marginBottom:10}}>Upload Image</Text>
                    <Controller
                        control={control}
                        render={({field: { onChange, onBlur, value }}) => (
                            <ExpoImagePickerComponent onChange={onChange} value={value} />
                        )}
                        name="imageUri"
                    />
                    {/* MEDIA EDNS */}

                    <Text style={styles.header}>Listing Location</Text>
                    {/* ADDRESS */}
                    <TextInputComponent name="address" placeholder="Property address" isRequired={true} control={control} errors={errors} errorMsg="Address is required" />
                    {/* COUNTY */}
                    <PickerComponent name="county" label="County  or State" optionList={countyState} control={control} />
                    {/* CITY */}
                    <PickerComponent name="city" label="City" optionList={city} control={control} />
                    {/* NEIGHBORHOOD */}
                    <PickerComponent name="neighborhood" label="Neighborhood" optionList={area} control={control} />
                    {/* ZIP */}
                    <TextInputComponent name="zip" placeholder="Zip code" isRequired={false} control={control} errors={errors} errorMsg="" />
                    {/* COUNTRY */}
                    <TextInputComponent name="country" placeholder="Country" isRequired={false} control={control} errors={errors} errorMsg="" />
                        
                    {/* PRICE */}
                    <Text style={styles.header}>Price Details</Text>
                    {/* SIZE */}
                    <TextInputComponent
                        name="price"
                        kbType="numeric"
                        placeholder="200589"
                        isRequired={false}
                        control={control}
                        errors={errors} errorMsg="" />

                    {/* DETAILS */}
                    <Text style={styles.header}>Details</Text>
                    {/* SIZE */}
                    <TextInputComponent
                        name="size"
                        kbType="numeric"
                        placeholder="Size in m2 (*only numbers)"
                        isRequired={false}
                        control={control}
                        errors={errors}
                        errorMsg=""
                    />
                    {/* LOT SIZE */}
                    <TextInputComponent
                        name="lotSize"
                        kbType="numeric"
                        placeholder="Lot Size in m2 (*only numbers)"
                        isRequired={false}
                        control={control}
                        errors={errors}
                        errorMsg=""
                    />
                    {/* ROOMS */}
                    <TextInputComponent
                        name="rooms"
                        kbType="numeric"
                        placeholder="Rooms (*only numbers)"
                        isRequired={false}
                        control={control}
                        errors={errors}
                        errorMsg=""
                    />
                    {/* BEDROOMS */}
                    <TextInputComponent
                        name="bedrooms"
                        kbType="numeric"
                        placeholder="Bedrooms (*only numbers)"
                        isRequired={false}
                        control={control}
                        errors={errors}
                        errorMsg=""
                    />
                    {/* BATHROOM */}
                    <TextInputComponent
                        name="bathrooms"
                        kbType="numeric"
                        placeholder="Bathrooms (*only numbers)"
                        isRequired={false}
                        control={control}
                        errors={errors}
                        errorMsg=""
                    />
                    {/* BASEMENT */}
                    <TextInputComponent
                        name="basement"
                        kbType=""
                        placeholder="Basement (*text)"
                        isRequired={false}
                        control={control}
                        errors={errors}
                        errorMsg=""
                    />

                    {/* ENERGY INDEX */}
                    <TextInputComponent
                        name="energyIndex"
                        kbType=""
                        placeholder="Energy Index in kWh/m2a"
                        isRequired={false}
                        control={control}
                        errors={errors}
                        errorMsg=""
                    />

                    {/* GARAGE SIZE */}
                    <PickerComponent name="garages" label="Garages" optionList={constants.garages} control={control} />
                    {/* GARAGE SIZE */}
                    <PickerComponent name="garageSize" label="Garage size" optionList={constants.garageSize} control={control} />

                    {/* YEAR */}
                    <DatePickerComponent name="year" control={control} label="Year Built (*date)" />
                    {/* AVAILABILITY */}
                    <DatePickerComponent name="availability" control={control} label="Available from (*date)" />

                    {/* EXTERNAL CONSTRUCTION */}
                    <TextInputComponent name="extConstruction" kbType="" placeholder="External construction (*text)" isRequired={false} control={control} errors={errors} errorMsg="" />
                    {/* ROOFING */}
                    <TextInputComponent name="roofing" kbType="" placeholder="Roofing (*text)" isRequired={false} control={control} errors={errors} errorMsg="" />


                    {/* ENERGY CLASS AND INDEX */}
                    <Text style={styles.label}>Select Energy Class</Text>    
                    {/* ENERGY CLASS */}
                    <PickerComponent name="energyClasses" optionList={constants.energyClasses} control={control} />
                    {/* ENERGY INDEX */}
                    <TextInputComponent name="energyIndex" kbType="" placeholder="Energy Index in kWh/m2a" isRequired={false} control={control} errors={errors} errorMsg="" />

                    {/* AMENTIES AND FEATURES */}
                    <Text style={styles.header}>Amenties and Features</Text>
                        {console.log(features)}
                    {
                        features &&
                        <FlatList
                            style={{flex:1}}
                            data={features}
                            keyExtractor={item => `${item.id}`}
                            renderItem={ ( { item, index } ) =>(
                                <Controller
                                    control={control}
                                    // defaultValue={features.map(c => c.value)}
                                    name={item?.slug}
                                    render={({ field: { onChange, value, ref }}) => (
                                        <View
                                            style={{
                                                flex:1,
                                                height:50,
                                                flexDirection:"row",
                                                borderTopColor: COLORS.gray2,
                                                borderTopWidth: index == 0 ? 0 : 0.5,
                                                justifyContent:"space-between",
                                                alignItems:"center"
                                            }}
                                        >
                                            <Text style={{ color:COLORS.darkGray, ...FONTS.body3 }}>{ item.name }</Text> 
                                            {/* <CustomSwitch value={value} onChange={onChange} /> */}
                                            <TouchableOpacity
                                                onPress={() => {
                                                    onChange( item.id )
                                                }}
                                            >
                                                <Image
                                                    source={icons.check_off}
                                                    style={{
                                                        width:20,
                                                        height:20,
                                                        tintColor:COLORS.gray2
                                                    }}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                />
                            )}
                            ListFooterComponent={<View style={{height:1000}}/>}
                        />
                    }


                    {/* <SwitchButtonComponent name="balcony" label="Balcony" control={control} />
                    <SwitchButtonComponent name="garden" label="Garden" control={control} />
                    <Text style={styles.header}>Outdoor Details</Text>
                    <SwitchButtonComponent name="chairAccessible" label="Chair Accessible" control={control} />
                    <SwitchButtonComponent name="doorman" label="Doorman" control={control} />
                    <SwitchButtonComponent name="elevator" label="Elevator" control={control} />
                    <SwitchButtonComponent name="frontYard" label="Front yard" control={control} />
                    <SwitchButtonComponent name="fencedYard" label="Fenced yard" control={control} />
                    <SwitchButtonComponent name="backYard" label="Back yard" control={control} /> */}

                    {/* Submit Button */}
                    <TextButton
                        label={isLoading ? "Processing..." : "Add To List"}
                        disabled={isLoading}
                        buttonContainerStyle={{
                            backgroundColor: isLoading ? COLORS.lightGray : COLORS.primary,
                            marginVertical:SIZES.padding,
                            height:55,
                            borderRadius:SIZES.radius
                        }}
                        labelStyle={{
                            color:COLORS.white,
                            ...FONTS.body3
                        }}
                        onPress={handleSubmit(onSubmit)}
                    />
                    <View style={{
                        height:460}}/>

                </SafeAreaView>
            {/* </KeyboardAwareScrollView> */}
            </ScrollView>
            {/* </ImageBackground> */}
            </KeyboardAvoidingView>
        
        
    )
}

export default AddProperty

const styles = StyleSheet.create({
    label: {
        color: COLORS.primary,
        ...FONTS.body4,
        marginTop: 10,
        marginBottom:-10,
        marginLeft: 0,
    },
    header: {
        color: COLORS.primary,
        ...FONTS.body3,
        marginTop: 15,
        // marginBottom:10,
        marginLeft: 0,
        // fontSize:24,
        letterSpacing:1,
        textTransform:'uppercase'
    },
})
