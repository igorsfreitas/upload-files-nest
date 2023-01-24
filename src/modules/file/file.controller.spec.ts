import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { FileRepository } from './repositories/file.repository';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { repositoryMockFactory } from '../../../test/mocks/repository.mock';
import { PDFDocument } from 'pdf-lib';
import { Readable } from 'typeorm/platform/PlatformTools';

describe('FileController Tests', () => {
  let controller: FileController;
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileController],
      providers: [
        FileService,
        FileRepository,
        {
          provide: getRepositoryToken(File),
          useValue: repositoryMockFactory(),
        },
      ],
    }).compile();

    controller = module.get<FileController>(FileController);
    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('should create file', async () => {
    //arrange
    const pdfDoc = await PDFDocument.create();
    pdfDoc.addPage();
    const pdfBytes = await pdfDoc.save();

    const file = {
      originalname: 'Teste.pdf',
      size: 167414,
      mimetype: 'application/pdf',
      fieldname: 'string',
      encoding: 'string',
      stream: new Readable(),
      destination: 'string',
      filename: 'string',
      path: 'string',
      buffer: Buffer.from(pdfBytes),
    };
    jest.spyOn(controller, 'uploadFile');

    //act
    await controller.uploadFile(file);

    //assert
    expect(controller.uploadFile).toBeCalledTimes(1);
  });

  it('should find documents by query', async () => {
    const query = { query: 'teste.' };
    jest.spyOn(controller, 'getDocumentsByQuery');

    //act
    await controller.getDocumentsByQuery(query);

    //assert
    expect(controller.getDocumentsByQuery).toBeCalledTimes(1);
  });
});
