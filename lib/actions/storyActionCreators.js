// import {
//   UPDATE_STORY,
// } from '../constants/ActionTypes';
import {
  getConfigAll,
  bulkSetConfig,
  setConfig,
  getConfig,
} from '../utils/configs';
import {
  updateAppGlobal,
} from './settingActionCreators';
import {
  DuplicateAutopilotError,
} from '../utils/errors';
import {
  fetchIssues,
} from '../utils/stories';

export function fetchStories() {
  return (dispatch) => {
    let configs;
    getConfig('autopiloting')
      .then((autopilotingValue) => {
        if (autopilotingValue) {
          return Promise.reject(new DuplicateAutopilotError('Now autopiloting.'));
        }
        return setConfig('autopiloting', true);
      }).then(() => {
        return getConfigAll();
      }).then((value) => {
        configs = value;
        dispatch(updateAppGlobal(configs));
        return fetchIssues(configs);
      }).then((value) => {
        console.log(value);// eslint-disable-line no-console
      }).then(() => {
        // FIXME: avoid using new Date() directly
        return bulkSetConfig(new Map([
          ['storyUpdatedAt', new Date()],
          ['autopilotedAt', new Date()],
        ]));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
        return Promise.resolve(error);
      }).then((value) => {
        if (!(value instanceof DuplicateAutopilotError)) {
          return setConfig('autopiloting', false);
        }
      }).then(() => {
        return getConfigAll();
      }).then((value) => {
        configs = value;
        dispatch(updateAppGlobal(configs));
      }).catch((error) => {
        console.error(error);// eslint-disable-line no-console
      });
  };
}
