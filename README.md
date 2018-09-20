# mantha
> Webpack 4 Vue.js typescript-friendly production starter kit with A LOT of automated processes.

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
  - Fully-configurable output html at `./src/.config/html`
  - Path aliases dynamically loaded from your `tsconfig.json` so you won't forget to change them
  - Automated favicons for all possible devices
  - Sourcemaps
- Fully set-up testing, reporting coverage with `Jest`
- TS-Lint by typescript giudelines
- [Component import shorthands](#component-import-shorthands)
- Pug & Less support
- Fully configurable plugins
- Zero-configuration vuex store and vue router
- ES6-compilant build with dynamically-loaded polyfills (coming soon)

