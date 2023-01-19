import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Button,
  View,
  Header,
} from 'react-native';
import top1 from '../ios/top1.mp3';
import Sound from 'react-native-sound';
import BackgroundTimer from 'react-native-background-timer';
function HomeScreen({navigation}) {
  const ding = new Sound(top1, error => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log(
      'duration in seconds: ' +
        ding.getDuration() +
        'number of channels: ' +
        ding.getNumberOfChannels(),
    );
  });

  function pressTimerHandler() {
    // BackgroundTimer.stopBackgroundTimer();

    setTimeout(() => {
      BackgroundTimer.runBackgroundTimer(() => {
        //code that will be called every 3 seconds
        ding.play(success => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 1000);
    }, 1000);
  }

  function pressStopHandler() {
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.stop();
  }
  return (
    <>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          {/* <Header /> */}
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
