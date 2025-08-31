export default class BaseDTO {
  constructor(public readonly dto: Record<string, unknown>) {
    this.handle();
  }

  public handle() {
    return this.dto;
  }

  public toObject(): Record<string, unknown> {
    return this.dto;
  }
}
