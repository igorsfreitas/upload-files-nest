import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  MockRepository,
  repositoryMockFactory,
} from '../../../../test/mocks/repository.mock';
import { CreateFileDTO } from '../dto/create-file.dto';
import { File } from '../entities/file.entity';
import { FileRepository } from './file.repository';

describe('File Repository Tests', () => {
  let repository: FileRepository;
  let fileRepository: MockRepository<File>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileRepository,
        {
          provide: getRepositoryToken(File),
          useValue: repositoryMockFactory(),
        },
      ],
    }).compile();

    repository = module.get<FileRepository>(FileRepository);
    fileRepository = module.get<MockRepository<File>>(getRepositoryToken(File));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(FileRepository).toBeDefined();
  });

  it('should save a new file', async () => {
    //Arrange
    const dto: CreateFileDTO = {
      file_original_name: 'Teste.pdf',
      file_name: 'teste.pdf',
      file_size: 167414,
      page_count: 1,
      file_type: 'application/pdf',
    };
    jest.spyOn(fileRepository, 'save').mockReturnValue(dto);
    jest.spyOn(repository, 'save');

    // act
    const file = await repository.save(dto);

    // assert
    expect(repository.save).toBeCalledTimes(1);
    expect(file).toMatchObject(dto);
  });

  it('should find files by query', async () => {
    //Arrange
    const query = { query: 'teste.' };
    jest.spyOn(fileRepository, 'createQueryBuilder');
    jest.spyOn(repository, 'find');

    // act
    await repository.find(query);

    // assert
    expect(repository.find).toBeCalledTimes(1);
    expect(fileRepository.createQueryBuilder).toBeCalled();
  });
});
