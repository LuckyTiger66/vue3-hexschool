module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  plugins: ["prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error", // 把prettier的錯誤顯示出來
    // 以下為有關airbnb style的自訂設定
    "func-names": "off", // 閉關匿名函式會報錯的規則
    "no-unused-vars": "warn", // 把no-unused-vars相關的錯誤以警告顯示
    "no-console": "off", // 閉關使用console.log會跳警告的規則
  },
};
