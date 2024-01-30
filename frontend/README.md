# Adobe CC Frontend Training

Boilerplate project to set up Frontend projects within AEM projects.

Includes:
- basic Webpack and Living Styleguide setup based on [pv-tools](https://github.com/pro-vision/fe-tools#readme)
- defines commonly used project folder structure

An cli script helps replacing namespace string within the project see [./scripts/replace-namespace/README.md](./scripts/replace-namespace/README.md)

## Setup

### Dependencies

- Node 14.15.0
- npm 6.14.8


### Correct Node Version

To ensure the correct `node` version, run this inside the frontend folder:

```bash
$ nvm use
```

for windows: use "nvm list"

1. If you're prompted for a missing version simply install the proper version with:

```bash
$ nvm install 14.15.0
$ nvm use 14.15.0
```

2. If you haven't installed nvm yet

   Delete previous node installation

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```

for windows: use https://github.com/coreybutler/nvm-windows

3. Add `nvm`to `~/.bash_profile`

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```

4. Reload `bash_profile` in current CLI session

```bash
source ~/.bash_profile
```

5. Verify installation of `nvm`:

```bash
$ command -v nvm
```

If output is `nvm` you can retry `nvm use`.

For details if this does not work properly see [https://github.com/creationix/nvm]()

### Installation

If you have the correct node version running install all dev dependencies.

```
npm install
```

## Run local Development Server

serving the Frontend click dummy from a local webpack server (http://localhost:8010/).
run this command in the frontend root folder:

```
npm run start
```

## Run Build Tasks

Generates necessary files for the frontend in the AEM or standalone Frontend.
run this command in the frontend root folder:

Without compression:

```
npm run build:dev
```

With compression:

```
npm run build:prod
```

This compiles css files, transpiles and bundles the js files, copies assets to the clientLib folder. Generates static webpages using assemble.
Maven only needs to execute this command.

```
npm run new
```

An interactive cli script helps generating boilerplate code for a new component. see [./scripts/create-component/README.md](./scripts/create-component/README.md)

## Test

Runs the Frontend tests. i.e. unit tests.

### Unit

Run (Jest) unit tests:

```bash
npm run test:unit
```

## Lint

### eslint

Runs tslint:

```bash
npm run eslint
```

(This tasks also needs to be executed by the developer before pushing)

### stylelint

Runs stylelint:

```bash
npm run stylelint
```

(This tasks also needs to be executed by the developer before pushing)

