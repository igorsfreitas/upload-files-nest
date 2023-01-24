import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import { cleanString } from 'src/commons/clean-string';
import { FindFilesDto } from './dto/find-files.dto';
import { FileRepository } from './repositories/file.repository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  async create(file: Express.Multer.File) {
    const { originalname, size, mimetype } = file;
    const pdfDoc =
      mimetype === 'application/pdf'
        ? await PDFDocument.load(file.buffer)
        : null;
    const pages = pdfDoc ? pdfDoc.getPages().length : 1;
    return this.fileRepository.save({
      file_original_name: originalname,
      file_name: cleanString(originalname),
      file_size: size,
      page_count: pages,
      file_type: mimetype,
    });
  }

  async getDocumentsByQuery({ query }: FindFilesDto) {
    const file_name = cleanString(query);
    return this.fileRepository.find({ query: file_name });
  }
}
