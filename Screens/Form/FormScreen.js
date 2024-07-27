import React, { useEffect,useState } from "react";
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
import { CheckBox } from 'react-native-elements'; 
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./styles";

const FormScreen = ({ route, navigation }) => {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      contact: "",
      dob: "",
      gender: "",
      subject: [],
      resume: null, 
      url: "",
      choice: "",
      about: "",
    });
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [fileName, setFileName] = useState("No files selected");
    const [selectedValue, setSelectedValue] = useState(form.lastName);
  
    useEffect(() => {
      const { itemToEdit } = route.params || {};
      if (itemToEdit && typeof itemToEdit === 'object') {
        setForm(prevForm => ({
          ...prevForm,
          ...itemToEdit,
          resume: null,
          subject: itemToEdit.subject || [],
        }));
        setSelectedDate(itemToEdit.dob);
        setFileName(itemToEdit.resume || "No files selected");
      }
    }, [route.params]);
    
  
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
    const handleSubjectChange = (subject) => {
        setForm(prevForm => {
          const updatedSubjects = prevForm.subject.includes(subject)
            ? prevForm.subject.filter(sub => sub !== subject)
            : [...prevForm.subject, subject];
          return { ...prevForm, subject: updatedSubjects };
        });
      };


    const handleFileSelection = async () => {
      try {
        const result = await DocumentPicker.getDocumentAsync({
          type: "*/*",
        });
  
        if (result.type === "success") {
          setFileName(result.name);
        } else {
          setFileName("No files selected");
        }
      } catch (error) {
        console.error("Error picking document:", error);
        setFileName("No files selected");
      }
    };
  
    const handleInputChange = (name, value) => {
      setForm({ ...form, [name]: value });
    };
  
    const handleSubmit = async () => {
      try {
        let storedData = await AsyncStorage.getItem("formData");
        storedData = storedData ? JSON.parse(storedData) : [];
        
        const { itemToEdit, itemIndex } = route.params || {};
    
        if (itemToEdit) {
          // Update existing item
          const updatedData = storedData.map((item, index) =>
            index === itemIndex ? { ...form, resume: null } : item
          );
          await AsyncStorage.setItem("formData", JSON.stringify(updatedData));
        } else {
          // Add new item
          storedData.push({ ...form, resume: null }); // Exclude resume
          await AsyncStorage.setItem("formData", JSON.stringify(storedData));
        }
    
        Alert.alert("Form submitted successfully!");
        navigation.navigate("List");
      } catch (error) {
        console.log(error);
      }
    };


    const handleReset = () => {
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        contact: "",
        dob: "",
        gender: "",
        subject: [],
        resume: null,
        url: "",
        choice: "",
        about: "",
      });
      setSelectedDate("");
      setDate(new Date());
      setShowPicker(false);
      setFileName("No files selected");
      setSelectedValue("");
    };
    
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Form In React</Text>

        <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>First Name</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={form.firstName}
          onChangeText={(value) => handleInputChange("firstName", value)}
        />
        
        <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Last Name</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={form.lastName}
          onChangeText={(value) => handleInputChange("lastName", value)}
        />

        
<View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Enter Email</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          value={form.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />

        
<View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Contact</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
        <TextInput
          style={styles.input}
          placeholder="Contact"
          value={form.contact}
          onChangeText={(value) => handleInputChange("contact", value)}
        />
  
  <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Date of birth</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>

{  showPicker  && Platform.OS === "ios" && (

<View  style={{flexDirection:"row",  justifyContent:"space-around" }}>

<TouchableOpacity  style={{width:wp(20)}}  onPress={toggleDatePicker}>

  <Text>  Cancel </Text>
</TouchableOpacity>
</View>
)

}



        {!showPicker && (
          <Pressable onPress={toggleDatePicker  }>
            <View style={styles.inputContainerTwo} accessible={true}>
              <Text style={styles.dateodBirth}>
                {selectedDate || "Pick a Date"}
              </Text>
              <View style={styles.fileNameContainer}>
                <TouchableOpacity onPress={toggleDatePicker}>
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
  style={styles.datePicker}

          />
        )}
  
  <View style={styles.genderContainer}>
               
        <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Gender</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
                <RadioButton.Group
                    onValueChange={(value) => handleInputChange("gender", value)}
                    value={form.gender}
                >
                    <View style={styles.radioGroup}>
                        <View style={styles.radioButton}>
                            <RadioButton value="male" />
                            <Text style={styles.radioLabel}>Male</Text>
                        </View>
                        <View style={styles.radioButtonTwo}>
                            <RadioButton value="female" />
                            <Text style={styles.radioLabel}>Female</Text>
                        </View>
                        <View style={styles.radioButtonThree}>
                            <RadioButton value="other" />
                            <Text style={styles.radioLabel}>Other</Text>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>
            <View style={styles.genderContainer}>
               
        <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Your Best Subject</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
                <View style={styles.checkboxContainer}>
        {['english', 'maths', 'physics'].map(subject => (
          <View key={subject} style={styles.checkboxWrapper}>
            <CheckBox
              title={subject.charAt(0).toUpperCase() + subject.slice(1)}
              checked={form.subject.includes(subject)} 
              onPress={() => handleSubjectChange(subject)} 
              containerStyle={styles.checkboxElement}
              textStyle={styles.checkboxText}
            />
          </View>
        ))}
      </View>
            </View>

            
        <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Upload Resume</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
  
        <View style={styles.inputContainerTwo} accessible={true}>
          <TouchableOpacity style={styles.button} onPress={handleFileSelection}>
            <Text style={styles.buttonText}>Browse..</Text>
          </TouchableOpacity>
          <View style={styles.fileNameContainer}>
            <Text style={styles.fileName}>{fileName}</Text>
          </View>
        </View>


        
        <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Enter URL</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
  
        <TextInput
          style={styles.input}
          placeholder="Your URL"
          value={form.url}
          onChangeText={(value) => handleInputChange("url", value)}
        />

        
<View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Select Your Choice</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
  
  <View style={styles.inputContainerTwo} accessible={true}>
        <Picker
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) => {
            setSelectedValue(itemValue);
            handleInputChange("choice", itemValue);
          }}
        >
          <Picker.Item label="Select an option" value="" />
          <Picker.Item label="Yes" value="Yes" />
          <Picker.Item label="No" value="No" />
          <Picker.Item label="Else" value="Else" />
        </Picker>
      </View>
  

  
      <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>About</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>
        <TextInput
          style={styles.aboutinput}
          placeholder="About"
          value={form.about}
          onChangeText={(value) => handleInputChange("about", value)}
        />

        
      <View style={{ flexDirection: 'row' }}>
  <Text style={styles.subTitle}>Submit & reset</Text>
  <Text style={styles.subTitleTwo}> *</Text>
</View>


  <View style={{ flexDirection: 'row' ,justifyContent:'space-between'}}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleReset}>
          <Text style={styles.submitButtonText}>Reset</Text>
        </TouchableOpacity>
        </View>

      </ScrollView>
    );
  };



export default FormScreen;

