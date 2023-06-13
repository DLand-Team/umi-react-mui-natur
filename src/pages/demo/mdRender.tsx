import MarkdownRender from "@/components/MarkdownRender"
import { Box } from "@mui/material"


const code = `# Development Guide


## Table of Contents

1. [Directory Explanation](#directory-explanation)
1. [Open Source Library Description](#open-source-library-description)


## Installing Dependencies


\`\`\`bash
npm i
# or
yarn
\`\`\`

## Starting the Project

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

## Deployment


### Building
\`\`\`bash
npm run build
# or
yarn build

\`\`\`

## Directory Explanation

1. \`/page\` - Stores pages.
1. \`/components\` - Stores components.
1. \`/constants\` - Stores constants and enumerations.
1. \`/plugins\` - Stores plugins and library-related files.
1. \`/utils\` - Stores utility methods.
1. \`/assets\` - Stores static resources.
1. \`/http\` - Stores HTTP-related files such as request entry points, request hooks, file uploads, image transfers, etc.
1. \`global.scss\` - Stores global styles.
1. \`app.tsx\` - Runtime configuration, details can be found in the Umi documentation.


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
`

export const MDRenderDemo = () => {
	return (
		<Box>
			<h1>Markdown Render</h1>
			<MarkdownRender showLineNumber text={code} />
		</Box>
	)
}	