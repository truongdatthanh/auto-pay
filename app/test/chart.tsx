import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const TransactionComparisonScreen = () =>
{
    const barData = [
        {
            stacks: [
                { value: 200, color: '#4CAF50', label: 'Thu' },
                { value: 100, color: '#F44336', label: 'Chi' },
            ],
            label: 'Mon',
        },
        {
            stacks: [
                { value: 150, color: '#4CAF50', label: 'Thu' },
                { value: 120, color: '#F44336', label: 'Chi' },
            ],
            label: 'Tue',
        },
        {
            stacks: [
                { value: 300, color: '#4CAF50', label: 'Thu' },
                { value: 180, color: '#F44336', label: 'Chi' },
            ],
            label: 'Wed',
        },
        {
            stacks: [
                { value: 180, color: '#4CAF50', label: 'Thu' },
                { value: 160, color: '#F44336', label: 'Chi' },
            ],
            label: 'Thu',
        },
        {
            stacks: [
                { value: 260, color: '#4CAF50', label: 'Thu' },
                { value: 200, color: '#F44336', label: 'Chi' },
            ],
            label: 'Fri',
        },
        {
            stacks: [
                { value: 90, color: '#4CAF50', label: 'Thu' },
                { value: 130, color: '#F44336', label: 'Chi' },
            ],
            label: 'Sat',
        },
        {
            stacks: [
                { value: 160, color: '#4CAF50', label: 'Thu' },
                { value: 100, color: '#F44336', label: 'Chi' },
            ],
            label: 'Sun',
        },
    ];

    return (
        <ScrollView style={ styles.container }>
            <Text style={ styles.title }>So sánh thu & chi theo ngày</Text>
            <BarChart
                isAnimated
                animationDuration={ 800 }
                data={ barData }
                barWidth={ 30 }
                height={ 260 }
                noOfSections={ 5 }
                stackData={ barData }
                xAxisThickness={ 0 }
                yAxisThickness={ 0 }
                hideRules
                showYAxisIndices={ false }
            />
            <View style={ styles.legendContainer }>
                <View style={ styles.legendItem }>
                    <View style={ [ styles.legendDot, { backgroundColor: '#4CAF50' } ] } />
                    <Text>Thu</Text>
                </View>
                <View style={ styles.legendItem }>
                    <View style={ [ styles.legendDot, { backgroundColor: '#F44336' } ] } />
                    <Text>Chi</Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create( {
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 6,
    },
} );

export default TransactionComparisonScreen;
