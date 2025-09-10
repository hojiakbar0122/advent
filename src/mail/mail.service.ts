import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from 'src/admins/models/admin.model';
// import { Patient } from '../models/patient.model';

@Injectable()
export class MailService {
    constructor(private readonly mailerService:MailerService){}

    async sendMail(admin:Admin){
        const url = `${process.env.API_HOST}/api/admins/activate/${admin.activation_link}`
        console.log(url);
        
        await this.mailerService.sendMail({
            to:admin.email,
            subject:"Welcome to Clinic App!",
            html:`<h1>Hello! Dear ${admin.first_name},</h1>
<h2>Please click below to confirmation</h2>
<p>
    <a href="${url}">Confirm</a>
</p>`,
        })
    }
}
