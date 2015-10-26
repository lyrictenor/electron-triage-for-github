/**
 * Compare configs for updating autopilot option.
 */
export default class CompareConfigs {
  /**
   * @param {Object} param - comparing configs.
   * @param {Map} [param.prev=new Map()] - previous config.
   * @param {Map} [param.next=new Map()] - next config.
   */
  constructor({prev = new Map(), next = new Map()} = {}) {
    this.prev = prev;
    this.next = next;
  }

  /**
   * @return {boolean} true if enableAutopilot value is previous true to next false
   */
  trueToFalse() {
    return this.prev.get('enableAutopilot') &&
      !this.next.get('enableAutopilot');
  }

  /**
   * @return {boolean} true if enableAutopilot value is previous false to next true
   */
  falseToTrue() {
    return !this.prev.get('enableAutopilot') &&
      this.next.get('enableAutopilot') &&
      this.next.get('autopilotInterval') > 0;
  }

  /**
   * @return {boolean} true if enableAutopilot value is previous true to next true,
   * and autopilotInterval is modified.
   */
  trueToTrueAndModifiedInterval() {
    return this.prev.get('enableAutopilot') &&
      this.next.get('enableAutopilot') &&
      this.prev.get('autopilotInterval') !== this.next.get('autopilotInterval') &&
      this.next.get('autopilotInterval') > 0;
  }
}
