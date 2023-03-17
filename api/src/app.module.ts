import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamModule } from './stream/stream.module';
import { TimelineModule } from './timeline/timeline.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'username1234',
      database: 'infinitystreamer',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
    }),
    StreamModule,
    TimelineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
