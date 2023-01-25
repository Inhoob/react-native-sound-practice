import React, {createContext, useState} from 'react';
import Sound from 'react-native-sound';
import top1 from '../../ios/top1.mp3';
import travel from '../../ios/travel.mp3';

Sound.setCategory('Playback', false);
// Sound.setActive(true);
export const SoundContext = createContext({
  sound: {},
  runSound: () => {},
});

function SoundContextProvider({children}) {
  const ding = new Sound(top1, error => {
    if (error) {
      console.log('failed to load the ding', error);
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
  ding.setVolume(0.5);
  const runSound = () => {
    ding.play(success => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
    // ding.setNumberOfLoops(-1);
  };
  const value = {
    sound: ding,
    runSound: runSound,
  };
  return (
    <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
  );
}

export default SoundContextProvider;
