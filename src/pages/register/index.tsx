import { Box, Button, Switch } from "@mui/material";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PasswordInput from "../components/password";
import UsernameInput from "../components/username";
import axios from "axios";
import { BaseProps } from "../model";

export default function Register({ apiUrl }: BaseProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [passValidText, setPassValidText] = useState("");
  const [searchParams] = useSearchParams();

  const config = {
    minLen: Number(searchParams.get("minLen")) ?? 0,
    capital: Number(searchParams.get("capital")) ?? 0,
    lower: Number(searchParams.get("lower")) ?? 0,
    emoji: Number(searchParams.get("emoji")) ?? 0,
    number: Number(searchParams.get("num")) ?? 0,
  };

  const validateString = (input: string): string => {
    // Check minimum length
    if (input.length < config.minLen) {
      return `Password must be at least ${config.minLen} characters long.`;
    }

    // Check capital letters
    const capitalRegex = /[A-Z]/g;
    const capitalCount = (input.match(capitalRegex) || []).length;
    if (capitalCount < config.capital) {
      return `Password must contain ${config.capital} captiatl letters.`;
    }

    // Check lowercase letters
    const lowerRegex = /[a-z]/g;
    const lowerCount = (input.match(lowerRegex) || []).length;
    if (lowerCount < config.lower) {
      return `Password must contain ${config.lower} lower letters.`;
    }

    // Check emojis
    const emojiRegex =
      /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
    const emojiCount = (input.match(emojiRegex) || []).length;
    if (emojiCount < config.emoji) {
      return `Password must contain at least ${config.emoji} emojis.`;
    }

    // Check numbers
    const numberRegex = /\d/g;
    const numberCount = (input.match(numberRegex) || []).length;
    if (numberCount < config.number) {
      return `Password must contain ${config.number} numbers.`;
    }

    // All checks passed
    return "";
  };

  useEffect(() => {
    setPassValidText(validateString(password));
  }, [password]);

  const handleRegister = () => {
    axios
      .put(apiUrl, {
        user_id: username,
        password,
      })
      .then(() => {
        setUsername("");
        setPassword("");
        setConPassword("");
        alert("Register Successfully");
      });
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "row",
        paddingX: 4,
        gap: 5,
        alignItems: "top",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          gap: 1,
        }}
      >
        <h1 style={{ textAlign: "left", width: "100%" }}>Register</h1>
        <UsernameInput username={username} setUsername={setUsername} />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          isError={passValidText !== ""}
          helperText={passValidText}
          showPassword={showPassword}
        />
        <PasswordInput
          title="Confirm Password"
          password={conPassword}
          setPassword={setConPassword}
          isError={conPassword !== password}
          helperText={conPassword !== password ? "Password does not match" : ""}
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
          sx={{ marginTop: 1 }}
          disabled={passValidText !== "" || username === ""}
          onClick={handleRegister}
        >
          Register
        </Button>
        <Link to="/" style={{ alignSelf: "center" }}>
          Login
        </Link>
      </Box>
      {window.innerWidth <= 425 ? (
        <></>
      ) : (
        <Box width={"100%"}>
          <p>Password</p>
          <EmojiPicker
            emojiStyle={EmojiStyle.APPLE}
            height={"40%"}
            previewConfig={{ showPreview: false }}
            width={"100%"}
            onEmojiClick={(emoji) => {
              setPassword((prev) => prev + emoji.emoji);
            }}
          />
          <p>Confirm Password</p>
          <EmojiPicker
            emojiStyle={EmojiStyle.APPLE}
            height={"40%"}
            previewConfig={{ showPreview: false }}
            width={"100%"}
            onEmojiClick={(emoji) => {
              setConPassword((prev) => prev + emoji.emoji);
            }}
          />
        </Box>
      )}
    </Box>
  );
}
