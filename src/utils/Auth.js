/* eslint-disable no-unused-vars */
import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const handleAuth = async (email, password) => {
  try {
    const {user} = await auth().createUserWithEmailAndPassword(email, password);
    if (user) {
      await user.sendEmailVerification();
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

// export const onGoogleButtonPress = async () => {
//   // Check if your device supports Google Play
//   await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
//   // Get the users ID token
//   const {idToken} = await GoogleSignin.signIn();
//   console.log('idToken :', idToken);

//   // Create a Google credential with the token
//   const googleCredential = auth.GoogleAuthProvider.credential(idToken);

//   // Sign-in the user with the credential
//   return auth().signInWithCredential(googleCredential);
// };

export const signInWithMobile = async phoneNumber => {
  console.log('phoneNumber :', phoneNumber);
  try {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log('confirmation :', confirmation._auth);
  } catch (error) {
    console.log('error :', error);
  }
};
