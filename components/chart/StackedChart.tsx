import React, { useMemo } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BarChart } from 'react-native-gifted-charts';
import dataBankingCard from '@/assets/banking-card.json';
import { formatCurrencyWithCode } from '@/utils/format';

const screenWidth = Dimensions.get( 'window' ).width;
const barWidth = 20;

function processTransactionData ( transactions: any[] )
{
  const incomeByDay = Array( 7 ).fill( 0 );
  const expenseByDay = Array( 7 ).fill( 0 );
  let totalIncome = 0;
  let totalExpense = 0;

  const today = new Date();
  today.setHours( 0, 0, 0, 0 );
  const startOfWeek = new Date( today );
  startOfWeek.setDate( today.getDate() - today.getDay() + 1 ); // Monday

  transactions.forEach( ( item ) =>
  {
    const date = new Date( item.date );
    date.setHours( 0, 0, 0, 0 );
    const dayIndex = Math.floor( ( date.getTime() - startOfWeek.getTime() ) / ( 1000 * 60 * 60 * 24 ) );

    if ( dayIndex >= 0 && dayIndex < 7 )
    {
      if ( item.amount > 0 )
      {
        incomeByDay[ dayIndex ] += item.amount;
        totalIncome += item.amount;
      } else
      {
        expenseByDay[ dayIndex ] += Math.abs( item.amount );
        totalExpense += Math.abs( item.amount );
      }
    }
  } );

  const format = ( val: number ) => parseFloat( ( val / 1_000_000 ).toFixed( 1 ) );

  const stackedData = incomeByDay.map( ( income, i ) => ( {
    label: [ 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN' ][ i ],
    stacks: [
      { value: format( income ), color: '#22c55e' },
      { value: format( expenseByDay[ i ] ), color: '#ef4444' },
    ],
  } ) );

  return {
    stackedData,
    totalIncome,
    totalExpense,
  };
}

export default function StackedBarChartComponent ( { id }: { id: string } )
{
  const selectedCard = dataBankingCard.find( ( item ) => item.id === id );

  const { stackedData, totalIncome, totalExpense } = useMemo( () =>
  {
    if ( !selectedCard?.transactionHistory )
    {
      return { stackedData: [], totalIncome: 0, totalExpense: 0 };
    }
    return processTransactionData( selectedCard.transactionHistory );
  }, [ selectedCard ] );

  return (
    <>
      <Animated.View
        entering={ FadeIn.duration( 500 ) }
        style={ {
          backgroundColor: 'white',
          borderRadius: 16,
          padding: 16,
          margin: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 5,
        } }
      >
        <Text style={ { fontSize: 18, fontWeight: '700', color: '#222', marginBottom: 16 } }>
          Biểu đồ thu chi theo tuần
        </Text>

        <View style={ { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 } }>
          <View style={ { flexDirection: 'row', alignItems: 'center' } }>
            <View
              style={ {
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#22c55e',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              } }
            >
              <Ionicons name="arrow-down" size={ 16 } color="white" />
            </View>
            <View>
              <Text style={ { fontWeight: '700', fontSize: 16, color: '#222' } }>
                { formatCurrencyWithCode( totalIncome ) }
              </Text>
              <Text style={ { fontSize: 12, color: '#555' } }>Thu nhập</Text>
            </View>
          </View>

          <View style={ { flexDirection: 'row', alignItems: 'center' } }>
            <View
              style={ {
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: '#ef4444',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              } }
            >
              <Ionicons name="arrow-up" size={ 16 } color="white" />
            </View>
            <View>
              <Text style={ { fontWeight: '700', fontSize: 16, color: '#222' } }>
                { formatCurrencyWithCode( totalExpense ) }
              </Text>
              <Text style={ { fontSize: 12, color: '#555' } }>Chi tiêu</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      <View style={ { marginHorizontal: 20 } }>
        <BarChart
          barWidth={ 30 }
          spacing={ 25 }
          stackData={ stackedData }
          xAxisThickness={ 1 }
          yAxisThickness={ 0 }
          noOfSections={ 6 }
          maxValue={
            Math.max(
              ...stackedData.map( ( d ) =>
                d.stacks.reduce( ( sum, s ) => sum + s.value, 0 )
              )
            ) + 1
          }
          yAxisTextStyle={ { color: '#444' } }
          xAxisLabelTextStyle={ { color: '#444' } }
          yAxisLabelSuffix="M"
          isAnimated
          roundedTop
          stepValue={ 1 }
          showValuesAsTopLabel={ true } // ✅ hiển thị số liệu trên cột
          hideRules
          frontColor="transparent"
        />

      </View>
    </>
  );
}
