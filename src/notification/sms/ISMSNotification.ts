import { SMSRequest } from '../../models/SMSRequest';

export interface ISMSNotification {
   send(smsRequest: SMSRequest): Promise<any>;
}
