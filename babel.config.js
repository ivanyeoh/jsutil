const presets = [
  [
    "@babel/env",
    {
      targets: {
        chrome: "77",
      },
      modules: 'auto',
      useBuiltIns: "usage",
    },
  ],
];

module.exports = { presets };
