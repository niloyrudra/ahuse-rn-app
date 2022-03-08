import React from 'react'
import { Text, View, Switch, Alert } from 'react-native'
import { Controller } from 'react-hook-form';
import { COLORS } from '../constants/theme';

// import tw from 'twrnc';

const SwitchButtonComponent = ( props ) => {
    // console.log(props.name)
    return (
        <View style={{
            flex:1,
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
        }}>
            <Text style={{ color:COLORS.darkGray, ...props.customLabelCss }}>{ props.label }</Text>

            <Controller
                control={props.control}
                name={ props.name }
                // render={({ field: { onChange, onBlur, value, name, ref }, fieldState: { invalid, isTouched, isDirty, error }, formState, }) => (
                render={({ field: { onChange, onBlur, value  }}) => (
                    <Switch
                        trackColor={{ false: COLORS.gray3, true: COLORS.primary }}
                        thumbColor={value ? COLORS.primary : "#f4f3f4"} // "#81b0ff"
                        // ios_backgroundColor="#3e3e3e"
                        onValueChange={ val => {
                            onChange(val);
                            if(val){
                                Alert.alert(
                                    "Please! Pay Your Attention!",
                                    "You will be charged `ONE pound` if you want your ad to be featured! Will you proceed or not?",
                                    [
                                        {
                                            text: "Proceed",
                                            onPress: () => console.log("proceed"),
                                            style: "Ok"
                                        },
                                        {
                                            text: "Cancel",
                                            onPress: () => console.log("Cancel Pressed"),
                                            style: "cancel"
                                        }
                                    ]
                                );
                            }
                        }}
                        value={value}
                    />
                )}
            />
        </View>
    )
}

export default SwitchButtonComponent