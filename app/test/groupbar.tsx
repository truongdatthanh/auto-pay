// import React from 'react';
// import { View, Text } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';

// export default function GroupedBars ()
// {
//     const barData = [
//         {
//             value: 40,
//             label: 'Jan',
//             spacing: 2,
//             labelWidth: 30,
//             labelTextStyle: { color: 'gray' },
//             frontColor: '#177AD5',
//         },
//         { value: 20, frontColor: '#ED6665' },
//         {
//             value: 50,
//             label: 'Feb',
//             spacing: 2,
//             labelWidth: 30,
//             labelTextStyle: { color: 'gray' },
//             frontColor: '#177AD5',
//         },
//         { value: 40, frontColor: '#ED6665' },
//         {
//             value: 75,
//             label: 'Mar',
//             spacing: 2,
//             labelWidth: 30,
//             labelTextStyle: { color: 'gray' },
//             frontColor: '#177AD5',
//         },
//         { value: 25, frontColor: '#ED6665' },
//         {
//             value: 30,
//             label: 'Apr',
//             spacing: 2,
//             labelWidth: 30,
//             labelTextStyle: { color: 'gray' },
//             frontColor: '#177AD5',
//         },
//         { value: 20, frontColor: '#ED6665' },
//         {
//             value: 60,
//             label: 'May',
//             spacing: 2,
//             labelWidth: 30,
//             labelTextStyle: { color: 'gray' },
//             frontColor: '#177AD5',
//         },
//         { value: 40, frontColor: '#ED6665' },
//         {
//             value: 65,
//             label: 'Jun',
//             spacing: 2,
//             labelWidth: 30,
//             labelTextStyle: { color: 'gray' },
//             frontColor: '#177AD5',
//         },
//         { value: 30, frontColor: '#ED6665' },
//     ];

//     const renderTitle = () =>
//     {
//         return (
//             <View style={ { marginVertical: 30 } }>
//                 <Text
//                     style={ {
//                         color: 'white',
//                         fontSize: 20,
//                         fontWeight: 'bold',
//                         textAlign: 'center',
//                     } }>
//                     Chart title goes here
//                 </Text>
//                 <View
//                     style={ {
//                         flex: 1,
//                         flexDirection: 'row',
//                         justifyContent: 'space-evenly',
//                         marginTop: 24,
//                         backgroundColor: 'yellow',
//                     } }>
//                     <View style={ { flexDirection: 'row', alignItems: 'center' } }>
//                         <View
//                             style={ {
//                                 height: 12,
//                                 width: 12,
//                                 borderRadius: 6,
//                                 backgroundColor: '#177AD5',
//                                 marginRight: 8,
//                             } }
//                         />
//                         <Text
//                             style={ {
//                                 width: 60,
//                                 height: 16,
//                                 color: 'lightgray',
//                             } }>
//                             Point 01
//                         </Text>
//                     </View>
//                     <View style={ { flexDirection: 'row', alignItems: 'center' } }>
//                         <View
//                             style={ {
//                                 height: 12,
//                                 width: 12,
//                                 borderRadius: 6,
//                                 backgroundColor: '#ED6665',
//                                 marginRight: 8,
//                             } }
//                         />
//                         <Text
//                             style={ {
//                                 width: 60,
//                                 height: 16,
//                                 color: 'lightgray',
//                             } }>
//                             Point 02
//                         </Text>
//                     </View>
//                 </View>
//             </View>
//         )
//     }

//     return (
//         <View
//             style={ {
//                 backgroundColor: '#333340',
//                 paddingBottom: 40,
//                 borderRadius: 10,
//             } }>
//             { renderTitle() }
//             <BarChart
//                 data={ barData }
//                 barWidth={ 8 }
//                 spacing={ 24 }
//                 roundedTop
//                 roundedBottom
//                 hideRules
//                 xAxisThickness={ 0 }
//                 yAxisThickness={ 0 }
//                 yAxisTextStyle={ { color: 'gray' } }
//                 noOfSections={ 3 }
//                 maxValue={ 75 }
//             />
//         </View>
//     );
// };
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const barData = [
  { value: 40, label: 'Jan' },
  { value: 20 },
  { value: 50, label: 'Feb' },
  { value: 40 },
  { value: 75, label: 'Mar' },
  { value: 25 },
  { value: 30, label: 'Apr' },
  { value: 20 },
  { value: 60, label: 'May' },
  { value: 40 },
  { value: 65, label: 'Jun' },
  { value: 30 },
].map((item, index) => ({
  ...item,
  frontColor: index % 2 === 0 ? '#177AD5' : '#ED6665',
  spacing: item.label ? 2 : undefined,
  labelWidth: item.label ? 30 : undefined,
  labelTextStyle: item.label ? "gray" : undefined,
}));

const GroupedBars = () => {
  const renderLegend = (color: any, label: any) => (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chart title goes here</Text>
      <View style={styles.legendContainer}>
        {renderLegend('#177AD5', 'Point 01')}
        {renderLegend('#ED6665', 'Point 02')}
      </View>
      <BarChart
        data={barData}
        barWidth={8}
        spacing={24}
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={styles.yAxisText}
        noOfSections={3}
        maxValue={75}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333340',
    paddingBottom: 40,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 30,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
    backgroundColor: 'yellow',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    width: 60,
    height: 16,
    color: 'lightgray',
  },
 
  yAxisText: {
    color: 'gray',
  },
});

export default GroupedBars;
