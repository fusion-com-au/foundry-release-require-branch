var SemVer = require('semver').SemVer;
var Exec = require('child_process').execFileSync
var Slug = require('slug');
var Config = require('nconf');

var GitBranch = function () {
    return Slug(Exec('git', ['rev-parse', '--abbrev-ref', 'HEAD']).toString());
}

var commands = Config.env({
            separator: '_',
            match: /^npm_package_foundry.*/
        })
        .get('npm:package:foundry:releaseCommands'),
    index = Object.keys(commands)
        .find( function (index) {
            var item = commands[index]
            return (typeof item === 'string' && item === 'foundry-release-require-branch')
                || (item.type === 'releaseCommand' && item.command === 'foundry-release-require-branch');
        }),
    options = index && commands[index].options || { branchName: 'master' };


exports.updateFiles = function (params, cb) {
    var currentBranch = GitBranch(),
        err;

    console.log('requireGitBranchCommand.updateFiles', 'required:', options.branchName, 'current:', currentBranch);

    if (currentBranch !== options.branchName) {
        cb('Required branch ' + options.branchName+ ', instead found: ' + currentBranch + '. ');
    } else {
        process.nextTick(cb);
    }


};
