import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import gb from "eslint-plugin-gb";
import perfectionist from "eslint-plugin-perfectionist";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import path from "node:path";
import tseslint from "typescript-eslint";

import svelteConfig from "./svelte.config.js";

const gitignorePath = path.resolve(import.meta.dirname, ".gitignore");

/** @type {import('eslint').Linter.Config[]} */ export default [
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  // @typescript-eslint plugin required by eslint-plugin-gb's recommended config
  { plugins: { "@typescript-eslint": tseslint.plugin } },
  gb.configs.recommended,
  perfectionist.configs["recommended-natural"],
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  {
    files: ["**/*.svelte", "**/*.svelte.js"],
    languageOptions: { parserOptions: { svelteConfig } },
  },
];
