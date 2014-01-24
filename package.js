Package.on_use(function (api) {
    api.use('nprogress');
    api.add_files('auto-nprogress.js', 'client'); // Or 'client', or ['server', 'client']
});
