# mantha
> Webpack 4 Vue.js typescript-friendly production starter kit with A LOT of automated processes.

<i style="padding:1rem;border-radius:2px;background-color: #fdf5d8;color: #716b53;">NOTE: this pre-set was designed for faster development speeds on large-scale production applications! It may be cumbersome to maintain a small-independent project with it.</i>

## Usage

```bash
git clone https://github.com/kazanexpress/mantha.git your-project-folder
cd your-project-folder

# Run npm install, wait a bit and write your library name and remote repo url when asked.
npm install

cd src

# That's all!
```

**Start coding** right away! `package.json` and other files are already set up for you.

No unnecessary webpack or loader configurations needed.

## Features

- Almost zero-setup. After `npm i` things will be set up for you 👌
- Webpack 4 with full-typescript configuration and...
  - Proper code splitting and async components
  - Fully-configurable output html at `./src/.config/build/html`
  - Path aliases dynamically loaded from your `tsconfig.json` so you won't forget to change them
  - Automated favicons for all possible devices
  - Sourcemaps
- Fully set-up testing, reporting and coverage with `Jest`
- TS-Lint by typescript giudelines
- [Component import shorthands](#component-import-shorthands)
- Pug & Stylus support
- Fully configurable plugins
- Zero-configuration vuex store and vue router
- ES6-compilant build with dynamically-loaded polyfills (coming soon)

## Workflow

### NPM scripts

```bash
npm run build     # to make a production build
npm run build:dev # to make a development build (for example to use on your team's development server)
npm run build:all # to launch all builds at once
npm run dev   # run a local dev-server with hot-reload
npm run lint  # lint your code
npm run test  # run tests
npm run test:report # report coverage after tests
npm run test:watch  # run tests on each file change
npm run test:prod   # run tests with linting and no-cache
```

### Directory structure and instructions

Here's how the basic outline of the project's structure looks like:

```bash
root
├───.webpack.config   # Here go several pre-set webpack configs for the app
│
├───build             # Built and compiled code and favicons
│   │
│   ├───favicons      # Generated favicons lie here
│   │
│   ├───development   # Development build with source-maps
│   └───production    # Production minified build
│
├───src               # The only directory you'll have to open during development
│   │
│   ├───.config       # A global config folder for your app. Put there every setting you want to make global
│   │   └───build
│   │       ├───html  # HTML-file config
│   │       └───chunk # chunk config
│   │
│   ├───.features     # Here goes your features configuration
│   ├───.text         # Here go your localizations
│   │
│   ├───assets        # Any assets you want to incorporate should go here
│   ├───components    # All the simple pure components go here
│   ├───pages         # Components that represent app pages go here
│   ├───plugins       # All miscellanious stuff
│   │
│   ├───store         # Here are your store modules
│   │
│   ├───themes        # Here you can put various style themes of your app in .less or .css
│   │   └───[theme-name]
│   │
│   ├───types         # Standard global types are here
│   │   └───index.d.ts
│   │
│   └───routes.ts     # Here are your routes
│
└───test  # Put your tests here
```
