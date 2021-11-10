// Webpack 절대 경로를 설정한다(ex - @components)
// 먼저 .eslintignore 에 넣기

const path = require('path');
const aliases = {
  '@': '.',
  '@src': 'src',
  '@components': 'src/components',
};

// alias에 for문 통해서 넣기
function resolveSrc(_path) {
  // ex) '@components': path.resolve(__dirname , 'src/components)'
  return path.resolve(__dirname, _path);
}

for (const alias in aliases) {
  const aliasTo = aliases[alias];
  module.exports[alias] = resolveSrc(aliasTo);
}
