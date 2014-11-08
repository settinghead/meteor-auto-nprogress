Package.describe({
  "name": "settinghead:auto-nprogress",
  "summary": "A Meteor package that automatically shows a NProgress.js bar during DDP data exchanges.",
  "version": "1.0.0",
  "git": "https://github.com/settinghead/meteor-auto-nprogress.git"
});

Package.on_use(function (api) {
    api.use('mrt:nprogress@0.1.0');
    api.add_files('auto-nprogress.js', 'client');
});

Package.on_test(function (api) {
  api.use(["tinytest", "test-helpers", "mrt:nprogress@0.1.0"], "client");
  api.add_files('tests/auto-nprogress-test.js', ['client', 'server'] );
  api.add_files('auto-nprogress.js', 'client');
});
