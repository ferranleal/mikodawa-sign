import js from "@eslint/js";
import globals from "globals";
import hooks from "eslint-plugin-react-hooks";
import ts from "typescript-eslint";
export default ts.config(
  { ignores: ["dist", "node_modules"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...ts.configs.recommended],
    languageOptions: { globals: globals.browser },
    plugins: { "react-hooks": hooks },
    rules: hooks.configs.recommended.rules,
  },
);
