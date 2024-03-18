/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  useToast,
} from 'native-base';
import {handleAuth} from '../../utils/Auth';

export const SignupScreen = ({navigation}) => {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    const signUp = await handleAuth(email, password);

    if (signUp.code) {
      toast.show({
        render: () => {
          return (
            <Box bg="error.600" px="2" py="1" rounded="sm" mb={5}>
              {signUp.code}
            </Box>
          );
        },
        placement: 'top',
      });
    } else if (signUp) {
      toast.show({
        render: () => {
          return (
            <Box bg="success.600" px="2" py="1" rounded="sm" mb={5}>
              Account created successfully
            </Box>
          );
        },
        placement: 'top',
      });
      navigation.navigate('Login');
    }
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" w="90%" maxW="290" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: 'warmGray.50',
          }}
          fontWeight="semibold">
          Welcome
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: 'warmGray.200',
          }}
          fontWeight="medium"
          size="xs">
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label>Email</FormControl.Label>
            <Input onChangeText={text => setEmail(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Password</FormControl.Label>
            <Input type="password" onChangeText={text => setPassword(text)} />
          </FormControl>
          <FormControl>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              type="password"
              onChangeText={text => setConfirmPassword(text)}
            />
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleSignUp}>
            Sign up
          </Button>
        </VStack>
      </Box>
    </Center>
  );
};
