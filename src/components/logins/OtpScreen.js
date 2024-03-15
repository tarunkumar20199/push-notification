import React, {useState, useRef} from 'react';
import {View, TextInput, Button, Alert, StyleSheet} from 'react-native';

const OTPScreen = () => {
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleChangeText = (text, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = text;
    setOTP(updatedOTP);

    // Move focus to the next input field
    if (text.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    // Here you can handle the verification logic
    Alert.alert('Entered OTP', enteredOTP);
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={ref => (inputRefs.current[index] = ref)}
            style={styles.input}
            value={digit}
            onChangeText={text => handleChangeText(text, index)}
            keyboardType="numeric"
            maxLength={1}
            autoFocus={index === 0}
          />
        ))}
      </View>
      <Button title="Verify OTP" onPress={handleVerifyOTP} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 40,
    textAlign: 'center',
  },
});

export default OTPScreen;
