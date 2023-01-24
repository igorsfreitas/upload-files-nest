import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindFilesDto } from './dto/find-files.dto';
import { File } from './entities/file.entity';
import { FileService } from './file.service';

@Controller('documents')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 * 20000 }),
          new FileTypeValidator({
            fileType: 'application/pdf|image/jpeg|image/png',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<File> {
    return this.fileService.create(file);
  }

  @Get()
  async getDocumentsByQuery(@Query() payload: FindFilesDto) {
    return this.fileService.getDocumentsByQuery(payload);
  }
}
