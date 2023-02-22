import type { Config} from 'umi/test';
import { configUmiAlias, createConfig } from 'umi/test';
 
export default async () => {
  const res = (await configUmiAlias({
    ...createConfig({
      target: 'browser',
      jsTransformer: 'esbuild',
      jsTransformerOpts: { jsx: 'automatic' },
    }),
    // 覆盖 umi 的默认 jest 配置, 如
    // displayName: "Umi jest",
  })) as Config.InitialOptions;
	return {
		...res,
		testMatch: [ ...(res.testMatch || []), '**/__tests__/**/*.ts(x)?' ],
		testEnvironment: 'jest-environment-jsdom',
	}
};