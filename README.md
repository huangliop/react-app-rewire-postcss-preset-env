# react-app-rewire-postcss-preset-env

 [postcss-cssnext](https://github.com/MoOx/postcss-cssnext) has been deprecated in favor of [postcss-preset-env](https://preset-env.cssdb.org/).   
 So i made this !
 ## Installation

This package is not yet published to the npm registry. Install from GitHub:

```
yarn add --dev react-app-rewire-postcss-preset-env postcss-preset-env
```

OR

```
npm install --save-dev react-app-rewire-postcss-preset-env postcss-preset-env
```

## Usage

Use the following file extensions for any  styles:

- `*.css` 

### Example

In your react-app-rewired configuration:

```javascript
/* config-overrides.js */

const rewireCssModules = require('react-app-rewire-postcss-preset-env');

module.exports = function override(config, env) {
    // ...
    config = rewireCssModules(config, env,{stage:0,browsers:'> 2%'});
    // ...
    return config;
}
```
