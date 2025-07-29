import { ApiProperty } from '@nestjs/swagger';

export class GoogleUserDto {
  @ApiProperty({ example: 'clx1234560000t0xql9v8xxxx' })
  id: string;

  @ApiProperty({ example: 'Maria Silva' })
  name: string;

  @ApiProperty({ example: 'maria.teste@gmail.com' })
  email: string;
}

export class GoogleLoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  access_token: string;

  @ApiProperty({ type: GoogleUserDto })
  user: GoogleUserDto;
}
