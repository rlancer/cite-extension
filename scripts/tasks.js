require('shelljs/global');

exports.replaceWebpack = () => {
  const replaceTasks = [{
    from: 'webpack/replace/JsonpMainTemplate.runtime.js',
    to: 'node_modules/webpack/lib/JsonpMainTemplate.runtime.js'
  }, {
    from: 'webpack/replace/log-apply-result.js',
    to: 'node_modules/webpack/hot/log-apply-result.js'
  }];

  replaceTasks.forEach(task => cp(task.from, task.to));
};

exports.copyAssets = type => {
  const env = type === 'build' ? 'prod' : type;
  rm('-rf', type);
  mkdir(type);
  cp(`chrome/extension/background.js`, `${type}/background.js`);
  cp(`chrome/extension/content.js`, `${type}/content.js`);
  cp(`chrome/extension/popup.js`, `${type}/popup.js`);
  cp(`chrome/manifest.${env}.json`, `${type}/manifest.json`);
  cp('-R', 'chrome/assets/*', type);
  mkdir(`${type}/css/`);
  cp('-R', 'chrome/css/*', `${type}/css/`);
  exec(`jade -O "{ env: '${env}' }" -o ${type} chrome/views/`);
};
