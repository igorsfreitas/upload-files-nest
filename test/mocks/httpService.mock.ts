import { of } from 'rxjs';

export const httpServiceMockFactory = () => ({
  get: jest.fn(),
  post: jest.fn().mockImplementation(() => of({ data: {} })),
});
