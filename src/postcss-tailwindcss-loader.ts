
import type { LoadContext, Plugin, PostCssOptions } from '@docusaurus/types';

export default function plugin(
    context: LoadContext,
    options: any,
): Plugin {
    return {
        name: 'postcss-tailwindcss-loader',
        // postcss-tailwindcss-loader.ts
        configurePostCss(postcssOptions) {
            postcssOptions.plugins = [
                require('@tailwindcss/postcss')({
                    // 可选的 Tailwind 配置
                    config: './tailwind.config.js'
                }),
                require('autoprefixer'),
            ];
            return postcssOptions;
        },
    };
}