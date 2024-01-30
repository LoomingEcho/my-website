# Create Component CLI

To accelerate development of new components, a CLI tool is provided.
This script can be executed via ```npm run new``` command.
An interactive command prompt will ask for the new components name,
if it should generate js, scss, hbs files. File names follow the BEM naming convention and put together in one directory.
warnings will be shown if any file already exist and whether it should be overwritten or not.

The script will then generate these files with some boilerplate code
(i.e. common imports, constructor, dummy props in js file,
grid, row, ccs class, data-attr in hbs template and the css class name in the sccs file)
and import those files in index.js/ts, styles.scss, ...

## Options

### `--dontCheck`

Script will ask to generate unit test file (or galen files) even when the cli was told not to generate a js file (scss/hbs respectivly).
This could get handy for example when later a test file should be generated for an already existing component.
