/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const handleAuth = async (email, password) => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);
    console.log('user :', user);
    if (user) {
      const result = await user.user.sendEmailVerification();
      console.log('result :', result);
      auth.signOut();
    }
  } catch (error) {
    return error;
  }
};

export const handleSignIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    if (userCredential) {
      await AsyncStorage.setItem('user', JSON.stringify(userCredential));
    }
    return userCredential;
  } catch (error) {
    return error;
  }
};

export const signOut = async ({navigation}) => {
  try {
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  } catch (error) {
    return error;
  }
};

export const onGoogleButtonPress = async () => {
  GoogleSignin.configure();
  try {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      return 'user cancelled the login flow.';
    } else if (error.code === statusCodes.IN_PROGRESS) {
      return 'In progress';
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      return 'play services not available or outdated';
    } else {
      return 'Something went wrong';
    }
  }
};

export const signInWithMobile = async phoneNumber => {
  try {
    return await auth().signInWithPhoneNumber(phoneNumber);
  } catch (error) {
    return error;
  }
};
