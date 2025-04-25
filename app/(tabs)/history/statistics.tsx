import React from 'react';
import { LineChart } from "react-native-gifted-charts"
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import mockData from "../../../assets/data.json"
export default function BankAccountDetail ()
{
    const data = mockData;
    console.log( 'data', data );
    const lineData = [
        { value: 0, dataPointText: '0', label: 'A' },
        { value: 10, dataPointText: '10', label: 'A' },
        { value: 8, dataPointText: '8', label: 'A' },
        { value: 58, dataPointText: '58', label: 'A' },
        { value: 56, dataPointText: '56', label: 'A' },
        { value: 78, dataPointText: '78', label: 'A' },
        { value: 74, dataPointText: '74', label: 'A' },
        { value: 98, dataPointText: '98', label: 'A' },
    ];

    const lineData2 = [
        { value: 0, dataPointText: '0', label: 'A' },
        { value: 20, dataPointText: '20', label: 'A' },
        { value: 18, dataPointText: '18', label: 'A' },
        { value: 40, dataPointText: '40', label: 'A' },
        { value: 36, dataPointText: '36', label: 'A' },
        { value: 60, dataPointText: '60', label: 'A' },
        { value: 54, dataPointText: '54', label: 'A' },
        { value: 85, dataPointText: '85', label: 'A' },
    ];
    return (
        <View>
            <LineChart
                data={ lineData }
                data2={ lineData2 }
                height={ 250 }
                showVerticalLines
                spacing={ 44 }
                initialSpacing={ 0 }
                color1="skyblue"
                color2="orange"
                textColor1="green"
                dataPointsHeight={ 6 }
                dataPointsWidth={ 6 }
                dataPointsColor1="blue"
                dataPointsColor2="red"
                textShiftY={ -2 }
                textShiftX={ -5 }
                textFontSize={ 13 }
            />
        </View>
    );
};


