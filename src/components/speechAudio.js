import React, {useEffect} from "react";

const SpeechAudio = ({word}) => {


  useEffect( () => {
    const createSpeech = () => {
      let languages = ['en-GB','en-US','en-AU','es-ES','cs-CZ','it-IT','pl-PL','ru-RU','fr-FR'];
      let speech = new SpeechSynthesisUtterance();

      let languageIndex = Math.floor(languages.length * Math.random());
      speech.text = word;
      speech.lang = languages[0];
      speech.pitch = 2 * Math.random();

      return speech;
    }

    if('speechSynthesis' in window){
      window.speechSynthesis.speak(createSpeech());
    } else {
      console.warn('The current browser does not support the speechSynthesis API.')
    }
  },[]);

	return null;
}

export default SpeechAudio
