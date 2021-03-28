const audioElement = document.getElementById("audio");
const button = document.getElementById("button");



//Disable/Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

//passing joke to voice API
function tellMe(joke) {
  console.log("tell me:", joke);
  VoiceRSS.speech({
    key: "ad135f4b7ed54b8b8ab092d89af3a0a6",
    src: joke,
    hl: "en-gb",
    v: "Alice",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from API
async function getJokes() {
  let joke = "";
  const APIUrl = "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit";
  try {
    const response = await fetch(APIUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup}.............${data.delivery}`;
    } else {
      joke = data.joke;
    }
    //Text to Speech
    tellMe(joke);
    //disable button
    toggleButton();
  } catch (error) {
    //catch errors here
    console.log("You got an error dumbass!", error);
  }
  const bubble =document.getElementById('Bubble');
  bubble.innerHTML= joke;
}

// Event listeners

button.addEventListener("click", getJokes);
audioElement.addEventListener('ended', toggleButton);


