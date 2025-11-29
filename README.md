<div align="center">

![PS3 Singstar controller logo](public/logo192.png)

## PS3 Singstar Controller

`webMAN-MOD` `singstar ps2` `singstar ps3`

</div>

# Setup

Designed to be deployed directly onto a PS3 running [webMAN-MOD](https://github.com/aldostools/webMAN-MOD).

## Build

```sh
npm run build
```

Use a FTP client to copy contents of the `dist` directory to `/dev_hdd0/xmlhost/game_plugin/`

You should now be able to access the tool from `http://PS3_LOCAL_IP/singstar.html` e.g `http://192.168.68.74/singstar.html`

## Configuration

Upate `games.json` to display the Singstar games you have setup on your PS3.

```ts
    id: string, // game id, used to lookup cover art e.g. "SCES_554.53"
    name: string,
    type: "PS2" | "PS3",
    path: string, // location of the iso / gamedump (PS2 discs need to be relative to dev_hdd0/Singstar)
    songs: { artist: string, name: string }[]
```

# Development

To run this application:

```bash
npm install
npm run start
```

To run the app against your local PS3 with webMAN-MOD install create `.env.development.local` and set the local IP of your PS3 e.g.

```
VITE_WEBMAN = 'http://192.168.68.74'
```

## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Linting & Formatting

This project uses [eslint](https://eslint.org/) and [prettier](https://prettier.io/) for linting and formatting. Eslint is configured using [tanstack/eslint-config](https://tanstack.com/config/latest/docs/eslint). The following scripts are available:

```bash
npm run lint
npm run format
npm run check
```
