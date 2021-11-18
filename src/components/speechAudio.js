import React, {useEffect} from "react";

const SpeechAudio = ({word}) => {
  useEffect(() => {
    const createSpeech = () => {
      let languages = ["en-GB", "en-US", "en-AU"];
      let speech = new SpeechSynthesisUtterance();

      let languageIndex = Math.floor(languages.length * Math.random());
      speech.text = word;
      speech.lang = languages[languageIndex];
      speech.pitch = 2 * Math.random();

      return speech;
    };

    if ("speechSynthesis" in window) {
      window.speechSynthesis.speak(createSpeech());
    } else {
      console.warn(
        "The current browser does not support the speechSynthesis API."
      );
    }
  }, []);

  return null;
};

export default SpeechAudio;
