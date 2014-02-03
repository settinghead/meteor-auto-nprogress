Package.on_use(function (api) {
    api.use('nprogress');
    api.add_files('auto-nprogress.js', 'client');
});

Package.on_test(function (api) {
  api.use(["tinytest", "test-helpers", "nprogress"], "client");
  api.add_files('tests/auto-nprogress-test.js', ['client', 'server'] );
  api.add_files('auto-nprogress.js', 'client');
});