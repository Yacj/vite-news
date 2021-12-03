import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import postcssViewport from 'postcss-px-to-viewport'
import Components from 'unplugin-vue-components/vite'
import {
    VantResolver,
} from 'unplugin-vue-components/resolvers'
import styleImport, {
    VantResolve,
} from 'vite-plugin-style-import'

const path = require('path')


// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '/@/': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        vue(),
        Components({
            // ui库解析器，也可以自定义
            resolvers: [
                VantResolver(),
            ]
        }),
        styleImport({
            resolves: [
                VantResolve(),
            ],
            // 自定义规则
            libs: [
                {
                    libraryName: 'vant',
                    esModule: true,
                    resolveStyle: (name) => `vant/es/${name}/style`,
                },
            ],
        })
    ],
    server:{
        host: '0.0.0.0',
    },
    css: {
        postcss: {
            plugins: [
                postcssViewport({
                    viewportWidth: 375,
                    unitPrecision: 6,
                    unitToConvert: 'px',
                    propList: ['*'],
                })
            ]
        },
        preprocessorOptions: {
            scss: {
                additionalData: '@import "./src/css/variables.scss";',
            },
        },
    },
})
