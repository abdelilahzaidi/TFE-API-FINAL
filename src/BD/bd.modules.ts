import { Inject, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (
        {
          type: 'mysql',
          host: 'localhost',
          port: parseInt(process.env.DB_PORT),
          username: configService.get("DB_USERNAME"),
          password: configService.get("DB_PASSWORD"),
          database: configService.get("DB_NAME"),
          entities: [],
          autoLoadEntities: true,
          synchronize: false
        }
      ),
      inject: [ConfigService]
    }),
  ],
})


export class BdModule { }
