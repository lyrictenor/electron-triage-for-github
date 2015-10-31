import {
  UPDATE_STORY,
} from '../constants/ActionTypes';
import {
  isArray,
} from 'lodash';

function issuesById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Map' ?
    if (action.payload.issuesById) {
      return new Map([...state, ...action.payload.issuesById]);
    }
    return state;
  default:
    return state;
  }
}

function issues(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Set' ?
    if (action.payload.issues) {
      return new Set([...state, ...action.payload.issues]);
    }
    return state;
  default:
    return state;
  }
}

function issuesOrdered(state = [], action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    if (action.payload.issuesOrdered && isArray(action.payload.issuesOrdered)) {
      const newState = Array.from(state);
      for (const issueId of action.payload.issuesOrdered) {
        if (newState.indexOf(issueId) === -1) {
          newState.push(issueId);
        }
      }
      return newState;
    }
    return state;
  default:
    return state;
  }
}

function pullsById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Map' ?
    if (action.payload.pullsById) {
      return new Map([...state, ...action.payload.pullsById]);
    }
    return state;
  default:
    return state;
  }
}
function pulls(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Set' ?
    if (action.payload.pulls) {
      return new Set([...state, ...action.payload.pulls]);
    }
    return state;
  default:
    return state;
  }
}
function reposById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Map' ?
    if (action.payload.reposById) {
      return new Map([...state, ...action.payload.reposById]);
    }
    return state;
  default:
    return state;
  }
}
function repos(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Set' ?
    if (action.payload.repos) {
      return new Set([...state, ...action.payload.repos]);
    }
    return state;
  default:
    return state;
  }
}
function statusesById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Map' ?
    if (action.payload.statusesById) {
      return new Map([...state, ...action.payload.statusesById]);
    }
    return state;
  default:
    return state;
  }
}
function statuses(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Set' ?
    if (action.payload.statuses) {
      return new Set([...state, ...action.payload.statuses]);
    }
    return state;
  default:
    return state;
  }
}
function branchesById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Map' ?
    if (action.payload.branchesById) {
      return new Map([...state, ...action.payload.branchesById]);
    }
    return state;
  default:
    return state;
  }
}
function branches(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Set' ?
    if (action.payload.branches) {
      return new Set([...state, ...action.payload.branches]);
    }
    return state;
  default:
    return state;
  }
}
function usersById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Map' ?
    if (action.payload.usersById) {
      return new Map([...state, ...action.payload.usersById]);
    }
    return state;
  default:
    return state;
  }
}
function users(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    // FIXME: how to check typeof variable === 'Set' ?
    if (action.payload.users) {
      return new Set([...state, ...action.payload.users]);
    }
    return state;
  default:
    return state;
  }
}

export default function(state = new Map(), action = {}) {
  return new Map([
    ['issuesById', issuesById(state.get('issuesById'), action)],
    ['issues', issues(state.get('issues'), action)],
    ['issuesOrdered', issuesOrdered(state.get('issuesOrdered'), action)],
    ['pullsById', pullsById(state.get('pullsById'), action)],
    ['pulls', pulls(state.get('pulls'), action)],
    ['reposById', reposById(state.get('reposById'), action)],
    ['repos', repos(state.get('repos'), action)],
    ['statusesById', statusesById(state.get('statusesById'), action)],
    ['statuses', statuses(state.get('statuses'), action)],
    ['branchesById', branchesById(state.get('branchesById'), action)],
    ['branches', branches(state.get('branches'), action)],
    ['usersById', usersById(state.get('usersById'), action)],
    ['users', users(state.get('users'), action)],
  ]);
}
