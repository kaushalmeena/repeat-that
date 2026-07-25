// Metro has its own default, but Jest needs a babel config on disk to transform
// TypeScript, so this file exists for the test run.
module.exports = (api) => {
  api.cache(true);
  return { presets: ["babel-preset-expo"] };
};
