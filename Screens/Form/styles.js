
import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    color: "#31A062",
  },
  subTitle: {
    fontSize: wp("3%"),
    marginBottom: hp(".5%"),
    textAlign: "left",
    color: "black",
  },
  subAbout: {
    fontSize: wp("3%"),
    marginBottom: hp(".5%"),
    textAlign: "left",
    color: "black",
  },
  subTitleTwo: {
    fontSize: wp("3%"),
    marginBottom: hp(".5%"),
    textAlign: "left",
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: hp("2%"),
    padding: wp("3%"),
    borderRadius: 5,
  },
  aboutinput: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: hp("2%"),
    paddingLeft: wp("3%"), 
    paddingTop: wp("3%"), 
    borderRadius: 5,
    height: 100,
    textAlignVertical: 'top', 
    textAlign: 'left',
    fontSize: 16, 
  },
  textArea: {
    height: hp("15%"),
  },
  genderContainer: {
    marginBottom: hp("2%"),
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
  fileName: {
    fontSize: 16,
    color: "#333",
    alignSelf: 'flex-end',
  },
  dateodBirth: {
    fontSize: 16,
    color: "#ccc",
  },
  radioGroup: {
    flexDirection: "row",
   
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    
  },


  radioButtonTwo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp("2%"),
    marginLeft:wp("14%")
  },

  radioButtonThree: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp("2%"),
    marginLeft:wp("6%")
  },
  radioLabel: {
    marginLeft: wp("1%"),
    fontSize: wp("4%"),
  },
  checkboxContainer: {
    flexDirection: 'row', 
    marginBottom: 20,
    width: '100%',
  },
  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginRight: wp(4), 
  },
  checkboxElement: {
    padding: 0,
    margin: 0,
    backgroundColor: 'transparent', 
    borderWidth: 0,
  },
  checkboxText: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'black',
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerTwo: {
    padding: 20,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    minHeight: hp(1),
  },
  fileNameContainer: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: "100%",
    marginBottom: hp(1.5),
    height: hp(6),
    borderWidth: 0.5,
    borderStyle: "solid",
    borderRadius: wp(0),
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    position: 'relative',
  },
  textInput: {
    color: "black",
    backgroundColor: "white",
    height: hp(7),
    fontSize: wp(4),
  },
  inputCal: {
    flex: 1,
    fontSize: 16,
    padding: 10,
  },
  icon: {
    marginLeft: 10,
    justifyContent: "center",
  },
  submitButton: {
    backgroundColor: '#31A062',
    padding: 10,
    borderRadius: 5,
    width: wp('40%'),
    alignItems: 'center',
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
  datePicker:{
      height:120,
      marginTop:-10
  }
});

export default styles;
