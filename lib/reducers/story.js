import {
  UPDATE_STORY,
} from '../constants/ActionTypes';

function issuesById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}

function issues(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}

function issuesOrdered(state = [], action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}

function pullsById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function pulls(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function reposById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function repos(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function statusesById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function statuses(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function branchesById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function branches(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function usersById(state = new Map(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
    return state;
  default:
    return state;
  }
}
function users(state = new Set(), action = {}) {
  switch (action.type) {
  case UPDATE_STORY:
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
