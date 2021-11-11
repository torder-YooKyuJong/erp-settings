# 프로젝트 초기 설정

- Vue CLI 초기 셋팅

    progressive 깔면 안됨
    타입스크립트
    eslint는 에어비앤비

- 절대 경로 설정

    ```tsx
    // tsconfig.json
    // paths에 사용할 절대 경로를 등록 해준다.

    "paths": {
          "@assets": ["src/assets"],
          "@router": ["src/router"],
          "@store": ["src/store"],
          "@components": ["src/components"],
          "@components/*": ["src/components/*"],
          "@views" :["src/views"],
          "@views/*" :["src/views/*"]
        },
    ```

    ```tsx
    // aliases.config.js
    // Webpack 절대 경로를 설정한다(ex - @components)
    // node는 es5에서 동작하므로 lint에 걸리기 때문에 .eslintignore 에 넣기

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
    ```

    ```tsx
    // vue.config.js
    module.exports = {
        chainWebpack(config) {
            // Set up all the aliases we use in our app.
            config.resolve.alias.clear().merge(require('./aliases.config'));
        },
    }
    ```

- Stylelint

    Stylelint extension 추가

    setting.json에 해당 내용 추가

    ```tsx
    "editor.codeActionsOnSave": {
            "source.fixAll": true,
            "source.fixAll.eslint": true,
            "source.fixAll.stylelint": true
        },
    "stylelint.enable": true,
    "stylelint.validate": [
            "css",
            "scss",
            "vue"
        ]
    ```

    stylelint version은 다음과 같이 맞추어야 동작

    14버전을 쓸려했는데 오류가 떠서..

    14버전 마이그레이션 문서는 아래와 같음

    ([https://github.com/stylelint/stylelint/blob/main/docs/migration-guide/to-14.md](https://github.com/stylelint/stylelint/blob/main/docs/migration-guide/to-14.md))

    ```tsx
    "stylelint": "^13.13.1",
        "stylelint-config-standard": "^22.0.0",
        "stylelint-order": "^4.1.0",
        "stylelint-scss": "^3.21.0",
        "stylelint-webpack-plugin": "^3.0.1",
    ```

    vue.config.js

    ```tsx
    const StylelintPlugin = require('stylelint-webpack-plugin');

    module.exports = {
    configureWebpack: {
          plugins: [
            new StylelintPlugin({
              files: 'src/**/*.{vue,scss}',
            }),
          ],
        }
    }
    ```

    StylelintPlugin의 옵션 중 fix : true는 웹팩에서 린트오류를 잡아주는 옵션

    (속도가 느리므로, IDE에서 lint 걸어주는 옵션이 안 될 경우 사용하면 된다.)

    이후 루트폴더에 stylelint.config.js을 가져와서 복붙한다.

- ESlint