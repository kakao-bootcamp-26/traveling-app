import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { AiService } from './ai.service';

describe('AiService', () => {
  let service: AiService;
  let httpService: jest.Mocked<HttpService>;
  let loggerSpy: jest.SpyInstance;

  beforeEach(async () => {
    const mockHttpService = {
      post: jest.fn(),
      get: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn().mockReturnValue('mocked-value'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    httpService = module.get(HttpService);

    loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a mocked request ID', async () => {
    const mockResponse: AxiosResponse = {
      data: { requestId: 'mocked-request-id-123' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };
    httpService.post.mockReturnValue(of(mockResponse));

    const result = await service.sendRequestToAiServer({
      message: 'Test message',
    });
    expect(result).toBe('mocked-request-id-123');
    expect(loggerSpy).toHaveBeenCalledWith(
      'AI server URL: http://mocked-value:mocked-value',
    );
    expect(loggerSpy).toHaveBeenCalledWith('Sending request to: /ai/chat');
  });

  it('should log a mocked response', async () => {
    const mockResponse: AxiosResponse = {
      data: { response: 'Mocked response' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined,
      },
    };
    httpService.get.mockReturnValue(of(mockResponse));

    await service.getResponseFromAiServer('test-id');
    expect(loggerSpy).toHaveBeenCalledWith(
      'AI server URL: http://mocked-value:mocked-value',
    );
    expect(loggerSpy).toHaveBeenCalledWith(
      'Fetching response from: /ai/chat/test-id',
    );
    expect(loggerSpy).toHaveBeenCalledWith('Response from AI server:', {
      response: 'Mocked response',
    });
  });
});
