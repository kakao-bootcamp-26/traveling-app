import { IsString, IsNotEmpty } from 'class-validator';

export class AiResponseDto {
  @IsString()
  @IsNotEmpty()
  message: string; // 모델 응답 메시지
  intent_response: string; // 모델 응답의 유형
  recommendation: string; // 추천 여행지
}
