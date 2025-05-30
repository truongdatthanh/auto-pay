import {  View } from "react-native";
import QuickActionsButton from "../button/QuickActionsButton";

export default function QuickActions ()
{
    return (
        <>
            <View className="flex-row mx-4 px-4 py-4 bg-white shadow-md border border-gray-200 rounded-xl justify-around ">
                <QuickActionsButton
                    title="Tài khoản & thẻ"
                    imgIcon={ require( "@/assets/images/credit-card-black.png" ) }
                    url="/bank-account/list"
                />
                <QuickActionsButton
                    title="Chuyển tiền"
                    imgIcon={ require( "@/assets/images/send-black.png" ) }
                    url="/payment/transfer"
                />
                <QuickActionsButton
                    title="QR của tôi"
                    imgIcon={ require( "@/assets/images/my-qr-black.png" ) }
                    url={ { pathname: '/(tabs)/qr', params: { tabIndex: 1 } } }
                />
                <QuickActionsButton
                    title="Nhận tiền"
                    imgIcon={ require( "@/assets/images/recieve-money.png" ) }
                    url="/qr/create"
                />
            </View>
        </>
    );
}