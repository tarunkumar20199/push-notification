/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useState, useRef, useEffect, memo} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast, Box} from 'native-base';
import {signInWithMobile} from '../../utils/Auth';

const OTPScreen = ({route, navigation}) => {
  const toast = useToast();
  const {confirmOtp, mobileNo} = route.params;

  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(0);
  const [buttonClick, setButtonClick] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef([]);

  async function confirmCode(e) {
    e.preventDefault();
    const enteredOTP = otp.join('');
    try {
      const result = await confirm.confirm(enteredOTP);
      await AsyncStorage.setItem('user', JSON.stringify(result));
      navigation.navigate('Home');
    } catch (error) {
      toast.show({
        render: () => {
          return (
            <Box bg="error.600" px="2" py="1" rounded="sm" mb={5}>
              {error.code}
            </Box>
          );
        },
        placement: 'top',
      });
    }
  }
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
      await AsyncStorage.setItem('user', JSON.stringify(result));
      navigation.navigate('Home');
    } catch (error) {
      console.log('error :', error);
      console.log('Invalid code.');
    }
  };

  const handleResendOTP = async e => {
    e.preventDefault();
    // Logic to resend OTP
    setIsLoading(true);
    const confirmation = await signInWithMobile(`+91${mobileNo}`);
    if (confirmation.code) {
      toast.show({
        render: () => {
          return (
            <Box bg="error.600" px="2" py="1" rounded="sm" mb={5}>
              {confirmation.code}
            </Box>
          );
        },
        placement: 'top',
      });
      setIsLoading(false);
    } else if (confirmation) {
      setConfirm(confirmation);
      setIsLoading(false);
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="error.600" px="2" py="1" rounded="sm" mb={5}>
              'Something went Wrong...'
            </Box>
          );
        },
        placement: 'top',
      });
      setIsLoading(false);
    }
    setConfirm(confirmation);
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
      <Button
        title="Verify OTP"
        onPress={confirm ? confirmCode : handleVerifyOTP}
      />
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

export default memo(OTPScreen);
