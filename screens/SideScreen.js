import React, {useRef, useState, useEffect, useContext} from 'react';
import {View, Text, Button, AppState, StyleSheet} from 'react-native';
import {SoundContext} from '../store/context/sound-context';

function SideScreen() {
  const soundCtx = useContext(SoundContext);
  const {sound, runSound} = soundCtx;
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);
  let intervalId;
  function pressTimerHandler() {
    console.log(intervalId);
    if (!intervalId) {
      setTimeout(() => {
        intervalId = setInterval(() => {
          runSound();
        }, 1000);
      }, 5000);
    } else {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
  function pressStopHandler() {
    clearInterval(intervalId);
  }
  return (
    <View>
      <Text>SideScreen</Text>
      <View>
        <Button onPress={pressTimerHandler} title="Timer toggle" />
      </View>
    </View>
  );
}
export default SideScreen;
