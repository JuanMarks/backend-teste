// src/services/google-auth.service.ts

import { OAuth2Client } from 'google-auth-library';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleService {
    private client: OAuth2Client
    
    constructor (private authService: AuthService){
        this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
    }

    async verify(token: string){
        const ticket = await this.client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()

        if (!payload || !payload.email){
            throw new UnauthorizedException('Token do Google inválido ou sem e-mail!')
        }

        const {sub, email, name} = payload

        // 1. Encontra ou cria o usuário no seu sistema
        const user = await this.authService.findOrCreateGoogleUser({
            googleId: sub,
            email,
            name
        })

        // 2. Gera o token JWT da sua aplicação para este usuário
        const jwtResponse = await this.authService.signJwtForUser(user);

        // --- AQUI ESTÁ A CORREÇÃO ---
        // 3. Constrói e retorna o objeto de resposta completo, incluindo o 'user'
        return {
            access_token: jwtResponse, // Pega o token da resposta do serviço
            user: {
                role: 'user',
                name: user.name,
                email: user.email,
                // Adicione outras propriedades do usuário que o frontend possa precisar
            }
        };
    }
}