import { Response, Request } from 'express';

import { sendSubscriptionEmail } from '../utils/emailUtils';

const EmailController = async (request: Request, response: Response) => {
    const sub = request.body;

    sendSubscriptionEmail(sub);
    response.json();
};
export default EmailController;