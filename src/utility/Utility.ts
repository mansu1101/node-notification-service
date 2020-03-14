export class Utility {
  public static isValidAwsSesConfig(option: any): boolean {
    return option.aws_ses && option.senderEmail && option.region;
  }
  public static isValidNodeMailerConfig(option: any): boolean {
    return option.aws_ses && option.senderEmail && option.region;
  }
}
