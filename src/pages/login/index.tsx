import { Box, Button, Switch } from "@mui/material";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { EmojiStyle } from "emoji-picker-react";
import { useState } from "react";
import UsernameInput from "../components/username";
import axios from "axios";
import PasswordInput from "../components/password";
import { BaseProps } from "../model";

export default function Login({ apiUrl }: BaseProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    setPassword("");
    axios
      .post(apiUrl, { user_id: username, password: password })
      .then((rep) => {
        console.log(rep.data.match);
        if (rep.data.match) {
          alert("Login Successfuly");
        } else {
          alert("Incorrect Username or Password.\nPlease try again.");
        }
      });
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setPassword((prevInput) => prevInput + emojiData.emoji);
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "row",
        paddingX: 4,
        paddingTop: 15,
        gap: 5,
        alignItems: "top",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "top",
          flexDirection: "column",
          width: "100%",
          gap: 1,
        }}
      >
        <h1 style={{ textAlign: "left", width: "100%" }}>Login</h1>
        <UsernameInput username={username} setUsername={setUsername} />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          isError={false}
          showPassword={showPassword}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignContent: "center",
          }}
        >
          <span style={{ paddingTop: 5 }}>Show password</span>
          <Switch onChange={() => setShowPassword(!showPassword)} />
        </Box>
        <Button
          variant="contained"
          onClick={onLogin}
          sx={{ marginTop: 1 }}
          disabled={username === "" || password === ""}
        >
          Login
        </Button>
      </Box>
      {window.innerWidth <= 425 ? (
        <></>
      ) : (
        <EmojiPicker
          emojiStyle={EmojiStyle.APPLE}
          height={"70%"}
          previewConfig={{ showPreview: false }}
          width={"100%"}
          onEmojiClick={onEmojiClick}
        />
      )}
    </Box>
  );
}
