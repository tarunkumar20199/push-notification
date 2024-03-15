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
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {handleSignIn, signInWithMobile} from '../../utils/Auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LoginScreen = ({navigation}) => {
  const [value, setValue] = useState({
    input: '',
    type: '',
  });

  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '435462336363-d0qitvju5kr9c7idmhch3hn0svnh4hv2.apps.googleusercontent.com',
    });
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      console.log('idToken :', idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
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
      console.log('value.type :', value.input);
      const confirmation = await signInWithMobile(`+91${value?.input}`);
      await AsyncStorage.setItem('confirmation', confirmation);
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
          <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
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
              <Text onPress={onGoogleButtonPress}>Google</Text>
              <Text>Github</Text>
              <Text>Facebook</Text>
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
