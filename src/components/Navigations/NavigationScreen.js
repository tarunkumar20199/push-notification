/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Button, View} from 'native-base';
import {LoginScreen} from '../logins/LoginScreen';
import {SignupScreen} from '../logins/SignupScreen';
import HomeScreen from '../home/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPScreen from '../logins/OtpScreen';
const Stack = createStackNavigator();
export const NavigationScreen = ({userId}) => {
  return (
    <Stack.Navigator>
      {userId ? (
        <>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              headerTitle: 'Details',
              headerLeft: () => <></>,
              headerRight: () => (
                <View pr="4">
                  <Button
                    onPress={async () => {
                      await AsyncStorage.removeItem('user');
                      navigation.navigate('Login');
                    }}
                    title="Info"
                    color="#fff">
                    Logout
                  </Button>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={({navigation}) => ({
              headerTitle: 'Details',
              headerRight: () => (
                <View pr="4">
                  <Button
                    onPress={async () => {
                      await AsyncStorage.removeItem('user');
                      navigation.navigate('Login');
                    }}
                    title="Info"
                    color="#fff">
                    Logout
                  </Button>
                </View>
              ),
            })}
          />
          <Stack.Screen
            name="Otp"
            component={OTPScreen}
            options={{
              headerShown: false,
            }}
          />
        </>
      )}
      {/* <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({navigation}) => ({
          headerTitle: 'Details',
          headerRight: () => (
            <View pr="4">
              <Button
                onPress={async () => {
                  await AsyncStorage.removeItem('user');
                  navigation.navigate('Login');
                }}
                title="Info"
                color="#fff">
                Logout
              </Button>
            </View>
          ),
        })}
      /> */}
      {/* <Stack.Screen
        name="Otp"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};
