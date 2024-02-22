import Vimeo from '@vimeo/player' ;
import _throttle from 'lodash.throttle';

const keyStorage = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo(iframe);

player.on('loaded', () => {
    const timeCurrent = localStorage.getItem(keyStorage) || 0;
    player.setCurrentTime(timeCurrent);
});

const savePlaybackTime = () => {
    player.getCurrentTime().then((time) => {
localStorage.setItem(keyStorage, time);
    });
};

player.on(
    'timeupdate',
    _throttle(({ seconds }) => {
    localStorage.setItem(keyStorage, seconds);
    }, 1000)
);

console.log(iframe);