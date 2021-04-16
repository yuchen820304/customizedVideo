function doFirst() {
  // barsize = 615;
  //先跟畫面產生關連

  let myMovie = document.getElementById('myMovie');

  let playButton = document.getElementById('playButton');

  let stopButton = document.getElementById('stopButton');

  let upButton = document.getElementById('upButton');

  let downButton = document.getElementById('downButton');

  let mutedButton = document.getElementById('mutedButton');

  let fullButton = document.getElementById('fullButton');

  let defaultBar = document.getElementById('defaultBar');

  progress = document.getElementById('progress');

  barsize = parseInt(window.getComputedStyle(defaultBar).width); //取得defaultBar的長度，getComputedStyle這方法只能讀取不能修改，返回值包含單位，所以用parseInt轉數字

  //再建事件聆聽功能
  playButton.addEventListener('click', playOrPause);
  myMovie.addEventListener('click', playOrPause);
  stopButton.addEventListener('click', stopVideo);
  upButton.addEventListener('click', volUp);
  downButton.addEventListener('click', volDown);
  mutedButton.addEventListener('click', muted);
  fullButton.addEventListener('click', fullScreen);
}

// 播放或暫停
function playOrPause() {
  //HTML5中video標籤有paused、ended屬性可使用，會回傳布林
  if (!myMovie.paused && !myMovie.ended) {
    //如果myMovie不是暫停及結束狀態(表示影片正在跑)
    myMovie.pause();
    playButton.innerText = 'play';
  } else {
    myMovie.play();
    playButton.innerText = 'pause';
    // $('#progress').css('transition', '2s');
    setInterval(update, 100);
  }
}

// 停止播放
function stopVideo() {
  myMovie.currentTime = 0; //回到0秒處
  myMovie.pause(); //設置暫停否則影片回到0秒會自動播放
}

// 音量加大
function volUp() {
  myMovie.volume += 0.1;
}

// 音量變小
function volDown() {
  myMovie.volume -= 0.1;
}

// 靜音
function muted() {
  myMovie.volume = 0.0;
}

function fullScreen() {
  myMovie.webkitEnterFullScreen();
}

function update() {
  //duration會回傳媒體長度，單位為秒
  if (!myMovie.ended) {
    let size = (barsize / myMovie.duration) * myMovie.currentTime;
    progress.style.width = `${size}px`;
  } else {
    progress.style.width = `0px`;
    myMovie.currentTime = 0;
    playButton.innerText = 'play';
  }
}

window.addEventListener('load', doFirst);
