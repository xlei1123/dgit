# Dgit

<!-- [![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/:packageName.svg?style=flat-square
[npm-url]: https://npmjs.org/package/:packageName
[travis-image]: https://www.travis-ci.org/xlei1123/:packageName.svg
[travis-url]: https://travis-ci.org/xlei1123/:packageName
[codecov-image]: https://codecov.io/gh/xlei1123/:packageName/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/xlei1123/:packageName
[snyk-image]: https://snyk.io/test/github/xlei1123/:packageName/badge.svg?targetFile=package.json
[snyk-url]: https://snyk.io/test/github/xlei1123/:packageName?targetFile=package.json
[download-image]: https://img.shields.io/npm/dm/:packageName.svg?style=flat-square
[download-url]: https://npmjs.org/package/:packageName -->

- [English](README.en_US.md)
- [简体中文](README.md)

> Dgit is a portable tool for downloading the specified directory or file of GitHub Repo. It can be used as a command line for global installation on the terminal, or as a node module. This tool does not rely on the local git, can directly download the specified directory file, reduce the traffic consumption, and is very suitable for scenarios where you want to download large projects, and can directly download the content you need.

- [Install](#install)
- [Usage](#usage)
- [Configuration](#configuration)
- [TIPS](#tips)
- [Example](#example)
- [Changelog](#changelog)
- [Questions](#questions)
- [License](#license)

## Install
+ Global Installation
```bash
$ npm install @limu-x/dgit -g
```
+ Local Installation
```bash
$ npm install @limu-x/dgit --save
$ yarn add @limu-x/dgit
```

## Usage
+ Global installation, using as command line
```bash
$ dgit d https://github.com/xlei1123/limu-ele-pro/tree/master/src -d ./abc
```

+ Local installation as module
```js
import dgit from '@limu-x/dgit';

(async () => {
    await dgit(
        {
            owner: 'xlei1123',
            repoName: 'limu-ele-pro',
            ref: 'master',
            relativePath: 'src',
        },
        './aaa',
    );
    console.log('download succeed');
})()
```


## Configuration
+ Global installation, used as command line, configurable parameters
     - Commands:
        * download|d [options] [githubLink]  Download the specified files of the specified repo or all files under the specified directory
    - Options:
        * --owner <ownerName>             Git repository author name
        * --repo-name <repoName>          Git repo name
        * --ref <refName>                 Git repo branch，commit hash or tagname
        * --relative-path <relativePath>  Specifies the relative location of the directory or file that git needs to download. default: '.'
        * -d, --dest <destPath>           Specify the file output directory, either absolute path or relative path of the current terminal execution path
        * -l, --parallel-limit, <number>  Specify the number of concurrent downloads，default: 10.
        * -u, --username, <username>      Specify git account name, configuration parameters required when downloading private repo.
        * -p --password, <password>       Specify the git account password, which is used with username, and the configuration parameters required when downloading the private repo.
        * -t --token, <token>             Git token is another configurable parameter of login mode, which is used to download private repo.
        * -e --exclude, <relativePath,...,relativePath>  Specifies the collection of files or directory paths that need to be excluded for the current download directory.
        * -i --include, <relativePath,...,relativePath>  Specifies the collection of files or directories that need to be included again in the currently excluded file path collection.
        * -h, --help                      Output usage information

+ Local installation, configurable parameters when used as a module   
    ```js
    import dgit from '@limu-x/dgit';
    import path from 'path';
    const repoOption = {
        owner: 'xlei1123'; // Git repository author name
        repoName: 'limu-ele-pro'; // Git repo name
        ref: 'master'; // Git repo branch，commit hash or tagname，
        relativePath: '.'; // Specifies the relative location of the directory or file that git needs to download
        username: ''; // Specify git account name.
        password: ''; // Specify the git account password.
        token: ''; // Git token is another configurable parameter of login mode.
    }

    const githubLinkOption = {
        githubLink: 'https://github.com/xlei1123/limu-ele-pro/blob/master/package.json',
        // You can also directly specify the download path address of gitHub
    }

    const destPath = path.resolve(__dirname, './aaa'); // Specify the file output directory

    const dgitOptions = {
        maxRetryCount: 3, // The maximum number of attempts to download again when the download fails due to network problems
        parallelLimit: 10, // Number of parallel downloads
        log: false, // Open internal log
        logSuffix: '', // Log output prefix
        exclude: [], // excluded paths,
        include: [], // include paths
    }

    const hooks = {
        onSuccess: () => void,
        onError: (err) => err,
        onProgress: (status, node) => void,
        onResolved: (status) => void,
    }


    (async () => {
        await dgit(
            repoOption,
            destPath,
            dgitOptions,
            hooks,
        );
        console.log('repoOption download succeed.');

        await dgit(
            githubLinkOption,
            destPath,
            dgitOptions,
            hooks,
        );
        console.log('githubLinkOption download succeed.');
    })()
    ``` 

## TIPS
When downloading the private repo, you need to provide download permission. At this time, you need to pass in additional parameters in two ways
+ Basic authentication 

    Download permission is provided by passing in user name and password. When passing in user name, password can not be provided explicitly. When password is not provided, password input option will appear password prompt;
    ```bash
    $ dgit d https://github.com/xlei1123/limu-ele-pro/tree/master/src -d ./abc -u xlei1123
    ```
+ OAuth2 token

    Token is another way of authority authentication provided by GitHub.

    Set the token method, which is located in Github Settings -> Developer settings -> Personal access tokens

    ```bash
    $ dgit d https://github.com/xlei1123/limu-ele-pro/tree/master/src -d ./abc -t OAUTH-TOKEN
    ```

## Changelog
Detailed changes for each release are documented in the [release notes](https://github.com/xlei1123/dgit/releases)

## Questions
Please open an issue [here](https://github.com/xlei1123/dgit/issues).

## License

[MIT](LICENSE)
