import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileService } from './file.service';
import { File } from './entities/file.entity';
import { FileRepository } from './repositories/file.repository';
import { PDFDocument } from 'pdf-lib';
import { repositoryMockFactory } from '../../../test/mocks/repository.mock';
import { Readable } from 'typeorm/platform/PlatformTools';

describe('FileService', () => {
  let service: FileService;
  let repository: FileRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        FileRepository,
        {
          provide: getRepositoryToken(File),
          useValue: repositoryMockFactory(),
        },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
    repository = module.get<FileRepository>(FileRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should save a new png file', async () => {
    const file = {
      originalname: 'Teste.png',
      size: 167414,
      mimetype: 'image/png',
      fieldname: 'string',
      encoding: 'string',
      stream: new Readable(),
      destination: 'string',
      filename: 'string',
      path: 'string',
      buffer: Buffer.from('string'),
    };

    jest.spyOn(repository, 'save');
    jest.spyOn(service, 'create');

    // act
    await service.create(file);

    // assert
    expect(repository.save).toBeCalledTimes(1);
    expect(service.create).toBeCalledTimes(1);
    expect(service.create).toBeCalledWith(file);
  });

  it('should save a new pdf file', async () => {
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

    jest.spyOn(repository, 'save');
    jest.spyOn(service, 'create');

    // act
    await service.create(file);

    // assert
    expect(repository.save).toBeCalledTimes(1);
    expect(service.create).toBeCalledTimes(1);
    expect(service.create).toBeCalledWith(file);
  });

  it('should find documents by query', async () => {
    //Arrange
    const query = { query: 'teste.' };
    jest.spyOn(repository, 'find').mockResolvedValue([new File()]);
    jest.spyOn(service, 'getDocumentsByQuery');

    // act
    await service.getDocumentsByQuery(query);

    // assert
    expect(repository.find).toBeCalledTimes(1);
    expect(repository.find).toBeCalledWith(query);
    expect(service.getDocumentsByQuery).toBeCalledWith(query);
  });
});
