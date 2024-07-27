import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert , TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListScreen = ({ navigation }) => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let storedData = await AsyncStorage.getItem("formData");
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
        let storedData = await AsyncStorage.getItem("formData");
        storedData = JSON.parse(storedData);
        storedData.splice(index, 1);
        await AsyncStorage.setItem("formData", JSON.stringify(storedData));
        setData(storedData);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleEdit = (item, index) => {
      if (item) {
        navigation.navigate("Form", {
          itemToEdit: item,
          itemIndex: index,
        });
      } else {
        Alert.alert("Error", "Item is null or undefined.");
      }
    };
  
    const renderItem = ({ item, index }) => {
      if (!item) {
        return null; // Skip rendering if item is null or undefined
      }
  
      return (
        <View style={styles.item}>
          <Text>{item.firstName} {item.lastName}</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity style={styles.button} onPress={() => handleEdit(item, index)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => handleDelete(index)}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };
  
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
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
      buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      button: {
        marginRight: 10, // Margin between buttons
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#007BFF',
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
});

export default ListScreen;
