/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTPScreen = ({route}) => {
  const {confirmOtp, mobileNo} = route.params;
  console.log('confirmOtp :', confirmOtp);
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(0);
  const [buttonClick, setButtonClick] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    let intervalId;

    if (buttonClick && timer > 0) {
      intervalId = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer, buttonClick]);

  const handleChangeText = (text, index) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = text;
    setOTP(updatedOTP);

    // Move focus to the next input field
    if (text.length === 1 && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleVerifyOTP = async e => {
    e.preventDefault();
    const enteredOTP = otp.join('');
    try {
      const result = await confirmOtp.confirm(enteredOTP);
      console.log('result :', result);
    } catch (error) {
      console.log('error :', error);
      console.log('Invalid code.');
    }
  };

  const handleResendOTP = e => {
    e.preventDefault();
    // Logic to resend OTP
    setButtonClick(true);
    setTimer(60); // Reset timer
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
      <View style={styles.resendContainer}>
        <Text style={styles.timer}>
          {timer > 0 ? `Resend OTP in ${timer} seconds` : ''}
        </Text>
        <Button
          title="Resend OTP"
          onPress={handleResendOTP}
          disabled={timer > 0}
        />
      </View>
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
    color: 'black',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  timer: {
    marginRight: 10,
    color: 'black',
  },
});

export default OTPScreen;
