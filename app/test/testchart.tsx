import React from 'react';
import { View, Text } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

const data1 = [
    { value: 200, label: 'MON' },
    { value: 200, label: 'TUE' },
    { value: 200, label: 'WED' },
    { value: 200, label: 'THU' },
    { value: 200, label: 'FRI' },
    { value: 200, label: 'SAT' },
    { value: 200, label: 'SUN' },
];

const data2 = [
    { value: 350, label: 'MON' },
    { value: 250, label: 'TUE' },
    { value: 300, label: 'WED' },
    { value: 320, label: 'THU' },
    { value: 270, label: 'FRI' },
    { value: 150, label: 'SAT' },
    { value: 200, label: 'SUN' },
];

export default function MyLineChart ()
{
    return (
        <View style={ { backgroundColor: '#fff', padding: 16 } }>
            <Text style={ { fontWeight: 'bold', fontSize: 18, textAlign: 'center' } }>
                Chart title goes here
            </Text>
            <Text style={ { textAlign: 'center', marginBottom: 16, color: '#888' } }>
                15 April - 21 April
            </Text>
            <LineChart
                data={ data1 }
                data2={ data2 }
                width={ 320 }
                height={ 220 }
                spacing={ 50 }  // tăng khoảng giữa 2 điểm
                color1="#3498db"
                color2="#e74c3c"
                thickness1={ 2 }
                thickness2={ 2 }
                hideDataPoints={ false }
                showVerticalLines
                showXAxisIndices
                xAxisIndicesHeight={ 4 }
                xAxisIndicesWidth={ 2 }
                xAxisIndicesColor="#eee"
                yAxisColor="#eee"
                xAxisColor="#eee"
                yAxisTextStyle={ { color: '#888' } }
                initialSpacing={ 20 }
                maxValue={ 750 }
                noOfSections={ 5 }
                yAxisLabelWidth={ 32 }
                curved
                curvature={ 0.2 }
            />

        </View>
    );
}
