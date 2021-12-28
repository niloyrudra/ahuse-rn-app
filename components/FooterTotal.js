import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

import TextButton from './TextButton'
import LineDivider from './LineDivider'

import { COLORS,SIZES,FONTS } from '../constants/theme'
import constants from '../constants/constants'
// import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'

const FooterTotal = ({subTotal, total, fee, onPress}) => {
    console.log(subTotal)
    return (
        <View>
            {/* Shadow */}
            <LinearGradient
                start={{x:0, y:0}}
                end={{x:0, y:1}}
                colors={[COLORS.transparent, COLORS.lightGray1]}
                style={{
                    position:'absolute',
                    top:-15,
                    left:0,
                    right:0,
                    height:Platform.OS === 'ios' ? 200 : 50,
                    borderTopLeftRadius:15,
                    borderTopRightRadius:15

                }}
            />

            {/* Order Details */}
            <View
                style={{
                    padding:SIZES.padding,
                    borderTopLeftRadius:20,
                    borderTopRightRadius:20,
                    backgroundColor:COLORS.white
                }}
            >

                {/* SubTotal */}
                <View
                    style={{
                        flexDirection:'row',
                    
                    }}
                >
                    <Text style={{flex:1,...FONTS.body3}}>
                        Subtotal
                    </Text>
                    <Text style={{...FONTS.h3}}>
                        {constants.currency}{ subTotal ? subTotal?.toFixed(2) : '00.00' }
                    </Text>
                </View>

                {/* Shipping Fee */}
                <View
                    style={{
                        flexDirection:'row',
                        marginTop:SIZES.base,
                        marginBottom:SIZES.padding
                    }}
                >
                    <Text style={{flex:1,...FONTS.body3}}>
                        Shipping Fee
                    </Text>
                    <Text style={{...FONTS.h3}}>
                        {constants.currency}{ fee ? fee?.toFixed(2) : '00.00'}
                    </Text>
                </View>

                <LineDivider/>

                {/* Total */}
                <View
                    style={{
                        flexDirection:'row',
                        marginTop:SIZES.padding,
                        // marginBottom:SIZES.padding
                    }}
                >
                    <Text style={{flex:1,...FONTS.h2}}>
                        Total:
                    </Text>
                    <Text style={{...FONTS.h2}}>
                        {constants.currency}{ total ? total?.toFixed(2) : '00.00'}
                    </Text>
                </View>

                {/* Button */}
                <TextButton
                    buttonContainerStyle={{
                        height:60,
                        marginTop: SIZES.padding,
                        borderRadius:SIZES.radius,
                        backgroundColor:COLORS.primary
                    }}
                    label="Place Your Order"
                    onPress={onPress}
                />

            </View>

        </View>
    )
}

export default FooterTotal

const styles = StyleSheet.create({})
