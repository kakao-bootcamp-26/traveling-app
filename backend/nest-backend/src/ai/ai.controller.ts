import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiRequestDto } from './dto/AiRequest.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('/chat')
  async sendUserMessage(
    @Body() aiRequestDto: AiRequestDto,
  ): Promise<{ requestId: string }> {
    console.log('Received request:', aiRequestDto);
    try {
      const requestId =
        await this.aiService.sendRequestToAiServer(aiRequestDto);
      console.log('Request sent to AI server. Request ID:', requestId);
      return { requestId };
    } catch (error) {
      console.error('Error Sending Request:', error);
      throw error;
    }
  }

  @Get('/chat/:requestId')
  async getAiResponse(@Param('requestId') requestId: string): Promise<void> {
    console.log('Fetching result for request ID:', requestId);
    try {
      await this.aiService.getResponseFromAiServer(requestId);
    } catch (error) {
      console.error('Error Fetching result:', error);
      throw error;
    }
  }
}
