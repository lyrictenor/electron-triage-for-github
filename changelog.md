<a name="0.6.2"></a>
## [0.6.2](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.6.1...v0.6.2) (2015-11-01)

* Update app icon


<a name="0.6.1"></a>
## [0.6.1](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.6.0...v0.6.1) (2015-10-29)

* Add loading indicator


<a name="0.6.0"></a>
# [0.6.0](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.8...v0.6.0) (2015-10-29)

* Breaking change: add database suffix

### Features

* **database:** rename database ([be322f0](https://github.com/lyrictenor/electron-triage-for-github/commit/be322f0))



<a name="0.5.8"></a>
## [0.5.8](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.7...v0.5.8) (2015-10-26)

* Update dependencies


<a name="0.5.7"></a>
## [0.5.7](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.6...v0.5.7) (2015-10-23)


### Features

* **autopilot:** add force unlock button on debug page ([d9e7452](https://github.com/lyrictenor/electron-triage-for-github/commit/d9e7452))



<a name="0.5.6"></a>
## [0.5.6](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.5...v0.5.6) (2015-10-22)

* Update dependencies


<a name="0.5.5"></a>
## [0.5.5](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.4...v0.5.5) (2015-10-20)

* Fix material-ui version


<a name="0.5.4"></a>
## [0.5.4](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.3...v0.5.4) (2015-10-18)

* Add resources


<a name="0.5.3"></a>
## [0.5.3](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.2...v0.5.3) (2015-10-18)

* Update electron


<a name="0.5.2"></a>
## [0.5.2](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.1...v0.5.2) (2015-10-18)

* Support autopilot!


### Features

* **autopilot:** implement autopilot ([ec11907](https://github.com/lyrictenor/electron-triage-for-github/commit/ec11907))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.5.0...v0.5.1) (2015-10-17)


### Bug Fixes

* **autopilot:** prevent autopilot many times ([89907e2](https://github.com/lyrictenor/electron-triage-for-github/commit/89907e2))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.4.1...v0.5.0) (2015-10-16)

* Breaking change: change column interval -> autopilotInterval
* Add enableAutopilot checkbox
* Update storyUpdatedAt and autopilotedAt
* Lock by autopiloting
* Show storyUpdatedAt and autopilotedAt

### Bug Fixes

* **config:** not force to set autopilotedAt ([175b97b](https://github.com/lyrictenor/electron-triage-for-github/commit/175b97b))
* **setting:** material-ui's Checkbox does not work with redux-form ([708d66c](https://github.com/lyrictenor/electron-triage-for-github/commit/708d66c))

### Features

* **autopilot:** add storyUpdatedAt for indexeddb and store ([7099e74](https://github.com/lyrictenor/electron-triage-for-github/commit/7099e74))
* **autopilot:** change column interval -> autopilotInterval ([d54101b](https://github.com/lyrictenor/electron-triage-for-github/commit/d54101b))
* **autopilot:** check autopiloting ([134e2ef](https://github.com/lyrictenor/electron-triage-for-github/commit/134e2ef))
* **autopilot:** enable autopilot state ([590095b](https://github.com/lyrictenor/electron-triage-for-github/commit/590095b))
* **autopilot:** show storyUpdatedAt ([b720916](https://github.com/lyrictenor/electron-triage-for-github/commit/b720916))
* **autopilot:** update story updated at ([c257438](https://github.com/lyrictenor/electron-triage-for-github/commit/c257438))



<a name="0.4.1"></a>
## [0.4.1](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.4.0...v0.4.1) (2015-10-16)

* Update electron version



<a name="0.4.0"></a>
# [0.4.0](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.3.2...v0.4.0) (2015-10-15)

* Split settings into configs and appGlobal
* Remove setting reducer
* Breaking change: change indexeddb structure


### Features

* **appGlobal:** use appGlobal instead of setting ([1503f78](https://github.com/lyrictenor/electron-triage-for-github/commit/1503f78))
* **config:** use config instead of setting ([ce986a9](https://github.com/lyrictenor/electron-triage-for-github/commit/ce986a9))
* **configs:** add configs ([822d687](https://github.com/lyrictenor/electron-triage-for-github/commit/822d687))
* **configs:** treat dateish string as date ([669566d](https://github.com/lyrictenor/electron-triage-for-github/commit/669566d))



<a name="0.3.2"></a>
## [0.3.2](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.3.1...v0.3.2) (2015-10-14)

* Use material-ui


<a name="0.3.1"></a>
## [0.3.1](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.3.0...v0.3.1) (2015-10-11)

* Update electron version


<a name="0.3.0"></a>
# [0.3.0](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.2.0...v0.3.0) (2015-10-11)

* Use redux-form instead of formsy-react

### Features

* **setting:** implement with redux form ([c905c1e](https://github.com/lyrictenor/electron-triage-for-github/commit/c905c1e))
* **setting:** update api endpoint ([3685bf8](https://github.com/lyrictenor/electron-triage-for-github/commit/3685bf8))
* **setting:** update views ([3a42aef](https://github.com/lyrictenor/electron-triage-for-github/commit/3a42aef))
* **setting:** view update web endpoint ([c7c12c1](https://github.com/lyrictenor/electron-triage-for-github/commit/c7c12c1))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.8...v0.2.0) (2015-10-09)

* Use indexeddb instead of localstorage

### Features

* **setting:** use indexeddb instead of localstorage ([8446d8a](https://github.com/lyrictenor/electron-triage-for-github/commit/8446d8a))
* **setting:** use promise ([c50c968](https://github.com/lyrictenor/electron-triage-for-github/commit/c50c968))
* **settings:** use promise ([c5c1c9e](https://github.com/lyrictenor/electron-triage-for-github/commit/c5c1c9e))
* **settings:** use storage data always ([83d5251](https://github.com/lyrictenor/electron-triage-for-github/commit/83d5251))



<a name="0.1.8"></a>
## [0.1.8](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.7...v0.1.8) (2015-10-06)


### Features

* **merge:** merge implementation ([f029c33](https://github.com/lyrictenor/electron-triage-for-github/commit/f029c33))



<a name="0.1.7"></a>
## [0.1.7](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.6...v0.1.7) (2015-10-06)

* Fix deploying nodejs version


<a name="0.1.6"></a>
## [0.1.6](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.5...v0.1.6) (2015-10-04)

* Update dependencies

### Features

* **story:** implement close story ([3c4b498](https://github.com/lyrictenor/electron-triage-for-github/commit/3c4b498))
* **story:** reopen issue ([f846946](https://github.com/lyrictenor/electron-triage-for-github/commit/f846946))



<a name="0.1.5"></a>
## [0.1.5](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.4...v0.1.5) (2015-09-17)

* Update dependencies


<a name="0.1.4"></a>
## [0.1.4](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.3...v0.1.4) (2015-09-15)

* Reload issue
* Update electron to v0.32.3


### Features

* **fetch:** repos branches ([c806b80](https://github.com/lyrictenor/electron-triage-for-github/commit/c806b80))



<a name="0.1.3"></a>
## [0.1.3](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.2...v0.1.3) (2015-09-01)


### Features

* **story:** add merge button ([b434913](https://github.com/lyrictenor/electron-triage-for-github/commit/b434913))



<a name="0.1.2"></a>
## [0.1.2](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.1...v0.1.2) (2015-08-31)

* Update token rule


<a name="0.1.1"></a>
## [0.1.1](https://github.com/lyrictenor/electron-triage-for-github/compare/v0.1.0...v0.1.1) (2015-08-30)


### Bug Fixes

* **crypt:** fix logic ([2e76e3c](https://github.com/lyrictenor/electron-triage-for-github/commit/2e76e3c))

### Features

* **app:** use redux ([0a01495](https://github.com/lyrictenor/electron-triage-for-github/commit/0a01495))
* **autopilot:** trigger autopilot ([0604f1e](https://github.com/lyrictenor/electron-triage-for-github/commit/0604f1e))
* **connector:** use Connector instead of @connect ([37e6bb2](https://github.com/lyrictenor/electron-triage-for-github/commit/37e6bb2))
* **debug:** reset storage button in debug ([872385f](https://github.com/lyrictenor/electron-triage-for-github/commit/872385f))
* **devtools:** use redux-devtools ([9a6f8e4](https://github.com/lyrictenor/electron-triage-for-github/commit/9a6f8e4))
* **interval:** interval for autopilot ([c3606b0](https://github.com/lyrictenor/electron-triage-for-github/commit/c3606b0))
* **menubar:** use menubar and menubar-debug(electron-debug) ([effa97d](https://github.com/lyrictenor/electron-triage-for-github/commit/effa97d))
* **react-redux:** use react-redux style connect ([231d76a](https://github.com/lyrictenor/electron-triage-for-github/commit/231d76a))
* **router:** add props to routing element ([1564c65](https://github.com/lyrictenor/electron-triage-for-github/commit/1564c65))
* **router:** use redux-react-router ([e36f65b](https://github.com/lyrictenor/electron-triage-for-github/commit/e36f65b))
* **router:** use router ([33662c0](https://github.com/lyrictenor/electron-triage-for-github/commit/33662c0))
* **setting:** actually update action ([9dcb6b8](https://github.com/lyrictenor/electron-triage-for-github/commit/9dcb6b8))
* **setting:** add setting ([7a00a25](https://github.com/lyrictenor/electron-triage-for-github/commit/7a00a25))
* **setting:** prevent casual copy ([36292bc](https://github.com/lyrictenor/electron-triage-for-github/commit/36292bc))
* **setting:** prevent casual copy about token ([e53c447](https://github.com/lyrictenor/electron-triage-for-github/commit/e53c447))
* **setting:** save setting as async ([71a8a37](https://github.com/lyrictenor/electron-triage-for-github/commit/71a8a37))
* **storage:** use local storage ([4c557bd](https://github.com/lyrictenor/electron-triage-for-github/commit/4c557bd))
* **story:** add link to html ([549205f](https://github.com/lyrictenor/electron-triage-for-github/commit/549205f))
* **story:** fetch stories ([ddee078](https://github.com/lyrictenor/electron-triage-for-github/commit/ddee078))



<a name="0.1.0"></a>
# 0.1.0 (2015-07-25)

* Build webpack boilerplate
