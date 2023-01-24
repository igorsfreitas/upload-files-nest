import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFileDTO } from '../dto/create-file.dto';
import { FindFilesDto } from '../dto/find-files.dto';
// import { FindTutorDto } from '../dto/find-tutor.dto';
import { File } from '../entities/file.entity';

@Injectable()
export class FileRepository {
  constructor(
    @InjectRepository(File)
    private fileRepository: Repository<File>,
  ) {}

  save(file: CreateFileDTO): Promise<File> {
    return this.fileRepository.save(file);
  }

  find({ query }: FindFilesDto): Promise<File[]> {
    return this.fileRepository
      .createQueryBuilder('file')
      .where('file.file_name like :query', { query: `%${query}%` })
      .getMany();
  }
}
