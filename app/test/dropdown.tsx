import React, { useState } from 'react';
import { View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const DropdownExample = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleValueChange = (value: any) => {
    setSelectedValue(value);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Select a value:</Text>
      <RNPickerSelect
        onValueChange={handleValueChange}
        items={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        value={selectedValue}
      />
      <Text>Selected value: {selectedValue}</Text>
    </View>
  );
};

export default DropdownExample;
