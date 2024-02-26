export interface PasswordProps {
  password: string;
  setPassword: (newPassword: string) => void;
  isError: boolean;
  showPassword: boolean;
  title?: string
  helperText?:string;
}
