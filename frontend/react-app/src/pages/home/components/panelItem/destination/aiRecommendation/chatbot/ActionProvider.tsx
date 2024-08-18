import React, { useState } from "react";
import type { PropsWithChildren } from "react";
import { ChatBotProps } from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/ChatBotPage";
import { DestinationEntity } from "@/shared/entities/destination.entity";
import CurationMessage from "@/pages/home/components/panelItem/destination/aiRecommendation/chatbot/message/CurationMessage";

type Props = {
  setState: any;
  createChatBotMessage: any;
  state: any;
};
type NavigateProps = {
  moveToAIResultStep: () => void;
  saveAIRecommendationDestinations: (cities: DestinationEntity[]) => void;
};

const ActionProvider: ChatBotProps["actionProvider"] =
  ({ moveToAIResultStep, saveAIRecommendationDestinations }: NavigateProps) =>
  ({ createChatBotMessage, setState, children }: PropsWithChildren<Props>) => {
    const handleCurationMessage = (result: DestinationEntity[]) => {
      const goToNextStep = () => {
        saveAIRecommendationDestinations(result);
        moveToAIResultStep();
      };

      const goToPrevStep = () => {
        const feedbackMessage = createChatBotMessage("피드백이 완료되었습니다.");
        setState((prev: any) => ({
          ...prev,
          messages: [...prev.messages, feedbackMessage],
        }));
      };

      const curationMessage = createChatBotMessage(
        <CurationMessage goToNextStep={goToNextStep} goToPrevStep={goToPrevStep} result={result} />,
      );

      setState((prev: any) => ({
        ...prev,
        messages: [...prev.messages, curationMessage],
      }));
    };

    return (
      <div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement<any>(child, {
              actions: {
                handleCurationMessage,
              },
            });
          }
        })}
      </div>
    );
  };

export default ActionProvider;
