<div align="center">

![PS3 Singstar controller logo](public/logo192.png)

## PS3 Singstar Controller

`webman` `singstar ps2` `singstar ps3`

</div>

# Development

To run this application:

```bash
npm install
npm run start
```

To run the app against your local PS3 with webman install create `.env.development.local` and set the local IP of your PS3 e.g.

```
VITE_WEBMAN = 'http://192.168.68.74'
```

## Building For Production

To build this application for production:

```bash
npm run build
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
