import { Test, TestingModule } from '@nestjs/testing';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';

describe('AiController', () => {
  let controller: AiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AiController],
      providers: [
        {
          provide: AiService,
          useValue: {
            sendRequestToAiServer: jest
              .fn()
              .mockResolvedValue('mocked-request-id-123'),
            getResponseFromAiServer: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<AiController>(AiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a request ID', async () => {
    const result = await controller.sendUserMessage({
      message: 'Test message',
    });
    expect(result).toEqual({ requestId: 'mocked-request-id-123' });
  });

  it('should process AI response', async () => {
    const result = await controller.getAiResponse('test-id');
    expect(result).toBe('Response processed successfully');
  });
});
