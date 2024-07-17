module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended', // Prettier 설정 추가
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-explicit-any': 'warn', // any 금지
    'no-var': 'warn', // var 금지
    'react/jsx-pascal-case': 'warn', // 컴포넌트 이름은 PascalCase로
    'react/jsx-key': 'warn', // 반복문으로 생성하는 요소에 key 강제
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/order': [
      'error',
      { groups: [['builtin', 'external', 'internal']] },
    ], // import 순서 강제
    'import/no-unused-modules': ['error', { unusedExports: true }], // 사용되지 않는 모듈 금지
    'prettier/prettier': 'error', // Prettier 설정 적용
  },
};

// 기본 ESLint 설정
