import { JwtGeneratorService } from '../../common/utils/jwt-generator/jwt-generator.service';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearUsuarioDto } from '../dtos/usuario.dto';

import * as bcrypt from 'bcrypt';
import { Usuario } from '@database/entities/usuarios/usuario.entity';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioRepo: Repository<Usuario>,
    private jwtGeneratorService: JwtGeneratorService,
  ) {}

  async crear(data: CrearUsuarioDto) {
    const user = await this.usuarioRepo.findOne({
      where: { email: data.email },
    });
    if (user) {
      throw new ConflictException('This user already exists');
    }
    const newUser = this.usuarioRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    newUser.role = 'customer';
    this.usuarioRepo.save(newUser);
    return this.jwtGeneratorService.generateJWT(newUser);
  }

  buscarPorEmail(email: string) {
    return this.usuarioRepo.findOne({ where: { email } });
  }

  async buscarPorId(id: string) {
    return this.usuarioRepo.findOne(id);
  }
}
