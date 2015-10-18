export default class CompareConfigs {
  constructor({prev = new Map(), next = new Map()} = {}) {
    this.prev = prev;
    this.next = next;
  }
  trueToFalse() {
    return this.prev.get('enableAutopilot') &&
      !this.next.get('enableAutopilot');
  }
  falseToTrue() {
    return !this.prev.get('enableAutopilot') &&
      this.next.get('enableAutopilot') &&
      this.next.get('autopilotInterval') > 0;
  }
  trueToTrueAndModifiedInterval() {
    return this.past.get('enableAutopilot') &&
      this.next.get('enableAutopilot') &&
      this.prev.get('autopilotInterval') !== this.next.get('autopilotInterval') &&
      this.next.get('autopilotInterval') > 0;
  }
}
