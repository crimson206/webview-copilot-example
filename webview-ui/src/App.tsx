import React, { useState, useEffect } from "react";
import vscode from "./vscodeApi";
import ChatBubble from "./ChatBubble";
import { Box, TextField, Button, List } from "@mui/material";

const ChatApp = () => {
  const [messages, setMessages] = useState<{ content: string; isUser: boolean; id: number }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const message = event.data;
      if (!message) return;

      if (message.type === "loadHistory") {
        setMessages(message.messages.map((msg: any, index: number) => ({ ...msg, id: index })));
      } else if (message.type === "appendResponse") {
        setMessages((prev) => {
          if (prev.length > 0 && !prev[prev.length - 1].isUser) {
            return prev.map((msg, i) =>
              i === prev.length - 1 ? { ...msg, content: msg.content + message.content } : msg
            );
          }
          return [...prev, { content: message.content, isUser: false, id: prev.length }];
        });
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
        setMessages((prev) => [
            ...prev,
            { content: input, isUser: true, id: prev.length }
          ]);
          vscode.postMessage({ type: "sendMessage", content: input });
          setInput("");
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh" p={2} bgcolor="#121212">
      <Box flex={1} overflow="auto" mb={8}>
        <List>
          {messages.map((msg) => (
            <ChatBubble key={msg.id} content={msg.content} isUser={msg.isUser} />
          ))}
        </List>
      </Box>
      <Box
        display="flex"
        position="sticky"
        bottom={0}
        left={0}
        right={0}
        bgcolor="#121212"
        p={1}
      >
      <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown ={(e) => e.key === "Enter" && sendMessage()}
          sx={{
            input: { color: "white" },
            bgcolor: "grey.900",
            borderColor: "grey.700",
          }}
        />
        <Button onClick={sendMessage} variant="contained" color="primary" sx={{ ml: 2 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatApp;
