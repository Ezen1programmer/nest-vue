# Jenkins Setup

-   https://www.jenkins.io/solutions/github/

```shell
brew install jenkins
yarn jenkins
```

(Change port for Jenkins in `package.json` script: `jenkins --httpPort=9999 --httpListenAddress=127.0.0.1`)

Initial setup will run in terminal and provide an initial admin password. Navigate to //localhost:9999/.

Click Install Recommended Plugins, which includes Pipeline.

Install NodeJS plugin: see https://stackoverflow.com/questions/51531027/how-to-enable-yarn-for-jenkinsfile-pipeline-syntax

Add new project, select Pipeline.

Configure.
