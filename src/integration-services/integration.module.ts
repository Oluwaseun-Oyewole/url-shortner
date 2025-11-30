import { Module } from '@nestjs/common';
import { Resend } from 'resend';
import { appConfig } from 'src/shared/config';
import { MailService } from './mail/mail.service';

@Module({
  providers: [
    MailService,
    {
      provide: 'RESEND_CLIENT',
      useFactory: () => new Resend(appConfig().resendApiKey),
    },
  ],

  exports: [MailService, 'RESEND_CLIENT'],
})
export class IntegrationServicesModule {}
