import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import {
  AxiosResponse,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';
import { AiService } from './ai.service';
import { ConfigService } from '@nestjs/config';

describe('AiService', () => {
  let service: AiService;
  let httpService: jest.Mocked<HttpService>;

  beforeEach(async () => {
    const mockHttpService = {
      post: jest.fn(),
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AiService,
        { provide: HttpService, useValue: mockHttpService },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('http://mock-ai-server.com'),
          },
        },
      ],
    }).compile();

    service = module.get<AiService>(AiService);
    httpService = module.get(HttpService);
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
        headers: {} as RawAxiosRequestHeaders,
      } as InternalAxiosRequestConfig,
    };
    httpService.post.mockReturnValue(of(mockResponse));

    const result = await service.sendRequestToAiServer({
      message: 'Test message',
    });
    expect(result).toBe('mocked-request-id-123');
  });

  it('should log a mocked response', async () => {
    const mockResponse: AxiosResponse = {
      data: { response: 'Mocked response' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: {} as RawAxiosRequestHeaders,
      } as InternalAxiosRequestConfig,
    };
    httpService.get.mockReturnValue(of(mockResponse));

    const consoleSpy = jest.spyOn(console, 'log');
    await service.getResponseFromAiServer('test-id');
    expect(consoleSpy).toHaveBeenCalledWith('Response from AI server:', {
      response: 'Mocked response',
    });
  });
});
