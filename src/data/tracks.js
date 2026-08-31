const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;

export const tracks = [
  { id: 'track-01-putao', title: '葡萄成熟时', note: '陈奕迅 · FLAC 音频', cover: asset('/covers/track-01-putao.jpeg'), audio: asset('/audio/track-01-putao.flac') },
  { id: 'track-02-fushi', title: '富士山下', note: '陈奕迅 · FLAC 音频', cover: asset('/covers/track-02-fushi.jpeg'), audio: asset('/audio/track-02-fushi.flac') },
  { id: 'track-03-shinian', title: '十年', note: '陈奕迅 · MP3 音频', cover: asset('/covers/track-03-shinian.jpeg'), audio: asset('/audio/track-03-shinian.mp3') },
  { id: 'track-04-zuijiasunyou', title: '最佳损友', note: '陈奕迅 · FLAC 音频', cover: asset('/covers/track-04-zuijiasunyou.jpeg'), audio: asset('/audio/track-04-zuijiasunyou.flac') },
  { id: 'track-05-aishiyibenshu', title: '爱是一本书', note: '陈奕迅 · FLAC 音频', cover: asset('/covers/track-05-aishiyibenshu.jpeg'), audio: asset('/audio/track-05-aishiyibenshu.flac') },
  { id: 'track-06-wutiaojian', title: '无条件', note: '陈奕迅 · MP3 音频', cover: asset('/covers/track-06-wutiaojian.jpeg'), audio: asset('/audio/track-06-wutiaojian.mp3') },
  { id: 'track-07-shimianmaifu', title: '十面埋伏', note: '陈奕迅 · MP3 音频', cover: asset('/covers/track-07-shimianmaifu.jpeg'), audio: asset('/audio/track-07-shimianmaifu.mp3') },
  { id: 'track-08-wenwendexingfu', title: '稳稳的幸福', note: '陈奕迅 · MP3 音频', cover: asset('/covers/track-08-wenwendexingfu.jpeg'), audio: asset('/audio/track-08-wenwendexingfu.mp3') },
  { id: 'track-09-danche', title: '单车', note: '陈奕迅 · MP3 音频', cover: asset('/covers/track-09-danche.jpeg'), audio: asset('/audio/track-09-danche.mp3') },
  { id: 'track-10-yintiankuaile', title: '阴天快乐', note: '陈奕迅 · FLAC 音频', cover: asset('/covers/track-10-yintiankuaile.jpeg'), audio: asset('/audio/track-10-yintiankuaile.flac') },
  { id: 'track-11-guduhuanzhe', title: '孤独患者', note: '陈奕迅 · FLAC 音频', cover: asset('/covers/track-11-guduhuanzhe.jpeg'), audio: asset('/audio/track-11-guduhuanzhe.flac') },
  { id: 'track-12-fukua', title: '浮夸', note: '陈奕迅 · FLAC 音频', cover: asset('/covers/track-12-fukua.jpeg'), audio: asset('/audio/track-12-fukua.flac') },
  { id: 'track-13-shallwetalk', title: 'Shall We Talk', note: '陈奕迅 · FLAC 音频', cover: asset('/covers/track-13-shallwetalk.jpeg'), audio: asset('/audio/track-13-shallwetalk.flac') },
  { id: 'track-14-youlifenzi', title: '游离份子', note: '陈奕迅 · MP3 音频', cover: asset('/covers/track-14-youlifenzi.jpeg'), audio: asset('/audio/track-14-youlifenzi.mp3') },
  { id: 'track-15-kgzhiwang', title: 'K 歌之王', note: '陈奕迅 · MP3 音频', cover: asset('/covers/track-15-kgzhiwang.jpeg'), audio: asset('/audio/track-15-kgzhiwang.mp3') }
];
