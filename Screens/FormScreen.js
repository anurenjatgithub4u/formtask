import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from "expo-document-picker";
import { RadioButton } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import DatePicker from "react-native-modern-datepicker";

import DateTimePicker from "@react-native-community/datetimepicker";

const FormScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    dob: "",
    gender: "",
    subject: "",
    resume: "",
    url: "",
    choice: "",
    about: "",
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const [date, setDate] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);
  const [birtDate, setDateOfBirth] = useState(false);

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      toggleDatePicker();
      return;
    }

    const currentDate = selectedDate || date;
    setDate(currentDate);

    const formattedDate = currentDate.toDateString();

    setSelectedDate(formattedDate);
    handleInputChange("dob", formattedDate);

    if (Platform.OS === "android") {
      toggleDatePicker();
    }
  };

  const [fileName, setFileName] = useState("No files selected");

  const [selectedValue, setSelectedValue] = useState(form.lastName);

  const handleFileSelection = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // You can specify types like ['image/*'] or ['application/pdf']
      });

      if (result.type === "success") {
        setFileName(result.name);
      } else {
        setFileName("No files selected"); // If the user cancels the picker
      }
    } catch (error) {
      console.error("Error picking document:", error);
      setFileName("No files selected"); // Handle error and set default text
    }
  };

  const handleInputChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      let storedData = await AsyncStorage.getItem("formData");
      storedData = storedData ? JSON.parse(storedData) : [];
      storedData.push(form);
      await AsyncStorage.setItem("formData", JSON.stringify(storedData));
      Alert.alert("Form submitted successfully!");
      navigation.navigate("List");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Form In React</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={form.firstName}
        onChangeText={(value) => handleInputChange("firstName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={form.lastName}
        onChangeText={(value) => handleInputChange("lastName", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Email"
        value={form.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        value={form.contact}
        onChangeText={(value) => handleInputChange("contact", value)}
      />

      {!showPicker && (
        <Pressable onPress={toggleDatePicker}>
          <View style={styles.inputContainerTwo} accessible={true}>
            <Text style={styles.dateodBirth}>{selectedDate || "Pick a Date"}</Text>
            <View style={styles.fileNameContainer}>
              <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <Icon
                  name="calendar"
                  size={20}
                  color="#007BFF"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      )}

      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={date}
          onChange={onChange}
        />
      )}

      <View style={styles.genderContainer}>
        <Text style={styles.label}>Gender:</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("gender", value)}
          value={form.gender}
        >
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton value="male" />
              <Text style={styles.radioLabel}>Male</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="female" />
              <Text style={styles.radioLabel}>Female</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="other" />
              <Text style={styles.radioLabel}>Other</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.genderContainer}>
        <Text style={styles.label}>Your Best Subject:</Text>
        <RadioButton.Group
          onValueChange={(value) => handleInputChange("subject", value)}
          value={form.subject}
        >
          <View style={styles.radioGroup}>
            <View style={styles.radioButton}>
              <RadioButton value="male" />
              <Text style={styles.radioLabel}>English</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="female" />
              <Text style={styles.radioLabel}>Maths</Text>
            </View>
            <View style={styles.radioButton}>
              <RadioButton value="other" />
              <Text style={styles.radioLabel}>Physics</Text>
            </View>
          </View>
        </RadioButton.Group>
      </View>

      <View style={styles.inputContainerTwo} accessible={true}>
        <TouchableOpacity style={styles.button} onPress={handleFileSelection}>
          <Text style={styles.buttonText}>Browse..</Text>
        </TouchableOpacity>
        <View style={styles.fileNameContainer}>
          <Text style={styles.fileName}>{fileName}</Text>
        </View>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Url"
        value={form.url}
        onChangeText={(value) => handleInputChange("url", value)}
      />

      <View style={styles.inputContainerTwo} accessible={true}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            handleInputChange("lastName", itemValue);
          }}
        >
          <Picker.Item label="Select an option" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Else" value="Else" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="About yourself"
        value={form.about}
        onChangeText={(value) => handleInputChange("about", value)}
        multiline={true}
        numberOfLines={4}
      />
      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
        <Button
          title="Reset"
          onPress={() =>
            setForm({
              firstName: "",
              lastName: "",
              email: "",
              contact: "",
              dob: "",
              gender: "",
              subject: "",
              resume: "",
              url: "",
              choice: "",
              about: "",
            })
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: wp("5%"),
    },
    title: {
      fontSize: wp("6%"),
      fontWeight: "bold",
      marginBottom: hp("2%"),
      textAlign: "center",
      color: "green",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      marginBottom: hp("2%"),
      padding: wp("3%"),
      borderRadius: 5,
    },
    textArea: {
      height: hp("15%"),
    },
    genderContainer: {
      marginBottom: hp("2%"),
    },
    // button: {
    //   backgroundColor: "#007BFF",
    //   width: 40, // Fixed width
    //   height: 40, // Fixed height
    //   borderRadius: 5,
    //   justifyContent: "center", // Center content vertically
    //   alignItems: "center", // Center content horizontally
    //   marginRight: 10, // Space between button and file name text
    // },
    buttonText: {
      color: "black",
      fontSize: 16,
    },
    fileNameContainer: {
      flex: 1, // Take up remaining space
      justifyContent: "center", // Center text vertically
    },
    fileName: {
      fontSize: 16,
      color: "#333",
      marginBottom:hp(2)
    },

    dateodBirth: {
        fontSize: 16,
        color: "#ccc",
       
      },
    radioGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    radioButton: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: wp("5%"),
    },
    radioLabel: {
      marginLeft: wp("1%"),
      fontSize: wp("4%"),
    },
    checkboxContainer: {
      marginBottom: hp("2%"),
    },
    checkbox: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: hp("1%"),
    },
    checkboxText: {
      marginLeft: wp("1%"),
      marginRight: wp("2%"),
      fontSize: wp("4%"),
    },
    selectedCheckboxText: {
      marginLeft: wp("1%"),
      marginRight: wp("2%"),
      fontSize: wp("4%"),
      color: "blue",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  
    containerTwo: {
      padding: 20,
      alignItems: "center", // Center horizontally
    },
    button: {
      backgroundColor: "#D3D3D3",
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
      minHeight:hp(1)
    },
   
    fileNameContainer: {
      marginTop: 10,
      width: "100%", // Take full width
      alignItems: "center", // Center horizontally
    },
  
  
    picker: {
      height: 40,
      width: "100%",
    },
  
    inputContainer: {
      borderColor: "black",
      backgroundColor: "white",
      marginTop: hp(2),
      width: "100%",
      marginBottom: hp(1.5),
      height: hp(7),
      borderWidth: 0.5,
      borderStyle: "solid",
      borderRadius: wp(0),
      overflow: "hidden",
    },
    inputContainerTwo: {
      borderColor: "black",
      marginTop: hp(2),
      width: "100%",
      marginBottom: hp(1.5),
      height: hp(6),
      borderWidth: 0.5,
      borderStyle: "solid",
      borderRadius: wp(0),
      overflow: "hidden",
      flexDirection: "row", // Align children horizontally
      alignItems: "center", // Center children vertically
      paddingHorizontal: 10, // Add some padding for spacing
    },
    textInput: {
      color: "black",
      backgroundColor: "white",
      height: hp(7),
      fontSize: wp(4),
    },
  
    inputCal: {
      flex: 1, // Take up remaining space
      fontSize: 16,
      padding: 10,
    },
    icon: {
      marginLeft: 10,
      justifyContent: "center", 
      marginBottom: hp(2),
      marginLeft:wp(12)


    },
  });
  

export default FormScreen;
