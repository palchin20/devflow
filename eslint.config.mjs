import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    'next/core-web-vitals',
    'next/typescript',
    'plugin:tailwindcss/recommended',
    'prettier'
  ),
  ...compat.plugins(['import']),
];

export default eslintConfig;

// OLD code

// import path from 'node:path';
// import { fileURLToPath } from 'node:url';

// import { FlatCompat } from '@eslint/eslintrc';
// import js from '@eslint/js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
//   recommendedConfig: js.configs.recommended,
//   allConfig: js.configs.all,
// });

// const config = [
//   {
//     ignores: ['components/ui/**/*'],
//   },
//   ...compat.extends(
//     'next/core-web-vitals',
//     'next/typescript',

//     'plugin:tailwindcss/recommended',
//     'prettier'
//   ),
//   {
//     rules: {
//       'import/order': [
//         'error',
//         {
//           groups: [
//             'builtin',
//             'external',
//             'internal',
//             ['parent', 'sibling'],
//             'index',
//             'object',
//           ],

//           'newlines-between': 'always',

//           pathGroups: [
//             {
//               pattern: '@app/**',
//               group: 'external',
//               position: 'after',
//             },
//           ],

//           pathGroupsExcludedImportTypes: ['builtin'],

//           alphabetize: {
//             order: 'asc',
//             caseInsensitive: true,
//           },
//         },
//       ],
//       'comma-dangle': 'off',
//     },
//   },
//   {
//     files: ['**/*.ts', '**/*.tsx'],

//     rules: {
//       'no-undef': 'off',
//     },
//   },
// ];

// export default config;
