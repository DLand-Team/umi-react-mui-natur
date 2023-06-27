# Development Guide

## Table of Contents

1. [Directory Explanation](#directory-explanation)
1. [Supplementary components](#supplementary-components)
1. [Supplementary feature](#supplementary-feature)
1. [Open Source Library Description](#open-source-library-description)

## Installing Dependencies

```bash
npm i
# or
yarn
```

## Starting the Project

```bash
npm run dev
# or
yarn dev
```

## Deployment

### Building

```bash
npm run build
# or
yarn build

```

## Directory Explanation

1. `/page` - Stores pages.
1. `/components` - Stores components.
1. `/constants` - Stores constants and enumerations.
1. `/plugins` - Stores plugins and library-related files.
1. `/utils` - Stores utility methods.
1. `/assets` - Stores static resources.
1. `/http` - Stores HTTP-related files such as request entry points, request hooks, file uploads, image transfers, etc.
1. `global.scss` - Stores global styles.
1. `app.tsx` - Runtime configuration, details can be found in the Umi documentation.

## Supplementary components

1. [x] Form, based on Formik
1. [x] Table, based on rc-table
1. [x] Cascader
1. [x] Date Range Picker
1. [x] MarkdownRender
1. [x] CodeRender
1. [x] Loading
1. [x] Confirm Modal
1. [x] Alert Message

## Supplementary feature

1. [x] Integrated natur state management, ready to use out of the box.
1. [x] Integrated permission functionality, ready to use out of the box.
1. [x] Integrated global loading and message prompt, ready to use out of the box.
1. [x] Integrated login verification logic.
1. [x] Provided a pre-configured axios request library, ready to use out of the box.

## Open Source Library Description

1. UI library [mui](https://mui.com/)
1. State management [natur](https://www.npmjs.com/package/natur)
1. Event management [rxjs](https://rxjs.dev/guide/overview)
1. Basic utility functions [lodash](https://www.npmjs.com/package/lodash)
1. Form validation component [formik](https://www.npmjs.com/package/formik)
1. Data validation tool [yup](https://www.npmjs.com/package/yup)
1. URL utility [qs](https://www.npmjs.com/package/qs)
1. Calculation library [decimal.js](https://www.npmjs.com/package/decimal.js)
1. Color processing library [color](https://www.npmjs.com/package/color)
1. Date and time processing library [dayjs](https://www.npmjs.com/package/dayjs)
