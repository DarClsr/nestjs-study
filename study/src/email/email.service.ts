import { Inject, Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.163.com',
      port: 465,
      auth: {
        user: process.env.EMAIL_SENDER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '系统邮件',
        address: process.env.EMAIL_SENDER,
      },
      to,
      subject,
      html,
    });
  }
}
