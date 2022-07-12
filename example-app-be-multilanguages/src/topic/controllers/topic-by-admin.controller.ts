import { Body, Controller, Delete, Get, Param, ParseArrayPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination } from 'nestjs-typeorm-paginate';
import { LangEnum } from '../../common/constants/global.constant';
import { CreateTopicDto } from '../dto/create-topic.dto';
import { FindManyTopicDto, FindTopicDto } from '../dto/find-topic.dto';
import { UpdateTopicDto } from '../dto/update-topic.dto';
import { Topic } from '../entities/topic.entity';
import { TopicService } from '../topic.service';

@Controller('admin/topics')
@ApiTags('Topic Admin')
export class TopicByAdminController {
  constructor(private readonly topicService: TopicService) {}

  //Admin CREATE Topic (MultiLanguage):
  @Post()
  // @UsePipes(ValidationPipe)
  async create(@Body() createTopicDto: CreateTopicDto): Promise<Topic> {
    return this.topicService.create(createTopicDto);
  }

  //Admin GETALL Topics + Search(slug) + Pagination (Multilanguage):
  @Get()
  // @UsePipes(ValidationPipe)
  async findAllByAdmin(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query() params: FindManyTopicDto, //language, enabled, slug
  ): Promise<Pagination<Topic>> {
    limit = limit > 100 ? 100 : limit;
    if (!params.lang) {
      params.lang = LangEnum.En;
    }
    // if (!params.enabled) { params.enabled = BooleanEnum.TRUE }
    return this.topicService.findAllByAdmin({ page, limit }, params);
  }

  //Admin GETONE Topic (MultiLanguage):
  @Get(':key')
  // @UsePipes(ValidationPipe)
  async findOne(@Param('key') key: string, @Query() params: FindTopicDto) {
    if (!params.lang) {
      params.lang = LangEnum.En;
    }

    return this.topicService.findOne(key, params);
  }

  //Admin UPDATEONE Topic (MultiLanguage):
  @Put(':key')
  // @UsePipes(ValidationPipe)
  async update(
    @Param('key') key: string,
    @Body() updateTopicDto: UpdateTopicDto,
  ) {
    return this.topicService.update(key, updateTopicDto);
  }

  //Admin REMOVEONE Topic (MultiLanguage):
  @Delete(':key')
  async remove(@Param() param) {
    return this.topicService.remove(param.key);
  }

  //Admin REMOVEMULTI Topics (MultiLanguage):
  @Delete()
  async removeMulti(@Query('keys', ParseArrayPipe) keys: string[]) {
    return this.topicService.removeMulti(keys);
  }
}
