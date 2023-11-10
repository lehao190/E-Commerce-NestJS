import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
// import { ConfigService } from '@nestjs/config';
import { JwtRefreshTokenStrategy } from './strategies/jwt-refresh-token.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}),
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: async (configService: ConfigService) => ({
    //     secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
    //     signOptions: {
    //       expiresIn: configService.get<string>('ACCESS_TOKEN_EXPIRES'),
    //     }
    //   }),
    // }),
  ],
  providers: [
    // Strategies
    LocalStrategy,
    JwtStrategy,
    JwtRefreshTokenStrategy,
    // Resolvers
    AuthResolver,
    // Services
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
