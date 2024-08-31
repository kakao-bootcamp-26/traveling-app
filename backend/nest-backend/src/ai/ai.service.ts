import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AiRequestDto } from './dto/AiRequest.dto';
import { AiResponseDto } from './dto/AiResponse.dto';

@Injectable()
export class AiService {
  constructor(private readonly httpService: HttpService) {}

  private isAiResponseDto(obj: any): obj is { data: AiResponseDto } {
    return obj && typeof obj === 'object' && 'data' in obj;
  }

  async communicateWithAiServer(
    requestDto: AiRequestDto,
  ): Promise<AiResponseDto> {
    const aiServerUrl = `http://${process.env.AI_SERVER_IP}:5000/chat`;
    const response = (await lastValueFrom(
      this.httpService.post<AiResponseDto>(aiServerUrl, requestDto),
    )) as { data: AiResponseDto };

    if (this.isAiResponseDto(response)) {
      return response.data;
    } else {
      throw new Error('Invalid response from AI server');
    }
  }
}
