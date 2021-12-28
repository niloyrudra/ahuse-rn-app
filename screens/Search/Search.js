import React from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';
import icons from '../../constants/icons';
import images from '../../constants/images';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const Search = ({ navigation, route }) => {
    return (
        <View
            style={{
                flex:1,
                alignItems:"center",
                justifyContent:"flex-start",
                paddingHorizontal:SIZES.padding
            }}
        >
            <Image
                // source={images.srcScreenBgClr}
                source={images.srcScreenBgVct}
                resizeMode='contain'
                style={{
                    width:'100%',
                    tintColor:COLORS.lightGray1,
                    // marginBottom:SIZES.padding
                }}
            />
            <Text style={{color:COLORS.gray2,...FONTS.h3}}>Search for your property.</Text>
        </View>
    )
}

export default Search