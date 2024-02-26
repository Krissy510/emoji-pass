import { AccountCircle } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { UsernameProps } from "./model";

export default function UsernameInput({
  username,
  setUsername,
  isError,
}: UsernameProps) {
  return (
    <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AccountCircle sx={{ fill: "grey" }} />
        <span>Username</span>
      </Box>
      <TextField
        variant="outlined"
        fullWidth
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        error={isError}
      />
    </Box>
  );
}
