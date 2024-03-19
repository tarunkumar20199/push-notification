/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {convertNestedArrays} from '../helper/helper';
import firestore from '@react-native-firebase/firestore';

export const handleAuth = async (email, password) => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);

    const flattenArray = convertNestedArrays(JSON.stringify(user));
    await firestore().collection('Users').add(flattenArray);
    return user;
  } catch (error) {
    return error;
  }
};

export const handleSignIn = async (email, password) => {
  try {
    const {user} = await auth().signInWithEmailAndPassword(email, password);
    if (user) {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    }
    return user;
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
    const {user} = await GoogleSignin.signIn();
    const flattenArray = convertNestedArrays(JSON.stringify(user));
    await firestore().collection('googleUser').add(flattenArray);
    console.log('user :', user);
    return user;
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
    const mobileData = await auth().signInWithPhoneNumber(phoneNumber);
    // const {user} = convertNestedArrays(JSON.stringify(mobileData));
    // await firestore().collection('mobileUser').add(user);
    return mobileData;
  } catch (error) {
    return error;
  }
};
