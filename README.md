# 프로젝트 초기 설정

- Vue CLI 초기 셋팅(Vue CLI v4.5.15 기준)
    1. Manually select features 선택
    2. Progressive Web App (PWA) Support
    Unit Testing
    E2E Testing
    를 제외하고 모두 선택
    3. Vue version은 3.x 버전 사용
    4. class-style component syntax → **Yes**
    5. use Babel alongside Typescript... → **Yes**
    6. use History mode for router? → **Yes**
    7. Pick a CSS pre-processor → **Sass/Scss (with dart-sass)**
    (이거 하기전에 팀장님 계시면 node-sass로 해야 되는지 물어보기)
    8. Pick a linter / formatter config → **ESLInt + Airbnb config** 선택
    9. Pick additional lint features → **Lint on save**, **Lint and fix on commit** 둘다 선택
    10. Where do you prefre placing config for Babel, ESLint, etc?
    → **In dedecated config files**(따로 관리하겠다) 선택
    11. Save this as a preset for future projects? (이때 까지 설정값 담 프로젝트에도 유지?) → **No**

- ESlint

    <aside>
    💡 팀간 코드 유지를 위해 코드 작성에 공통된 규칙을 사용
    생성 되어 있는 eslintrc.js 안에 아래 내용을 복사 후 저장

    </aside>

    ```tsx
    // eslintrc.js
    module.exports = {
      root: true,
      env: {
        node: true,
      },
      extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
      ],
      parserOptions: {
        ecmaVersion: 2020,
      },
      rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'linebreak-style': 0,
        'import/no-unresolved': 'off',
        "no-console": "off",
        "vue/script-indent": [
          "error",
          2
        ],
        "vue/html-indent": [
          "error",
          2,
          {
            "attribute": 1,
            "baseIndent": 1,
            "closeBracket": 0,
            "alignAttributesVertically": true,
            "ignores": []
          }
        ],
        "indent": [
          "error",
          2
        ],
        "comma-dangle": "off",
        "max-len": ["error", { "code": 200 }],
      },
      overrides: [
        {
          files: [
            '**/__tests__/*.{j,t}s?(x)',
            '**/tests/unit/**/*.spec.{j,t}s?(x)',
          ],
          env: {
            jest: true,
          },
        },
      ],
    };
    ```

- 절대 경로 설정

    <aside>
    💡 Webpack 절대 경로를 설정한다 (ex - @components)

    </aside>

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
    // vue.config.js (새로 생성 후 작성)
    module.exports = {
        chainWebpack(config) {
            // Set up all the aliases we use in our app.
            config.resolve.alias.clear().merge(require('./aliases.config'));
        },
    }
    ```

- Stylelint

    <aside>
    💡 CSS, SCSS의 코드 규칙을 설정한다. (들여쓰기나, 옵션 위치 자동 조정)

    </aside>

    !! 하기 전에 먼저 IDE에서 Stylelint extension 추가한다.

    ```tsx
    // vscode IDE의 setting.json에 해당 내용을 추가

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

    ```tsx
    // stylelint.config.js (루트에 새로 생성)
    module.exports = {
      plugins: [
        'stylelint-order'
      ],
      extends: 'stylelint-config-standard',
      rules: {
        indentation: 2,
        'declaration-empty-line-before': null,
        'no-descending-specificity': null,
        'order/order': [
          'custom-properties',
          'declarations'
        ],
        'order/properties-order': [
          {
            // Must be first.
            properties: ['all'],
          },
          {
            // Position.
            properties: [
              'position',
              'inset',
              'inset-block',
              'inset-inline',
              'top',
              'right',
              'bottom',
              'left',
              'z-index',
            ],
          },
          {
            // Display mode.
            properties: ['box-sizing', 'display'],
          },
          {
            // Flexible boxes.
            properties: [
              'flex',
              'flex-basis',
              'flex-direction',
              'flex-flow',
              'flex-grow',
              'flex-shrink',
              'flex-wrap',
            ],
          },
          {
            // Grid layout.
            properties: [
              'grid',
              'grid-area',
              'grid-template',
              'grid-template-areas',
              'grid-template-rows',
              'grid-template-columns',
              'grid-row',
              'grid-row-start',
              'grid-row-end',
              'grid-column',
              'grid-column-start',
              'grid-column-end',
              'grid-auto-rows',
              'grid-auto-columns',
              'grid-auto-flow',
              'grid-gap',
              'grid-row-gap',
              'grid-column-gap',
            ],
          },
          {
            // Gap.
            properties: ['gap', 'row-gap', 'column-gap'],
          },
          {
            // Layout alignment.
            properties: [
              'place-content',
              'place-items',
              'place-self',
              'align-content',
              'align-items',
              'align-self',
              'justify-content',
              'justify-items',
              'justify-self',
            ],
          },
          {
            // Order.
            properties: ['order'],
          },
          {
            // Box model.
            properties: [
              'float',
              'width',
              'min-width',
              'max-width',
              'height',
              'min-height',
              'max-height',
              'padding',
              'padding-top',
              'padding-right',
              'padding-bottom',
              'padding-left',
              'margin',
              'margin-top',
              'margin-right',
              'margin-bottom',
              'margin-left',
              'overflow',
              'overflow-x',
              'overflow-y',
              '-webkit-overflow-scrolling',
              '-ms-overflow-x',
              '-ms-overflow-y',
              '-ms-overflow-style',
              'overscroll-behavior',
              'overscroll-behavior-x',
              'overscroll-behavior-y',
              'overscroll-behavior-inline',
              'overscroll-behavior-block',
              'clip',
              'clip-path',
              'clear',
            ],
          },
          {
            // Typography.
            properties: [
              'font',
              'font-family',
              'font-size',
              'font-style',
              'font-weight',
              'font-feature-settings',
              'font-kerning',
              'font-variant',
              'font-variant-ligatures',
              'font-variant-caps',
              'font-variant-alternates',
              'font-variant-numeric',
              'font-variant-east-asian',
              'font-variant-position',
              'font-size-adjust',
              'font-stretch',
              'font-effect',
              'font-emphasize',
              'font-emphasize-position',
              'font-emphasize-style',
              '-webkit-font-smoothing',
              '-moz-osx-font-smoothing',
              'font-smooth',
              'hyphens',
              'line-height',
              'color',
              'text-align',
              'text-align-last',
              'text-emphasis',
              'text-emphasis-color',
              'text-emphasis-style',
              'text-emphasis-position',
              'text-decoration',
              'text-decoration-line',
              'text-decoration-thickness',
              'text-decoration-style',
              'text-decoration-color',
              'text-underline-position',
              'text-underline-offset',
              'text-indent',
              'text-justify',
              'text-outline',
              '-ms-text-overflow',
              'text-overflow',
              'text-overflow-ellipsis',
              'text-overflow-mode',
              'text-shadow',
              'text-transform',
              'text-wrap',
              '-webkit-text-size-adjust',
              '-ms-text-size-adjust',
              'letter-spacing',
              'word-break',
              'word-spacing',
              'word-wrap', // Legacy name for `overflow-wrap`
              'overflow-wrap',
              'tab-size',
              'white-space',
              'vertical-align',
              'list-style',
              'list-style-position',
              'list-style-type',
              'list-style-image',
            ],
          },
          {
            // Accessibility & Interactions.
            properties: [
              'pointer-events',
              '-ms-touch-action',
              'touch-action',
              'cursor',
              'visibility',
              'zoom',
              'table-layout',
              'empty-cells',
              'caption-side',
              'border-spacing',
              'border-collapse',
              'content',
              'quotes',
              'counter-reset',
              'counter-increment',
              'resize',
              'user-select',
              'nav-index',
              'nav-up',
              'nav-right',
              'nav-down',
              'nav-left',
            ],
          },
          {
            // Background & Borders.
            properties: [
              'background',
              'background-color',
              'background-image',
              "-ms-filter:\\'progid:DXImageTransform.Microsoft.gradient",
              'filter:progid:DXImageTransform.Microsoft.gradient',
              'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader',
              'filter',
              'background-repeat',
              'background-attachment',
              'background-position',
              'background-position-x',
              'background-position-y',
              'background-clip',
              'background-origin',
              'background-size',
              'background-blend-mode',
              'isolation',
              'border',
              'border-color',
              'border-style',
              'border-width',
              'border-top',
              'border-top-color',
              'border-top-style',
              'border-top-width',
              'border-right',
              'border-right-color',
              'border-right-style',
              'border-right-width',
              'border-bottom',
              'border-bottom-color',
              'border-bottom-style',
              'border-bottom-width',
              'border-left',
              'border-left-color',
              'border-left-style',
              'border-left-width',
              'border-radius',
              'border-top-left-radius',
              'border-top-right-radius',
              'border-bottom-right-radius',
              'border-bottom-left-radius',
              'border-image',
              'border-image-source',
              'border-image-slice',
              'border-image-width',
              'border-image-outset',
              'border-image-repeat',
              'outline',
              'outline-width',
              'outline-style',
              'outline-color',
              'outline-offset',
              'box-shadow',
              'mix-blend-mode',
              'filter:progid:DXImageTransform.Microsoft.Alpha(Opacity',
              "-ms-filter:\\'progid:DXImageTransform.Microsoft.Alpha",
              'opacity',
              '-ms-interpolation-mode',
            ],
          },
          {
            // SVG Presentation Attributes.
            properties: [
              'alignment-baseline',
              'baseline-shift',
              'dominant-baseline',
              'text-anchor',
              'word-spacing',
              'writing-mode',

              'fill',
              'fill-opacity',
              'fill-rule',
              'stroke',
              'stroke-dasharray',
              'stroke-dashoffset',
              'stroke-linecap',
              'stroke-linejoin',
              'stroke-miterlimit',
              'stroke-opacity',
              'stroke-width',

              'color-interpolation',
              'color-interpolation-filters',
              'color-profile',
              'color-rendering',
              'flood-color',
              'flood-opacity',
              'image-rendering',
              'lighting-color',
              'marker-start',
              'marker-mid',
              'marker-end',
              'mask',
              'shape-rendering',
              'stop-color',
              'stop-opacity',
            ],
          },
          {
            // Transitions & Animation.
            properties: [
              'transition',
              'transition-delay',
              'transition-timing-function',
              'transition-duration',
              'transition-property',
              'transform',
              'transform-origin',
              'animation',
              'animation-name',
              'animation-duration',
              'animation-play-state',
              'animation-timing-function',
              'animation-delay',
              'animation-iteration-count',
              'animation-direction',
            ],
          },
        ],
      }
    };
    ```

    - stylelint version은 다음과 같이 맞추어야 동작

    14버전을 쓸려했는데 오류가 떠서..

    14버전 마이그레이션 문서는 아래와 같음

    ([https://github.com/stylelint/stylelint/blob/main/docs/migration-guide/to-14.md](https://github.com/stylelint/stylelint/blob/main/docs/migration-guide/to-14.md))

    ```tsx
    // 주의사항 devDependencies으로 설치 할 것.

    "stylelint": "^13.13.1",
        "stylelint-config-standard": "^22.0.0",
        "stylelint-order": "^4.1.0",
        "stylelint-scss": "^3.21.0",
        "stylelint-webpack-plugin": "^3.0.1",
    ```

    - vue.config.js

    ```tsx
    const StylelintPlugin = require('stylelint-webpack-plugin');

    module.exports = {
    configureWebpack: {
          plugins: [
            new StylelintPlugin({
              files: 'src/**/*.{vue,scss}',
              // extensions: ['css', 'scss', 'sass', 'vue'],
              // fix: true,
            }),
          ],
        }
    }
    ```

    fix : true는 웹팩에서 린트오류를 잡아주는 옵션

    (속도가 느리므로, IDE에서 lint 걸어주는 옵션이 안 될 경우 사용하면 된다.)