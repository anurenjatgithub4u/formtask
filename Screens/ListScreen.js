import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = ({ navigation }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let storedData = await AsyncStorage.getItem('formData');
        storedData = storedData ? JSON.parse(storedData) : [];
        setData(storedData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (index) => {
    try {
      let storedData = await AsyncStorage.getItem('formData');
      storedData = JSON.parse(storedData);
      storedData.splice(index, 1);
      await AsyncStorage.setItem('formData', JSON.stringify(storedData));
      setData(storedData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item.firstName} {item.lastName}</Text>
            <Button title="Delete" onPress={() => handleDelete(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default ListScreen;
