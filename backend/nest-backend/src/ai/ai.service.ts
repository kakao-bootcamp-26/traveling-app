import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AiRequestDto } from './dto/AiRequest.dto';
import { AiResponseDto } from './dto/AiResponse.dto';

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private readonly aiServerUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const aiServerIp = this.configService.get<string>('AI_SERVER_IP');
    const aiServerPort = this.configService.get<string>('AI_SERVER_PORT');
    this.aiServerUrl = `http://${aiServerIp}:${aiServerPort}`;
    this.logger.log(`AI server URL: ${this.aiServerUrl}`);
  }

  async sendRequestToAiServer(requestDto: AiRequestDto): Promise<string> {
    const url = '/ai/chat';
    this.logger.log(`Sending request to: ${url}`);

    try {
      const response = await lastValueFrom(
        this.httpService.post<{ requestId: string }>(url, requestDto),
      );
      return response.data.requestId;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error sending request to AI server: ${error.message}`,
        );
      } else {
        this.logger.error(
          'An unknown error occurred while sending request to AI server',
        );
      }
      throw error;
    }
  }

  async getResponseFromAiServer(requestId: string): Promise<void> {
    const url = `/ai/chat/${requestId}`;
    this.logger.log(`Fetching response from: ${url}`);

    try {
      const response = await lastValueFrom(
        this.httpService.get<AiResponseDto>(url),
      );
      this.logger.log('Response from AI server:', response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          `Error fetching response from AI server: ${error.message}`,
        );
      } else {
        this.logger.error(
          'An unknown error occurred while fetching response from AI server',
        );
      }
      throw error;
    }
  }
}
