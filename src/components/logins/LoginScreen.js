/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Divider,
  View,
  useToast,
  Spinner,
  Image,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {
  handleSignIn,
  signInWithMobile,
  onGoogleButtonPress,
} from '../../utils/Auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {Facebook, Google} from '../../utils/images';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({navigation}) => {
  const [value, setValue] = useState({
    input: '',
    type: '',
  });

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirm, setConfirm] = useState('');
  const toast = useToast();

  const googleLogin = async () => {
    const googleLoginData = await onGoogleButtonPress();
    if (googleLoginData.id) {
      AsyncStorage.setItem('user', JSON.stringify(googleLoginData));
      navigation.navigate('Home');
    } else {
      toast.show({
        render: () => {
          return (
            <Box bg="error.600" px="2" py="1" rounded="sm" mb={5}>
              {googleLoginData}
            </Box>
          );
        },
        placement: 'top',
      });
    }
  };
  const handleLogin = async () => {
    setIsLoading(true);
    if (value.type === 'email') {
      const signIn = await handleSignIn(value?.input, password);
      if (signIn.code) {
        toast.show({
          render: () => {
            return (
              <Box bg="error.600" px="2" py="1" rounded="sm" mb={5}>
                {signIn.code}
              </Box>
            );
          },
          placement: 'top',
        });
      } else if (signIn) {
        toast.show({
          render: () => {
            return (
              <Box bg="success.600" px="2" py="1" rounded="sm" mb={5}>
                Successfully login
              </Box>
            );
          },
          placement: 'top',
        });
        navigation.navigate('Home');
        setIsLoading(false);
      }
    } else if (value.type === 'mobile') {
      const confirmation = await signInWithMobile(`+91${value?.input}`);
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
      }
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
  };
  const checkInputType = text => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^\d{10}$/;
    if (emailRegex.test(text)) {
      return 'email';
    } else if (mobileRegex.test(text)) {
      return 'mobile';
    } else {
      return 'unknown';
    }
  };
  const handleTextChange = text => {
    setValue({input: text, type: checkInputType(text)});
  };
  // console.log('confirm :', confirm);
  useEffect(() => {
    if (confirm) {
      navigation.navigate('Otp', {
        confirmOtp: confirm,
        mobileNo: value?.input,
      });
      setIsLoading(false);
    }
  }, [confirm]);
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}>
          Welcome
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: 'warmGray.200',
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email ID / Mobile</FormControl.Label>
            <Input onChangeText={handleTextChange} />
          </FormControl>
          {value.type !== 'mobile' && (
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input type="password" onChangeText={text => setPassword(text)} />
              <Link
                _text={{
                  fontSize: 'xs',
                  fontWeight: '500',
                  color: 'indigo.500',
                }}
                alignSelf="flex-end"
                mt="1">
                Forget Password?
              </Link>
            </FormControl>
          )}
          <Button
            mt="2"
            colorScheme="indigo"
            onPress={handleLogin}
            color="blue.900">
            Sign in
          </Button>
          <VStack>
            <HStack
              space={'1'}
              pt="1"
              justifyContent={'center'}
              alignItems={'center'}>
              <View w="100">
                <Divider />
              </View>
              <Text>Or</Text>
              <View w="100">
                <Divider />
              </View>
            </HStack>
            <HStack justifyContent={'center'} alignItems={'center'} space={1}>
              <TouchableOpacity onPress={googleLogin}>
                <Image source={Google} alt="google" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={Facebook} alt="facebook" />
              </TouchableOpacity>
            </HStack>
          </VStack>

          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              I'm a new user.{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text
                _text={{
                  color: 'indigo.500',
                  fontWeight: 'medium',
                  fontSize: 'sm',
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </Box>
      {isLoading && (
        <Spinner
          position="absolute"
          justifyContent="center"
          alignItems="center"
          size="md"
          top="0"
          right="0"
          bottom="0"
          left="0"
        />
      )}
    </Center>
  );
};
