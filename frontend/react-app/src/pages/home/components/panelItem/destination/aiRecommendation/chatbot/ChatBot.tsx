import React from "react";
import Chatbot from "react-chatbot-kit";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./ChatBot.css";

export type ChatBotProps = Parameters<typeof Chatbot>[0];

export default function ChatBot() {
  return <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />;
}

ChatBot.Header = () => {
  return <header className="relative w-full"></header>;
};
