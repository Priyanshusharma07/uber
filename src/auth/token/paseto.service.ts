import { Injectable } from '@nestjs/common';
import { V2, V4 } from 'paseto';
import { ConfigService } from '@nestjs/config';
import { createPrivateKey } from 'crypto';

@Injectable()
export class PasetoService {
  private readonly paseto: any;
  private readonly privateKey: string;
  private readonly publicKey: string;

  constructor(private readonly configService: ConfigService) {
    this.paseto = V4;
    // this.privateKey = configService.get<string>('PASETO_SECRET_KEY');
    this.privateKey = "k4.secret.wdx2uoFbiivtomQISaAirBrnZdHUXx9RzAFInj4btQCmXEiM3Y94uD93japEjhI6HMKRcQW9SV6vS_CfmXUeAw";
    // this.publicKey = configService.get<string>('PASETO_PUBLIC_KEY')
    this.publicKey = "k4.public.plxIjN2PeLg_d42qRI4SOhzCkXEFvUler0vwn5l1HgM"
  }
  
  async createToken(payload: any): Promise<string> {
    let token = await this.paseto.sign(
      {
        ...payload,
      },
      this.privateKey,
      {
        expiresIn: '2 hours'
      }
    );
    return token;
  }

  async verifyToken(token: string): Promise<any> {
    console.log(token);
    return this.paseto.verify(token, this.publicKey);
  }
}
