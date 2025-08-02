import { Text, View } from "react-native";
import QuickActionsButton from "../button/QuickActionsButton";

export default function QuickActions ()
{
    return (
        <>
            <View className="flex-row mx-4 my-6 justify-between">
                <QuickActionsButton
                    title="Tài khoản & thẻ"
                    imgIcon={ require( "@/assets/images/credit-card-white.png" ) }
                    url="/bank"
                />
                <QuickActionsButton
                    title="Chuyển tiền"
                    imgIcon={ require( "@/assets/images/send-white.png" ) }
                    url="/payment/transfer"
                />
                <QuickActionsButton
                    title="Nhận tiền"
                    imgIcon={ require( "@/assets/images/recieve-money-white.png" ) }
                    url="/qr/create"
                />
            </View>
        </>
    );
}