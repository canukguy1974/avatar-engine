export async function swapVideo(url: string) {
  const a = document.getElementById("audio") as HTMLAudioElement | null;
  const did = document.getElementById("did") as HTMLVideoElement | null;
  const sad = document.getElementById("sad") as HTMLVideoElement | null;
  if (!a || !did || !sad) return;

  sad.style.opacity = "0";
  sad.src = url;

  await sad.play().catch(() => {});
  sad.pause();

  const go = () => {
    sad.currentTime = a.currentTime;
    sad.play();
    did.style.transition = sad.style.transition = "opacity 180ms linear";
    sad.style.opacity = "1";
    did.style.opacity = "0";
  };

  if (sad.readyState >= 3) go();
  else sad.addEventListener("canplay", go, { once: true });
}
