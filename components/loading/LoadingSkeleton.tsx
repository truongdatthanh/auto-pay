import { DimensionValue, ScrollView, View } from "react-native";

// Skeleton Components
const SkeletonBox = ( { width, height, className = "" }: { width: DimensionValue, height: DimensionValue, className?: string } ) => (
    <View
        className={ `bg-gray-200 rounded animate-pulse ${ className }` }
        style={ { width, height } }
    />
);

const QRSkeleton = () => (
    <View className="bg-white m-4 p-4 rounded-lg shadow-md border border-gray-200">
        <View className="justify-center items-center">
            <View className="items-center bg-white mb-4">
                <SkeletonBox width={ 200 } height={ 24 } className="mb-2" />
                <SkeletonBox width={ 150 } height={ 20 } />
            </View>
            <SkeletonBox width={ 200 } height={ 200 } className="mb-4" />
            <View className="flex-row justify-center items-center space-x-8 mb-4">
                <SkeletonBox width={ 100 } height={ 50 } />
                <SkeletonBox width={ 100 } height={ 50 } />
            </View>
            <View className="border-t border-dashed border-gray-400 my-2 w-full" />
            <View className="flex-row justify-between items-center w-full mt-2">
                <SkeletonBox width={ 100 } height={ 40 } className="mr-2" />
                <SkeletonBox width={ 100 } height={ 40 } className="ml-2" />
            </View>
        </View>
    </View>
);

const InfoSkeleton = () => (
    <View className="bg-white mx-4 mb-2 p-4 rounded-lg shadow-md border border-gray-200 gap-4">
        <SkeletonBox width={ 200 } height={ 24 } />
        <View className="border-t border-dashed border-gray-400 w-full" />
        { [ 1, 2, 3, 4, 5 ].map( ( item ) => (
            <View key={ item } className="flex-row justify-between items-center">
                <SkeletonBox width={ 120 } height={ 16 } />
                <SkeletonBox width={ 140 } height={ 16 } />
            </View>
        ) ) }
    </View>
);

const OptionsSkeleton = () => (
    <View className="bg-white mx-4 mt-2 p-4 rounded-lg shadow-md border border-gray-200 gap-4">
        <SkeletonBox width={ 80 } height={ 24 } />
        <View className="border-t border-dashed border-gray-400 w-full" />
        { [ 1, 2 ].map( ( item ) => (
            <View key={ item }>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <SkeletonBox width={ 40 } height={ 40 } className="rounded-full" />
                        <SkeletonBox width={ 160 } height={ 16 } />
                    </View>
                    <SkeletonBox width={ 24 } height={ 24 } />
                </View>
                { item === 1 && <View className="border-t border-dashed border-gray-400 w-full mt-4" /> }
            </View>
        ) ) }
    </View>
);

export default function LoadingSkeleton ()
{

    return (
        <View className="flex-1">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={ false } contentContainerStyle={ { paddingBottom: 50 } }>
                <QRSkeleton />
                <InfoSkeleton />
                <OptionsSkeleton />
            </ScrollView>
        </View>
    );
}

