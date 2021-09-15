import { CrearUsuarioDto } from '../../usuarios/dtos/usuario.dto';
import { UsuariosService } from '../../usuarios/services/usarios.service';
import { JwtGeneratorService } from './../../common/utils/jwt-generator/jwt-generator.service';
import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { Usuario } from '@database/entities/usuarios/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtGeneratorService: JwtGeneratorService,
    private usuariosService: UsuariosService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: Request) {
    const user = req.user as Usuario;
    return this.jwtGeneratorService.generateJWT(user);
  }

  @Post('registro')
  create(@Body() payload: CrearUsuarioDto) {
    return this.usuariosService.crear(payload);
  }
}
