import { generateQR } from "@/utils/generateQR";
import { Text, View } from "react-native";

export default function DisplayQR ()
{
    //const { data } = useLocalSearchParams();
    const data = {
        name: "Trương Thành Đạt",
        major: "Công Nghệ Phần Mềm",
        company: "InterData",
        phone: "0943369278",
        DOB: "06-12-2003",
        gen: "Nam"
    }

    return (
        <View className="flex-1 justify-center items-center bg-white pb-10">
            <View className="border-[15px] p-2">
                { generateQR( data ) }
            </View>
        </View>
    );
}