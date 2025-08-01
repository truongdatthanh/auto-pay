import { View, TouchableOpacity, Image, FlatList, Button } from 'react-native';
import { useEffect, useRef } from 'react';
import MyCard from '@/components/card/MyCard';
import { router, usePathname } from 'expo-router';
import QuickActions from '@/components/action/QuickActions';
import TransactionList from '@/components/transaction/TransactionList';

export default function Home ()
{
  const pathname = usePathname();

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
    { id: 'transactions', component: <TransactionList /> },
  ];

  return (
    <>
      {/* Container */ }
      <View className="flex-1 bg-[#041838] overflow-hidden">
        {/* Header */ }
        <View className="flex-row justify-between p-4 items-center">
          <TouchableOpacity
            activeOpacity={ 0.7 }
            onPress={ scrollToTop }
            accessibilityLabel="Cuộn về đầu trang"
          >
            <Image
              source={ require( "@/assets/images/logo-autopay-cachdieu-white.png" ) }
              style={ {
                height: 48,
                width: 120, // Tăng width để logo không bị nhỏ
              } }
              resizeMode='contain'
            />
          </TouchableOpacity>
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
              <View className={ item.id === 'transactions' ? 'bg-[#f9fafb] flex-1 rounded-t-xl shadow-md border border-gray-300 pb-32' : 'py-2' }>
                { item.component }
              </View>
            ) }
            keyExtractor={ ( item ) => item.id }
            showsVerticalScrollIndicator={ false }
            contentContainerStyle={ { paddingBottom: 100 } }
          />
        </View>
      </View>
    </>
  );
}



