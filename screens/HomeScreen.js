import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar, Button, View} from 'react-native';
import {SoundContext} from '../store/context/sound-context';
function HomeScreen({navigation}) {
  const soundCtx = useContext(SoundContext);
  const {runSound} = soundCtx;
  let intervalId;
  let timerId;
  function pressTimerHandler() {
    if (!intervalId) {
      timerId = setTimeout(() => {
        intervalId = setInterval(() => {
          runSound();
        }, 1000);
      }, 5000);
    }
    console.log(timerId);
  }
  // function pressTimerHandler() {
  //   if (!intervalId) {
  //     timerId = setTimeout(() => {
  //       runSound();
  //     }, 5000);
  //   }
  //   console.log(timerId);
  // }

  function pressStopHandler() {
    console.log(timerId);
    clearTimeout(timerId);
  }
  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View>
            <Button onPress={pressTimerHandler} title="Timer 버튼" />
            <Button onPress={pressStopHandler} title="Stop 버튼" />
          </View>
        </ScrollView>
        <Button
          title="selfmade background"
          onPress={() => {
            navigation.navigate('Side');
          }}
        />
      </SafeAreaView>
    </>
  );
}
export default HomeScreen;
