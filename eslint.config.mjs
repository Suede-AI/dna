import next from 'eslint-config-next';

export default [
  ...next(),
  {
    rules: {
      '@next/next/no-img-element': 'error',
    },
  },
];
