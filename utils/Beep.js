import {Player} from '@react-native-community/audio-toolkit';

let beepSub1;
let beepSub2;

let beepMain1;
let beepMain2;
// let beepMain3;

let mainSoundSelector = null;

let volumeDefault = 0.5;

const INIT_SETTING = {
  autoDestroy: false,
  mixWithOthers: true,
  continuesToPlayInBackground: true,
};

export const initSounds = (newVolume = 0.5) => {
  beepMain1 = new Player('top1.mp3', INIT_SETTING).prepare();
  beepMain2 = new Player('beep4.mp3', INIT_SETTING).prepare();
  beepSub1 = new Player('base1.mp3', INIT_SETTING).prepare();
  beepSub2 = new Player('beep.mp3', INIT_SETTING).prepare();

  beepMain1.volume = newVolume || volumeDefault;
  beepMain2.volume = newVolume || volumeDefault;
  beepSub1.volume = newVolume || volumeDefault;
  beepSub2.volume = newVolume || volumeDefault;
};

export const changeVolume = newVolume => {
  try {
    beepMain1.volume = newVolume;
    beepMain2.volume = newVolume;
    beepSub1.volume = newVolume;
    beepSub2.volume = newVolume;
  } catch (error) {
    console.warn('changeVolume Failed', error);
  }
};

export const mainSoundSelect = soundName => {
  if (soundName) {
    mainSoundSelector = soundName;
  }
};

export const destroySounds = () => {
  // console.warn('destroysounds');
  beepMain1?.destroy();
  beepMain2?.destroy();
  beepSub1?.destroy();
  beepSub2?.destroy();
};

export const beepForce = soundName => {
  if (!soundName) {
    beepMain1?.play();
    return;
  }

  if (soundName === 'main1') {
    beepMain1?.play();
  } else if (soundName === 'main2') {
    beepMain2?.play();
  }
};

export const beepMain = () => {
  if (!mainSoundSelector) {
    beepMain1?.play();

    return;
  }

  if (mainSoundSelector === 'main1') {
    beepMain1?.play();
  } else if (mainSoundSelector === 'main2') {
    beepMain2?.play();
  }
};

export const beepSub = s => {
  if (!s) {
    beepSub1?.play();
    return;
  }

  if (s === 'sub1') {
    beepSub1?.play();
  } else if (s === 'sub2') {
    beepSub2?.play();
  }
};
