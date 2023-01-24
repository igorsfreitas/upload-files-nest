export const configServiceMockFactory = () => ({
  get: jest.fn().mockReturnValue('mocked-value'),
});
