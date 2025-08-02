import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { useEffect, useRef } from 'react';
import MyCard from '@/components/card/MyCard';
import { router, usePathname } from 'expo-router';
import TransactionList from '@/components/transaction/TransactionList';
import QuickActions from '@/components/action/QuickAction';
import TransactionSummaryCard from '@/components/transaction/TransactionSummaryItem';
import { formatDayMonthYear } from '@/utils/format';

export default function Home ()
{
  const pathname = usePathname();
  const currentDate = new Date();
  // Tạo ref cho FlatList với type chính xác
  const flatListRef = useRef<FlatList>( null );

  useEffect( () =>
  {
    console.log( "Home mounted" );
  }, [ pathname ] );

  // Hàm scroll về đầu
  const scrollToTop = () =>
  {
    flatListRef.current?.scrollToOffset( {
      offset: 0,
      animated: true
    } );
  };

  // Dữ liệu cho FlatList, mỗi phần là một mục
  const sections = [
    { id: 'card', component: <MyCard /> },
    { id: 'quick-actions', component: <QuickActions /> },
    { id: 'summary-card', component: <TransactionSummaryCard /> },
    { id: 'transactions', component: <TransactionList /> },
  ];

  return (
    <>
      <View className="flex-1 bg-[#041838] overflow-hidden">
        <View className="flex-row justify-between p-4 items-center">
          <View>
            <View className='flex-row items-center'>
              <TouchableOpacity
                activeOpacity={ 0.7 }
                onPress={ scrollToTop }
              >
                <Image
                  source={ require( "@/assets/images/logo-autopay-cachdieu-white.png" ) }
                  style={ {
                    height: 40,
                    width: 120, // Tăng width để logo không bị nhỏ
                  } }
                  resizeMode='contain'
                />
              </TouchableOpacity>
              <Text className='text-white text-md font-bold mb-2 leading-none'>, Xin chào!</Text>
            </View>

            <View>
              <Text className='text-gray-400 text-[10px] leading-none italic'>Hôm nay, { formatDayMonthYear( currentDate ) }</Text>
            </View>
          </View>



          <View className="flex-row gap-4 items-center justify-center">
            <TouchableOpacity
              activeOpacity={ 0.7 }
              onPress={ () => router.push( '/notification' ) }
              className="flex-row items-center relative"
              accessibilityLabel="Xem thông báo"
            >
              <View className="relative h-8 w-8 items-center justify-center">
                <Image
                  source={ require( '@/assets/images/bell.png' ) }
                  className="w-7 h-7"
                  resizeMode="contain"
                />
                <View className="bg-red-500 h-3 w-3 rounded-full absolute z-10 top-0.5 right-1" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ 0.7 }
              onPress={ () => router.push( '/user' ) }
              accessibilityLabel="Xem thông tin người dùng"
            >
              <View className="relative h-8 w-8 items-center justify-center">
                <Image
                  source={ require( '@/assets/images/user-white.png' ) }
                  className="w-8 h-8"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>


        <View className='bg-[#041838]'>
          <FlatList
            ref={ flatListRef }
            data={ sections }
            renderItem={ ( { item } ) => (
              <View className={ item.id === 'transactions' ? 'flex-1 pb-20' : undefined }>
                { item.component }
              </View>
            ) }
            keyExtractor={ ( item ) => item.id }
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={ { paddingBottom: 80 } }
          />
        </View>
      </View>
    </>
  );
}

