import { NodeMailerConfigRequest } from '../models/NodeMailerConfigRequest';
export class Utility {
  public static isValidAwsSesConfig(option: any): boolean {
    return option.aws_ses && option.fromEmailAddress && option.region;
  }
  public static isValidNodeMailerConfig(option: any): boolean {
    return option.service && option.host && option.port && option.auth.user && option.auth.password;
  }
}
