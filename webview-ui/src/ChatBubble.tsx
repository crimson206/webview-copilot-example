import React from "react";
import { Box, Paper, Typography } from "@mui/material";

interface ChatBubbleProps {
  content: string;
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ content, isUser }) => {
  return (
    <Box
      display="flex"
      justifyContent={isUser ? "flex-end" : "flex-start"}
      mb={1}
    >
      <Paper
        elevation={3}
        sx={{
          p: 2,
          maxWidth: "70%",
          bgcolor: isUser ? "primary.main" : "grey.300",
          color: isUser ? "white" : "black",
          borderRadius: isUser ? "20px 20px 0px 20px" : "20px 20px 20px 0px",
        }}
      >
        <Typography variant="body1">{content}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
