# Triage for GitHub

[![Travis-CI Status][travis-image]][travis-url] [![Appveyor Status][appveyor-image]][appveyor-url] [![Daviddm Status][daviddm-image]][daviddm-url]

> Desktop app for dividing GitHub issues and pull requests into go or no-go quickly.

![Triage for GitHub](./pages/triage-for-github2.gif)

Enable to classify a lot of issues and pull requests.


## Motivation

We can use an ecosystem with GitHub - CI, coverage and pull requests.

E.g.

* [Dependency Update as a Service - Tachikoma.io](http://tachikoma.io/)
* [greenkeeper](http://greenkeeper.io/)
* [deppbot - Automated Dependency Updates](https://www.deppbot.com/)

(Use tachikoma.io, please!)

But too many pull requests bother us.

![Too many pull requests](./pages/too-many-pull-requests.gif)

Especially build app by empty pull request like ping, we want to close pull
request quickly after confirming CI 'success'.


### Plan A: `/pulls`

See: https://github.com/pulls

![github pulls](./pages/github-pulls.gif)

to what we want. But we should click a pull request, open a
pull request page, click close button, close pull request page, click a pull
request, ...
It's too much.


### Plan B: Triage for GitHub

That is where "Triage for GitHub" comes in.
We can triage GitHub issues and pull requests.
We can also "Jump" to details with GitHub UI.


## How to use


### Set up

Download [Latest release](https://github.com/lyrictenor/electron-triage-for-github/releases/latest) for your own environment.

![settings](./pages/settings.gif)

Set GitHub personal token, scope `repo` or `public_repo`.

### Experimental: Autopilot

Set autopilot on, then you get interval autopilot.

If your autopilot hang up, move to debug pane and execute force unlock.


### Details

There is details about an issue and a pull request with "v" icon.

![show details](./pages/show-details.gif)




## Changelog

[changelog.md](./changelog.md).


## License

MIT © [sanemat](http://sane.jp)


## Credit

App icon made by [Freepik](http://www.freepik.com) from [www.flaticon.com](http://www.flaticon.com) is licensed under [CC BY 3.0](http://creativecommons.org/licenses/by/3.0/)


[travis-url]: https://travis-ci.org/lyrictenor/electron-triage-for-github
[travis-image]: https://img.shields.io/travis/lyrictenor/electron-triage-for-github/master.svg?style=flat-square&label=travis
[appveyor-url]: https://ci.appveyor.com/project/sanemat/electron-triage-for-github/branch/master
[appveyor-image]: https://img.shields.io/appveyor/ci/sanemat/electron-triage-for-github/master.svg?style=flat-square&label=appveyor
[daviddm-url]: https://david-dm.org/lyrictenor/electron-triage-for-github
[daviddm-image]: https://img.shields.io/david/lyrictenor/electron-triage-for-github.svg?style=flat-square
