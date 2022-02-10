<?php

namespace Deployer;

require 'recipe/laravel.php';
require 'recipe/yarn.php';

set('bin/npm', function () {
    return run('which npm');
});

desc('Run Laravel Mix to create assets');
task('mix:production', function () {
    run("cd {{release_path}} && {{bin/npm}} run production");
});

// Project name
set('application', 'touchstonetracker.app');

// Project repository
set('repository', 'git@github.com:suxur/touchstone-tracker-web.git');

// [Optional] Allocate tty for git clone. Default value is false.
set('git_tty', true);

// Shared files/dirs between deploys
add('shared_files', []);
add('shared_dirs', []);
// Writable dirs by web server
add('writable_dirs', []);

set('http_user', 'suxur');
set('http_group', 'www-data');
set('writable_mode', 'chmod');
set('writable_chmod_mode', '0777');

set('ssh_multiplexing', true);

set('allow_anonymous_stats', false);

// Hosts
host('138.68.27.217')
    ->user('suxur')
    ->set('deploy_path', '/var/www/touchstonetracker.app');

// Tasks
task('build', function () {
    run('cd {{release_path}} && build');
});

// [Optional] if deploy fails automatically unlock.
after('deploy:failed', 'deploy:unlock');

// Migrate database before symlink new release.
before('deploy:symlink', 'artisan:migrate');

task('reload:php-fpm', function () {
    run('sudo /usr/sbin/service php7.4-fpm reload');
});

after('artisan:migrate', 'yarn:install');
after('yarn:install', 'mix:production');
after('deploy', 'reload:php-fpm');
