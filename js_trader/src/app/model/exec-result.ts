export class ExecResult {
  constructor(success: boolean, message: string) {
    this.message = message;
    this.success = success;
  }
  success: boolean;
  message: string;
}
