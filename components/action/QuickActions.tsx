import { View } from "react-native";
import QuickActionsButton from "../button/QuickActionsButton";

export default function QuickActions ()
{
    return (
        <>
            <View className="flex-row px-4 py-4 justify-around ">
                <QuickActionsButton
                    title="Tài khoản & thẻ"
                    imgIcon={ require( "@/assets/images/credit-card-white.png" ) }
                    url="/bank"
                />
                {/* <QuickActionsButton
                    title="Chuyển tiền"
                    imgIcon={ require( "@/assets/images/send-white.png" ) }
                    url="/payment/transfer"
                /> */}
                {/* <QuickActionsButton
                    title="QR của tôi"
                    imgIcon={ require( "@/assets/images/qr-code-white.png" ) }
                    url={ { pathname: '/(tabs)/qr', params: { tabIndex: 1 } } }
                /> */}
                <QuickActionsButton
                    title="Nhận tiền"
                    imgIcon={ require( "@/assets/images/recieve-money-white.png" ) }
                    url="/qr/create"
                />
            </View>
        </>
    );
}