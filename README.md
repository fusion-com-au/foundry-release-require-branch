# foundry-release-require-branch

Forces releases to happen on a specific branch.

## Install

```bash
npm i foundry-release-require-branch --save-dev
```

## Usage

In your `package.json`:

```json

...

"foundry": {
    "releaseCommands": [
        ...
        {
            "type": "releaseCommand",
            "command": "foundry-release-require-branch",
            "options": {
                "branchName": "master"
            }
        },
        ...
    ]
}
...
```

Where `options.branchName` is the name of the branch you require before a foundry continues past the `foundry-release-require-branch` step.

Without `options`, it defaults to `options.branchName === 'master'`
