import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CrearUsuarioDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly nombres: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly apellidos: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly cedula: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty()
  readonly password: string;
}
