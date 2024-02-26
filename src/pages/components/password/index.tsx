import { Box, TextField } from "@mui/material";
import HttpsIcon from "@mui/icons-material/Https";
import { PasswordProps } from "./model";
export default function PasswordInput({
  password,
  setPassword,
  isError,
  showPassword,
  title,
  helperText,
}: PasswordProps) {
  return (
    <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <HttpsIcon sx={{ fill: "grey" }} />
        <span>{title ?? "Password"}</span>
      </Box>
      <TextField
        variant="outlined"
        sx={{
          width: "100%",
        }}
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={isError}
        helperText={helperText}
      />
    </Box>
  );
}
