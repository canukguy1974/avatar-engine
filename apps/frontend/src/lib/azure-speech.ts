// Pseudo-skeleton: wire with Azure Speech SDK if you use it
// npm i microsoft-cognitiveservices-speech-sdk
import * as sdk from "microsoft-cognitiveservices-speech-sdk";

export function startAzureTTS({ text, voice, token, region, onWord }: {
  text: string; voice: string; token: string; region: string;
  onWord?: (ms: number, word: string) => void;
}) {
  const speechConfig = sdk.SpeechConfig.fromAuthorizationToken(token, region);
  speechConfig.speechSynthesisVoiceName = voice;
  const player = new sdk.SpeakerAudioDestination(); // plays now
  const audioConfig = sdk.AudioConfig.fromSpeakerOutput(player);
  const synth = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

  synth.wordBoundary = (_, e) => onWord?.(e.audioOffset / 10000, e.text); // 100-ns → ms
  synth.speakTextAsync(text, () => synth.close(), e => { console.error(e); synth.close(); });
  return { stop: () => synth.close() };
}
