# npm-docker-scripts

[![npm](https://img.shields.io/npm/v/@mashupmill/docker-scripts.svg?style=for-the-badge)](https://www.npmjs.com/package/@mashupmill/docker-scripts)
[![npm](https://img.shields.io/npm/dm/@mashupmill/docker-scripts.svg?style=for-the-badge)](https://npmjs.org/package/@mashupmill/docker-scripts)
[![GitHub issues](https://img.shields.io/github/issues-raw/MashupMill/npm-docker-scripts.svg?style=for-the-badge)](https://github.com/MashupMill/npm-docker-scripts/issues)

[![Travis](https://img.shields.io/travis/MashupMill/npm-docker-scripts.svg?style=for-the-badge)](https://travis-ci.org/MashupMill/npm-docker-scripts)
[![Coveralls github](https://img.shields.io/coveralls/github/MashupMill/npm-docker-scripts.svg?style=for-the-badge)](https://coveralls.io/github/MashupMill/npm-docker-scripts)
[![David](https://img.shields.io/david/MashupMill/npm-docker-scripts.svg?style=for-the-badge)](https://david-dm.org/MashupMill/npm-docker-scripts)

Docker scripts for npm projects to allow building and push docker images as part of an npm build

## Usage

Update your `package.json` with to something like this:

```json
{
  "scripts": {
    "prepublishOnly": "mashupmill-docker-scripts build",
    "publish": "mashupmill-docker-scripts push"
  },
  "dockerConfig": {
      "registry": "docker.my-company.com",
      "image": "my-docker-image-name",
      "tag": ["latest"],
      "tagBranch": true,
      "tagVersion": true
    }
}
```

If you need to authenticate with your docker registry you can either have your build system inject `DOCKER_USERNAME` and `DOCKER_PASSWORD` environment variables or (not recommended) put your `username` and `password` in the `dockerConfig` object in your `package.json` 

