import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { EmailTemplate } from 'src/enums/email-template.enum';
import { BaseUtils } from 'src/utils/base.utils';

export class ResendEmailDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  emailId: string;

  @ApiProperty({ example: 'Martin Mystry' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Difficulty',
    example: `${BaseUtils.getEnumKeys(EmailTemplate).join('/')}`,
  })
  @IsNotEmpty()
  @IsIn(BaseUtils.getEnumKeys(EmailTemplate), {
    message: `template can only be ${BaseUtils.getEnumKeys(EmailTemplate)}`,
  })
  template: string;
}
