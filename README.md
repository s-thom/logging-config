# logging-config

More configurable logging for Javascript/Typescript. Maybe it's useful to you, maybe it's not.

This project uses [lerna](https://github.com/lerna/lerna) to handle multiple node projects in one repository. It's also my first time using the tool, so if there's anything I'm doing wrong, let me know.

## General idea

Really, what I want out of this project is configurable log levels, changeable by something like an environment variable, so I can have more logging while developing, but reduce log bloat in production Node.js apps and hide things from users in the browser.

I also want it to be uncomplicated. I think I've failed on that one.

## Packages

- [@sthom/logging-config](https://github.com/s-thom/logging-config/tree/master/packages/logging-config)
- [@sthom/logging-config-react](https://github.com/s-thom/logging-config/tree/master/packages/logging-config-react)
