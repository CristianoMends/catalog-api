import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DataSource } from 'typeorm';
import { ProductModule } from './product/product.module';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CatalogModule } from './catalog/catalog.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/'
    }),
    ProductModule,
    DbModule,
    UsersModule,
    AuthModule,
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

