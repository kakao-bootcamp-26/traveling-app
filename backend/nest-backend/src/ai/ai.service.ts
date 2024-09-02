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

  async sendRequestToAiServer(requestDto: AiRequestDto): Promise<string> {
    const aiServerUrl = `http://${process.env.AI_SERVER_IP}:5000/chat`;
    const response = await lastValueFrom(
      this.httpService.post<{ requestId: string }>(aiServerUrl, requestDto),
    );

    if (response && response.data && response.data.requestId) {
      return response.data.requestId;
    } else {
      throw new Error('Invalid response from AI server');
    }
  }

  async getResponseFromAiServer(requestId: string): Promise<void> {
    const aiServerUrl = `http://${process.env.AI_SERVER_IP}:5000/chat/${requestId}`;
    const response = await lastValueFrom(
      this.httpService.get<AiResponseDto>(aiServerUrl),
    );

    if (this.isAiResponseDto(response)) {
      console.log('Response from AI server:', response.data);
      // 여기에 추후 응답 처리 로직을 구현할 수 있습니다.
    } else {
      throw new Error('Invalid response from AI server');
    }
  }
}

//   async communicateWithAiServer(
//     requestDto: AiRequestDto,
//   ): Promise<AiResponseDto> {
//     const aiServerUrl = `http://${process.env.AI_SERVER_IP}:5000/chat`;
//     const response = (await lastValueFrom(
//       this.httpService.post<AiResponseDto>(aiServerUrl, requestDto),
//     )) as { data: AiResponseDto };

//     if (this.isAiResponseDto(response)) {
//       return response.data;
//     } else {
//       throw new Error('Invalid response from AI server');
//     }
//   }
