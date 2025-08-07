import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDebounce } from "../../hooks/useDebounce";
import { useCheckTitleExists } from "../../hooks/useCheckTitleExists";
import GeneralInput from "./Input";
import { TitleInputContainer, TitleStatus } from "./TitleInput.styles";
import { CheckCircle, Error, Info } from "@mui/icons-material";

interface TitleInputProps {
  name: string;
  placeholder?: string;
}

const TitleInput: React.FC<TitleInputProps> = ({
  name,
  placeholder = "Movie Title",
}) => {
  const { watch, setError, clearErrors } = useFormContext();
  const title = watch(name);
  const debouncedTitle = useDebounce(title, 1000); // 500ms debounce
  const { data, isLoading, error } = useCheckTitleExists(debouncedTitle);

  useEffect(() => {
    if (debouncedTitle && debouncedTitle.length >= 2) {
      if (data?.exists) {
        setError(name, {
          type: "manual",
          message: "A movie with this title already exists",
        });
      } else if (data && !data.exists) {
        clearErrors(name);
      }
    }
  }, [data, debouncedTitle, name, setError, clearErrors]);

  const getStatusIcon = () => {
    if (isLoading) return <Info color="info" />;
    if (error) return <Info color="warning" />;
    if (data?.exists) return <Error color="error" />;
    if (data && !data.exists) return <CheckCircle color="success" />;
    return null;
  };

  const getStatusText = () => {
    if (isLoading) return "Checking title...";
    if (error) return "Unable to check title";
    if (data?.exists) return "Title already exists";
    if (data && !data.exists) return "Title is available";
    return "";
  };

  const getStatusColor = () => {
    if (isLoading) return "info";
    if (error) return "warning";
    if (data?.exists) return "error";
    if (data && !data.exists) return "success";
    return "default";
  };

  return (
    <TitleInputContainer>
      <GeneralInput name={name} placeholder={placeholder} />
      {debouncedTitle && debouncedTitle.length >= 2 && (
        <TitleStatus color={getStatusColor()}>
          {getStatusIcon()}
          <span>{getStatusText()}</span>
        </TitleStatus>
      )}
    </TitleInputContainer>
  );
};

export default TitleInput;
