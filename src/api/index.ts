export default {
  popup,
  eject,
  getGames,
  PS3: { coverArt: PS3coverArt, mountGame: PS3mountGame, unmount: PS3unmount },
  PS2: { mount: PS2mount, unmount: PS2unmount, mountGame: PS2mountGame, coverArt: PS2coverArt },
};

function PS2coverArt(id: string): string {
  return `${import.meta.env.VITE_WEBMAN}/dev_hdd0/game/BLES80608/USRDIR/covers_retro/psx/${id}_COV.JPG`;
}

function PS3coverArt(id: string): string {
  return `${import.meta.env.VITE_WEBMAN}/dev_hdd0/game/BLES80608/USRDIR/covers/${id}.JPG`;
}

function PS2mount(location: string) {
  return fetch(`${import.meta.env.VITE_WEBMAN}/mount.ps2/${location}`);
}

function PS3mount(location: string) {
  return fetch(`${import.meta.env.VITE_WEBMAN}/mount_ps3/${location}`);
}

function PS2unmount() {
  return fetch(`${import.meta.env.VITE_WEBMAN}/mount.ps2/unmount`);
}

function PS3unmount() {
  return fetch(`${import.meta.env.VITE_WEBMAN}/mount.ps3/unmount`);
}

function popup(message: string) {
  return fetch(`${import.meta.env.VITE_WEBMAN}/popup.ps3?${message}`);
}

function eject() {
  return fetch(`${import.meta.env.VITE_WEBMAN}/eject.ps3`);
}

function insert() {
  return fetch(`${import.meta.env.VITE_WEBMAN}/insert.ps3`);
}

async function PS2mountGame(path: string) {
  await PS2mount(`dev_hdd0/Singstar/${path}`);
  await popup(`${path} has been loaded`);
  await insert();
}

async function PS3mountGame(path: string) {
  await PS3mount(`dev_hdd0/${path}`);
  await popup(`${path} has been loaded`);
}

export type Game = {
  id: string;
  name: string;
  type: 'PS2' | 'PS3';
  path: string;
  songs: { artist: string; name: string }[];
};

function getGames(): Promise<Game[]> {
  return fetch('/api/games.json')
    .then((res) => res.json())
    .then((games) => games.toSorted((a: Game, b: Game) => a.name.localeCompare(b.name)));
}
