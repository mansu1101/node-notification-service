export interface INotification {
  send(id: any, message: any): Promise<any>;
}
