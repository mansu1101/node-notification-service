export type NodeMailerConfigRequest = {
  service: string;
  host: string;
  port: number;
  auth: {
    user: string,
    password: string
  };
  secure?: boolean;
}
