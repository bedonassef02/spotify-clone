import { Controller, Get, Header, Logger, Query, Res, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('stream')
export class StreamController {
  private CHUNK_SIZE: number = 8192;
  private logger: Logger = new Logger(StreamController.name);

  @Get()
  getFile(@Query() query: any): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'uploads/Amr_Diab-Mafeesh_Menak.mp3'), {
      highWaterMark: parseInt(query.chunkSize) || this.CHUNK_SIZE,
      start: parseInt(query.start) || 0,
    });
    return new StreamableFile(file, {
      type: 'audio/mpeg',
      disposition: "attachment; filename=Amr_Diab-Mafeesh_Menak.mp3",
    });
  }
}