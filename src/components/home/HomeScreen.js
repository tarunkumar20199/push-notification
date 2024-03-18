/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {
  Box,
  FlatList,
  View,
  Avatar,
  HStack,
  VStack,
  Text,
  useToast,
  Divider,
  Spinner,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
const HomeScreen = () => {
  const [user, setUser] = useState('');
  const [notification, setNotification] = useState();

  useEffect(() => {
    (async () => {
      const userDetails = await AsyncStorage.getItem('user');
      const objectData = JSON.parse(userDetails);
      setUser([objectData?.user]);
    })();
    unsubscribeNotification();
  }, []);

  const formatDateTime = signInTime => {
    const date = new Date(signInTime);
    const formattedDate = date.toLocaleString();

    return formattedDate;
  };

  const unsubscribeNotification = () => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setNotification(remoteMessage?.notification);
    });
    return unsubscribe;
  };

  const renderItem = ({item}) => (
    <>
      <Box>
        <HStack alignSelf="center">
          <Avatar
            size="100px"
            source={{
              uri: item?.photoURL
                ? item?.photoURL
                : 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            }}
          />
        </HStack>
        <View pt="4" pb="4">
          <Divider />
        </View>
        <VStack space="5" alignSelf="center">
          <Text fontSize="xl">Email: {item?.email}</Text>
          <Text fontSize="xl">
            Email Verified: {item?.emailVerified ? 'true' : 'false'}
          </Text>
          <Text fontSize="xl">
            CreationTime: {formatDateTime(item?.metadata?.creationTime)}
          </Text>
          <Text fontSize="xl">
            Mobile: {item?.phoneNumber ? item?.phoneNumber : 'Not Available'}
          </Text>
        </VStack>
      </Box>
    </>
  );

  return (
    <Box p="4">
      {user ? (
        <FlatList
          data={user}
          renderItem={renderItem}
          keyExtractor={item => item?.uid || item?.id}
        />
      ) : (
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
    </Box>
  );
};

export default HomeScreen;
