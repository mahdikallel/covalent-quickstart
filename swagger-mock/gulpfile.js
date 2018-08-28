var gulp = require('gulp');
var shell = require('gulp-shell');
var util = require('gulp-util');

var runSequence = require('run-sequence');

function swaggerCodegen() {
    return gulp.src(['./'])
        .pipe(shell(['node codeGen.js']));
}

gulp.task('swaggerCodegen', function () {
    return swaggerCodegen();
});

//git tasks
function prepare(branch) {
    // get all the files to bump version in
    return gulp.src(['./'])
    // bump the version number in those files
        .pipe(shell(['git config --local credential.helper store', 'git checkout ' + branch]))
        // save it back to filesystem
        .pipe(gulp.dest('./'));
}
gulp.task('gitPrepare', function () {
    return prepare(util.env.branch);
});

gulp.task('gitAdd', shell.task([
    'git add -A'
]));

function pushToGit(remote, branch) {
    // get all the files to bump version in
    return gulp.src(['./'])
    // bump the version number in those files
        .pipe(shell('git push ' + remote + ' ' + branch))
        // save it back to filesystem
        .pipe(gulp.dest('./'));
}

gulp.task('gitCommitWithMessage', function () {
    return gitCommit(util.env.message);
});

function gitCommit(message) {
    return gulp.src(['./'])
        .pipe(shell(['git commit -m "' + message + '"']))
        .pipe(gulp.dest('./'));
}

gulp.task('gitUpdateRepository', function (callback) {
    runSequence('gitAdd',
        'gitCommitWithMessage',
        function (err) {
            //if any error happened in the previous tasks, exit with a code > 0
            if (err) {
                var exitCode = 2;
                console.log('[ERROR] gulp build task failed', err);
                console.log('[FAIL] gulp build task failed - exiting with code ' + exitCode);
                return process.exit(exitCode);
            }
            else {
                return pushToGit(util.env.remote, util.env.branch);
            }
        }
    );
});


