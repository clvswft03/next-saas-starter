module.exports = {
  '*': 'yarn ci',
  '*.{css,html,js,json,jsx,md,scss,ts,tsx,yaml,yml}': 'yarn format',
  '*.{js,jsx,ts,tsx}': 'yarn lint',
};
