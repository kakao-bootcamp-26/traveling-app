import { Controller, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiRequestDto } from './dto/AiRequest.dto';
import { AiResponseDto } from './dto/AiResponse.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/chat')
  async sendUserMessage(
    @Body() aiRequestDto: AiRequestDto,
  ): Promise<AiResponseDto> {
    console.log('Received request:', aiRequestDto);
    try {
      const response =
        await this.aiService.communicateWithAiServer(aiRequestDto);
      console.log('AI server response:', response);
      return response;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
