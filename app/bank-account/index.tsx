import { Image, ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import BankingCard from "@/components/BankCard";
import Seperate from "@/components/Seperate";
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome } from "@expo/vector-icons";
import myBankingAccount from "../../assets/my-bank-account.json";
import mockDataTransation from "../../assets/data.json"
import CardInfo from "@/components/CardInfo";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";


interface IBankingTransaction
{
    id: string,
    STK: string,
    name: string,
    date: string,
    amount: number,
    content: string,
    logoBanking: string,
    transactionId: string,
}
export default function BankAccount ()
{
    const [ bankAccount ] = useState( myBankingAccount );
    const jsonData = bankAccount.filter( ( item: any ) => item.id === "1" );
    const jsonString = JSON.stringify( jsonData[ 0 ].bank_name );
    const [ selected, setSelected ] = useState( "income" );
    const [ dataBanking, setDataBanking ] = useState( mockDataTransation );

    const incomeItems: any[] = [];
    const outcomeItems: any[] = [];

    for ( const item of dataBanking )
    {
        if ( item.amount > 0 )
        {
            incomeItems.push( item );
        } else
        {
            outcomeItems.push( item );
        }
    }

    const handleCreateQR = () =>
    {
        router.push( {
            pathname: '/(tabs)/qr/CreateMyQR',
            params: {
                STK: jsonData[ 0 ].STK,
            }
        })
    };

    return (
        <>
            <ScrollView className="flex-1">
                <View className="justify-center items-center bg-[#FFC300]">
                    <View className="p-4">
                        <BankingCard
                            id={ jsonData[ 0 ].id }
                            STK={ jsonData[ 0 ].STK }
                            name={ jsonData[ 0 ].name }
                            logoBanking={ jsonData[ 0 ].bank_logo }
                            bankName={ jsonData[ 0 ].bank_name }
                        />
                    </View>

                    {/* QR */ }
                    <View className="justify-center items-center w-full max-w-[340px] p-4 mx-4 bg-white rounded-3xl shadow-md">
                        <Text className="font-bold">{ jsonData[ 0 ].name.toUpperCase() }</Text>
                        <Text className="text-lg">{ jsonData[ 0 ].STK }</Text>
                        <Text className="text-base">{ jsonData[ 0 ].bank_name }</Text>
                        <Seperate />
                        <View className="bg-white border-2 border-gray-300 p-4 rounded-lg">
                            <QRCode
                                value={ jsonString }
                                size={ 150 }
                                logo={ require( "../../assets/images/logo-autopay-4.png" ) }
                                logoSize={ 30 }
                            />
                        </View>
                        <Seperate />
                        <View style={ { maxWidth: 250 } } className="flex-row w-full justify-between items-center bg-white">
                            <Text className="text-xl text-black font-bold">⛛AutoPAY</Text>
                            <Image source={ { uri: jsonData[ 0 ].bank_logo } } className="w-20 h-16" resizeMode="contain" />
                        </View>
                        <View className="flex-row justify-between items-center w-full">
                            <TouchableOpacity className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-full flex-row items-center" onPress={ () => console.log( "Lưu mã QR" ) }>
                                <Entypo name="download" size={ 18 } color="black" />
                                <Text className="text-base ml-2">Lưu mã QR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="px-4 py-2 rounded-full flex-row items-center bg-blue-500" onPress={ () => console.log( "Chia sẻ mã QR" ) }>
                                <FontAwesome name="share-square-o" size={ 20 } color="white" />
                                <Text className="text-base text-white ml-2">Chia sẻ QR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* Ket thuc QR */ }


                    {/* lich su giao dich gan day */ }
                    <View className="w-full min-h-[200px] rounded-t-3xl p-4 bg-blue-50 mt-4">
                        <View className="flex-row justify-between items-center px-4">
                            <Text className="text-lg text-black font-bold">
                                Giao dịch gần đây
                            </Text>
                            <Text className="text-base text-black">
                                Xem thêm
                            </Text>
                        </View>
                        <View className="flex-row items-center justify-between bg-white p-2 rounded-xl mt-4">
                            <TouchableOpacity
                                className={ `flex-1 p-3 rounded-lg ${ selected === "income" ? "bg-black" : "bg-gray-100" }` }
                                onPress={ () => setSelected( "income" ) }
                            >
                                <Text
                                    className={ `text-center text-base font-medium ${ selected === "income" ? "text-white" : "text-black" }` }
                                >
                                    Giao dịch đến
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                className={ `flex-1 p-3 rounded-lg ${ selected === "outcome" ? "bg-black" : "bg-gray-100" }` }
                                onPress={ () => setSelected( "outcome" ) }
                            >
                                <Text
                                    className={ `text-center text-base font-medium ${ selected === "outcome" ? "text-white" : "text-black" }` }
                                >
                                    Giao dịch đi
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View className="mt-4">
                            {
                                selected === "income"
                                    ? incomeItems.map( ( item, index ) => (
                                        <View key={ index } className="bg-white p-4 border rounded-lg shadow-sm mb-1">
                                            <CardInfo
                                                id={ item.id }
                                                STK={ item.STK }
                                                name={ item.name }
                                                date={ item.date }
                                                amount={ item.amount }
                                                content={ item.content }
                                                logoBanking={ item.logoBanking }
                                                transactionId={ item.transactionId } />
                                        </View>
                                    ) )
                                    : outcomeItems.map( ( item, index ) => (
                                        <View key={ index } className="bg-white p-4 border rounded-lg shadow-sm mb-1">
                                            <CardInfo
                                                id={ item.id }
                                                STK={ item.STK }
                                                name={ item.name }
                                                date={ item.date }
                                                amount={ item.amount }
                                                content={ item.content }
                                                logoBanking={ item.logoBanking }
                                                transactionId={ item.transactionId } />
                                        </View>
                                    ) )
                            }
                        </View>
                    </View>
                    {/* Ket thuc lich su giao dich */ }
                </View>
            </ScrollView>
            <TouchableOpacity className="absolute bottom-5 right-2 w-16 h-16 rounded-full bg-blue-500 items-center justify-center" onPress={ handleCreateQR }>
                <Entypo name="plus" size={ 30 } color="white" />
            </TouchableOpacity>
        </>
    );
}


//#region testCode
// import { Image, Text, TouchableOpacity, View } from "react-native";
// import { useState } from "react";
// import QRCode from "react-native-qrcode-svg";
// import BankingCard from "@/components/BankCard";
// import Seperate from "@/components/Seperate";
// import Entypo from '@expo/vector-icons/Entypo';
// import { FontAwesome } from "@expo/vector-icons";
// import myBankingAccount from "../../assets/my-bank-account.json";
// import mockDataTransation from "../../assets/data.json";
// import { FlatList } from "react-native-gesture-handler";

// interface IBankingTransaction {
//   id: string,
//   STK: string,
//   name: string,
//   date: string,
//   amount: number,
//   content: string,
//   logoBanking: string,
//   transactionId: string,
// }

// export default function BankAccount() {
//   const [bankAccount] = useState(myBankingAccount);
//   const jsonData = bankAccount.filter((item: any) => item.id === "1");
//   const jsonString = JSON.stringify(jsonData[0].bank_name);
//   const [selected, setSelected] = useState("income");
//   const [dataBanking] = useState(mockDataTransation);

//   const incomeItems = dataBanking.filter((item: any) => item.amount > 0);
//   const outcomeItems = dataBanking.filter((item: any) => item.amount <= 0);

//   const selectedData = selected === "income" ? incomeItems : outcomeItems;

//   return (
//     <FlatList
//       data={selectedData}
//       keyExtractor={(item) => item.id.toString()}
//       ListHeaderComponent={
//         <View className="justify-center items-center">
//           <View className="p-4">
//             <BankingCard
//               id={jsonData[0].id}
//               STK={jsonData[0].STK}
//               name={jsonData[0].name}
//               logoBanking={jsonData[0].bank_logo}
//               bankName={jsonData[0].bank_name}
//             />
//           </View>
//           <View className="justify-center items-center w-full max-w-[340px] p-4 mx-4 bg-white rounded-3xl shadow-md">
//             <Text className="font-bold">{jsonData[0].name.toUpperCase()}</Text>
//             <Text className="text-lg">{jsonData[0].STK}</Text>
//             <Text className="text-base">{jsonData[0].bank_name}</Text>
//             <Seperate />
//             <View className="bg-white border-2 border-gray-300 p-4 rounded-lg">
//               <QRCode
//                 value={jsonString}
//                 size={150}
//                 logo={require("../../assets/images/logo-autopay-4.png")}
//                 logoSize={30}
//               />
//             </View>
//             <Seperate />
//             <View style={{ maxWidth: 250 }} className="flex-row w-full justify-between items-center bg-white">
//               <Text className="text-xl text-black font-bold">⛛AutoPAY</Text>
//               <Image source={{ uri: jsonData[0].bank_logo }} className="w-20 h-16" resizeMode="contain" />
//             </View>
//             <View className="flex-row justify-between items-center w-full">
//               <TouchableOpacity className="border border-gray-300 bg-gray-50 px-4 py-2 rounded-full flex-row items-center" onPress={() => console.log("Lưu mã QR")}>
//                 <Entypo name="download" size={18} color="black" />
//                 <Text className="text-base ml-2">Lưu mã QR</Text>
//               </TouchableOpacity>
//               <TouchableOpacity className="px-4 py-2 rounded-full flex-row items-center bg-blue-500" onPress={() => console.log("Chia sẻ mã QR")}>
//                 <FontAwesome name="share-square-o" size={20} color="white" />
//                 <Text className="text-base text-white ml-2">Chia sẻ QR</Text>
//               </TouchableOpacity>
//             </View>

//             <View className="w-full min-h-[200px] rounded-t-3xl p-4 bg-red-500 mt-4">
//               <View className="flex-row justify-between items-center px-4">
//                 <Text className="text-lg font-bold text-white">Giao dịch gần đây</Text>
//                 <Text className="text-base text-white">Xem thêm</Text>
//               </View>

//               <View className="flex-row items-center justify-between bg-white p-2 rounded-xl mt-4">
//                 <TouchableOpacity
//                   className={`flex-1 p-3 rounded-lg ${selected === "income" ? "bg-black" : "bg-gray-100"}`}
//                   onPress={() => setSelected("income")}
//                 >
//                   <Text className={`text-center text-base font-medium ${selected === "income" ? "text-white" : "text-black"}`}>
//                     Giao dịch đến
//                   </Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   className={`flex-1 p-3 rounded-lg ${selected === "outcome" ? "bg-black" : "bg-gray-100"}`}
//                   onPress={() => setSelected("outcome")}
//                 >
//                   <Text className={`text-center text-base font-medium ${selected === "outcome" ? "text-white" : "text-black"}`}>
//                     Giao dịch đi
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </View>
//       }
//       renderItem={({ item }) => (
//         <View className="bg-white p-4 rounded-lg shadow-sm mx-4 mt-2">
//           <Text className={`font-semibold ${selected === "income" ? "text-green-500" : "text-red-500"}`}>{item.amount}đ</Text>
//           <Text className="text-gray-700">{item.content}</Text>
//           <Text className="text-sm text-gray-500">{item.date}</Text>
//         </View>
//       )}
//     />
//   );
// }
//#endregion
