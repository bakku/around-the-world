import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    ignores: ["src/components/ui/**/*", "src/lib/utils.ts"],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      ...pluginVue.configs["flat/recommended"],
    ],
    plugins: {
      "@stylistic": stylistic,
    },
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      "prefer-const": "error",

      // Stylistic (https://eslint.style/rules)
      "@stylistic/array-bracket-newline": ["error", "consistent"],
      "@stylistic/array-bracket-spacing": ["error", "never"],
      "@stylistic/array-element-newline": ["error", "consistent"],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/brace-style": ["error", "1tbs"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/comma-style": ["error", "last"],
      "@stylistic/computed-property-spacing": ["error", "never"],
      "@stylistic/curly-newline": ["error", "always"],
      "@stylistic/dot-location": ["error", "object"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/function-paren-newline": ["error", "consistent"],
      "@stylistic/generator-star-spacing": ["error", { before: true, after: false }],
      "@stylistic/implicit-arrow-linebreak": ["error", "beside"],
      "@stylistic/indent": ["error", 2],
      "@stylistic/indent-binary-ops": ["error", 2],
      "@stylistic/key-spacing": ["error", { beforeColon: false, afterColon: true, mode: "strict" }],
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/line-comment-position": "off",
      "@stylistic/linebreak-style": ["error", "unix"],
      "@stylistic/lines-around-comment": "off",
      "@stylistic/lines-between-class-members": ["error", "always"],
      "@stylistic/max-len": "off",
      "@stylistic/max-statements-per-line": ["error", { max: 1 }],
      "@stylistic/member-delimiter-style": ["error", {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
        multilineDetection: "brackets",
      }],
      "@stylistic/multiline-comment-style": ["error", "separate-lines"],
      "@stylistic/multiline-ternary": ["error", "always-multiline"],
      "@stylistic/new-parens": ["error", "always"],
      "@stylistic/newline-per-chained-call": "off",
      "@stylistic/no-confusing-arrow": "error",
      "@stylistic/no-extra-parens": "off",
      "@stylistic/no-extra-semi": "error",
      "@stylistic/no-floating-decimal": "off",
      "@stylistic/no-mixed-operators": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1 }],
      "@stylistic/no-tabs": "error",
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/nonblock-statement-body-position": "off",
      "@stylistic/object-curly-newline": ["error", { consistent: true }],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": ["error", { allowAllPropertiesOnSameLine: true }],
      "@stylistic/one-var-declaration-per-line": "off",
      "@stylistic/operator-linebreak": ["error", "after"],
      "@stylistic/padded-blocks": "off",
      "@stylistic/padding-line-between-statements": "off",
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
      "@stylistic/rest-spread-spacing": ["error", "never"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/semi-spacing": ["error", { before: false, after: true }],
      "@stylistic/semi-style": ["error", "last"],
      "@stylistic/space-before-blocks": ["error", "always"],
      "@stylistic/space-before-function-paren": ["error", "never"],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": "error",
      "@stylistic/spaced-comment": ["error", "always"],
      "@stylistic/switch-colon-spacing": "error",
      "@stylistic/template-curly-spacing": "error",
      "@stylistic/template-tag-spacing": "error",
      "@stylistic/type-annotation-spacing": "error",
      "@stylistic/type-generic-spacing": ["error"],
      "@stylistic/type-named-tuple-spacing": ["error"],
      "@stylistic/wrap-iife": ["error", "outside"],
      "@stylistic/wrap-regex": "off",
      "@stylistic/yield-star-spacing": ["error", "before"],
    },
  },
]);
