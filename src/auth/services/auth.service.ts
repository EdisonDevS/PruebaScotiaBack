import * as bcrypt from 'bcrypt';

import { Injectable } from '@nestjs/common';
import { UsuariosService } from '../../usuarios/services/usarios.service';

@Injectable()
export class AuthService {
  constructor(private usuariosService: UsuariosService) {}

  async validateUser(email: string, password: string) {
    const user = await this.usuariosService.buscarPorEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...rta } = user;
        return rta;
      }
    }
    return null;
  }
}
