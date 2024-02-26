import { Box, Button, TextField, Tooltip } from "@mui/material";
import axios from "axios";
import EmojiPicker, { EmojiClickData, EmojiStyle } from "emoji-picker-react";
import { useState } from "react";
import { BaseProps } from "../model";

export default function Admin({ apiUrl }: BaseProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [attempCount, setAttemptCount] = useState(0);

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setPassword((prevInput) => prevInput + emojiData.emoji);
  };

  const onGet = () => {
    axios.get(apiUrl).then((rep) => {
      setUsername(rep.data.user_id);
      setPassword(rep.data.password);
      setAttemptCount(rep.data.attempt_count);
    });
  };

  const onSet = () => {
    axios.put(apiUrl, {
      user_id: username,
      password: password,
    });
  };

  const onDelete = () => {
    axios.put(apiUrl + "/reset");
  };

  const onClearAttempt = () => {
    axios.patch(apiUrl + "/reset");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 3,
      }}
    >
      <h1>Admin</h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          gap: 3,
        }}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Attempt Count"
          variant="outlined"
          value={attempCount}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            readOnly: true,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "30%",
        }}
      >
        <Tooltip
          title="Get current user info on the API"
          arrow
          placement="bottom"
        >
          <Button variant="contained" color="success" onClick={onGet}>
            GET
          </Button>
        </Tooltip>
        <Tooltip
          title="Use to set current user info on the API"
          arrow
          placement="bottom"
        >
          <Button variant="contained" onClick={onSet}>
            SET
          </Button>
        </Tooltip>
        <Tooltip
          title="Use to clear current user info on the API"
          arrow
          placement="bottom"
        >
          <Button variant="contained" color="error" onClick={onDelete}>
            DELETE
          </Button>
        </Tooltip>
        <Tooltip
          title="Use to clear current attempt count info on the API"
          arrow
          placement="bottom"
        >
          <Button variant="contained" color="error" onClick={onClearAttempt}>
            CLEAR ATTEMPT
          </Button>
        </Tooltip>
      </Box>
      <EmojiPicker
        emojiStyle={EmojiStyle.APPLE}
        previewConfig={{ showPreview: false }}
        onEmojiClick={onEmojiClick}
        height={700}
      />
    </Box>
  );
}
