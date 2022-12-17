import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateNotificationBody } from './create-notification.dto';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';

@Controller('notifications')
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;
    
    return await this.prisma.notification.create({
      data: {
        id: randomUUID(),
        content: content,
        category: category,
        recipiendId: randomUUID(),
      }
    });
  }
}
