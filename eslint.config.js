import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      react: reactPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // TypeScript rules
      "@typescript-eslint/no-non-null-assertion": "off", // Allows `!` for non-null assertions
      "@typescript-eslint/explicit-module-boundary-types": "off", // No need to specify return types
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // Warn unused vars but allow _args
      "@typescript-eslint/no-explicit-any": "error", //  Disallow usage of `any`

      // React
      "react/prop-types": "off", // Not needed with TypeScript
      "react/jsx-one-expression-per-line": "off", // Allows multiple expressions in one line
      "react/function-component-definition": "off", // No enforcement on function component style
      "react/jsx-props-no-spreading": "off", // Allows prop spreading (`<Comp {...props} />`)
      "react/button-has-type": "off", // Doesn't require type="button" on <button>
      "react/react-in-jsx-scope": "off", // No need to import React
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/no-array-index-key": "error", // Avoid using index as key in list rendering
      "react/self-closing-comp": "error", // Prefer self-closing tags like <Comp />

      // React Hooks
      "react-hooks/rules-of-hooks": "error", // Enforces hooks rules (must be called in top-level of React functions)
      "react-hooks/exhaustive-deps": "error", // Turns off exhaustive deps check in hooks (may be too strict)

      // General JS/Formatting
      "arrow-body-style": "off", // Allows flexibility in using arrow functions
      "linebreak-style": "off", // Avoids issues with Windows vs Unix line endings
      "no-unused-vars": "error", // Warns about unused variables
      "no-spaced-func": "error", // Disallows space between function name and invocation (`func ()`)
      "no-trailing-spaces": "error", // Disallows trailing whitespace at end of lines
      "no-console": "error", // Disallows usage of `console.log` and `console.error`,
      "max-len": ["error", { code: 100 }],

      // Import rules
      "import/prefer-default-export": "off", // Allows named exports without requiring default
      "import/no-unresolved": "off", // TODO: Consider enabling later for catching unresolved paths
      "import/extensions": "off", // Allows importing without specifying file extensions

      // Code Consistency & Readability
      "object-shorthand": ["error", "always"], // Enforce shorthand syntax { a } instead of { a: a }
      "prefer-const": "error", // Use const when variables are never reassigned
      "no-multiple-empty-lines": ["error", { max: 1 }], // Avoid vertical clutter
      "spaced-comment": ["error", "always"], // Enforce space after `//` in comments,
    },
  }
);
