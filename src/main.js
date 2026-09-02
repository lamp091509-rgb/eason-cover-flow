import './styles/reset.css';
import './styles/main.css';
import { tracks } from './data/tracks.js';
import { createScene } from './three/scene.js';
import { CoverFlow } from './three/coverFlow.js';
import { bindInteraction } from './three/interaction.js';
import { AudioManager } from './audio/audioManager.js';

const container = document.querySelector('#cover-flow');
const { scene, camera, renderer } = createScene(container);
const flow = new CoverFlow(scene, tracks, 7);
const title = document.querySelector('#track-title');
const note = document.querySelector('#track-note');
const indexLabel = document.querySelector('#track-index');
const counter = document.querySelector('#counter');
const audioManager = new AudioManager();
let initialPlaybackPending = true;
let skipNextFocusToggle = false;
const updateInfo = () => { const track = tracks[flow.index]; title.textContent = track.title; note.textContent = track.audio ? '陈奕迅 · 点击封面播放' : '陈奕迅 · 暂无音频'; indexLabel.textContent = `TRACK ${String(flow.index + 1).padStart(2, '0')}`; counter.textContent = `${String(flow.index + 1).padStart(2, '0')} / ${String(tracks.length).padStart(2, '0')}`; };
const playTrack = async (index) => { try { await audioManager.play(tracks[index]); } catch (error) { console.warn('Audio could not be played.', error); } };
const tryInitialPlayback = async () => {
  if (!initialPlaybackPending) return;
  await playTrack(7);
  if (audioManager.isPlaying) initialPlaybackPending = false;
};
const unlockInitialPlayback = async () => {
  if (!initialPlaybackPending) return;
  skipNextFocusToggle = true;
  await playTrack(flow.index);
  initialPlaybackPending = false;
};
document.querySelector('#previous').addEventListener('click', async () => { await unlockInitialPlayback(); flow.step(-1); updateInfo(); });
document.querySelector('#next').addEventListener('click', async () => { await unlockInitialPlayback(); flow.step(1); updateInfo(); });
bindInteraction({ container, camera, renderer, flow, onChange: updateInfo, onSelect: playTrack, onUserGesture: unlockInitialPlayback, onFocus: async () => { document.body.classList.add('is-focused'); if (skipNextFocusToggle) { skipNextFocusToggle = false; return; } try { await audioManager.toggle(tracks[flow.index]); } catch (error) { console.warn('Audio could not be played.', error); } } });
window.addEventListener('keydown', async (event) => { if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return; await unlockInitialPlayback(); if (event.key === 'ArrowLeft') flow.step(-1); if (event.key === 'ArrowRight') flow.step(1); updateInfo(); });
const animate = () => { requestAnimationFrame(animate); flow.tick(); renderer.render(scene, camera); };
updateInfo();
animate();
tryInitialPlayback();
