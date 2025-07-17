module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    // 代码风格规则
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    
    // 最佳实践
    'no-unused-vars': 'warn',
    'no-console': 'off', // 允许 console.log
    'no-debugger': 'error',
    
    // 中文注释支持
    'spaced-comment': ['error', 'always'],
  },
}; 