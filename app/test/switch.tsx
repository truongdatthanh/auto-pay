import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-switch';

export default function SwitchExample() {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = (val: any) => {
    setIsEnabled(val);
    console.log('Giá trị mới:', val);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Trạng thái: {isEnabled ? 'BẬT' : 'TẮT'}
      </Text>
      <Switch
        value={isEnabled}
        onValueChange={handleToggle}
        disabled={false}
        activeText={'On'}
        inActiveText={'Off'}
        circleSize={30}
        barHeight={30}
        circleBorderWidth={3}
        backgroundActive={'green'}
        backgroundInactive={'gray'}
        circleActiveColor={'#30a566'}
        circleInActiveColor={'#000000'}
        changeValueImmediately={true}
        innerCircleStyle={{
          alignItems: 'center',
          justifyContent: 'center',
        }}
        outerCircleStyle={{}}
        renderActiveText={false}
        renderInActiveText={false}
        switchLeftPx={2}
        switchRightPx={2}
        switchWidthMultiplier={2}
        switchBorderRadius={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
