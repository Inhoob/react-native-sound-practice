/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';
import Sound from 'react-native-sound';
import top1 from './ios/top1.mp3';
Sound.setCategory('Playback');
function App(): JSX.Element {
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
    }, 5000);
  }

  function pressStopHandler() {
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.stop();
  }

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <Button onPress={pressTimerHandler} title="Timer 버튼" />
          <Button onPress={pressStopHandler} title="Stop 버튼" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
