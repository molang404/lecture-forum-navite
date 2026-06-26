import { TextInputProps, View } from "react-native";
import { StyleSizeType } from "../../../types/style";
import { twMerge } from "tailwind-merge";
import Label from "../form/Label";
import ErrorMessage from "../form/ErrorMessage";
import Textarea from "./Textarea";

interface TextAreaGroupProps extends TextInputProps {
    label?: string;
    errorMessage?: string;
    wrap?: boolean;
    size?: StyleSizeType;
}

function TextareaGroup({
    label,
    errorMessage,
    wrap,
    className,
    size = "medium",
    ...props
}: TextAreaGroupProps) {
    return (
        <View className={twMerge("w-full mb-4", wrap && "flex-1", className)}>
            {label && <Label size={size}>{label}</Label>}
            <Textarea hasError={!!errorMessage} size={size} {...props} />
            {errorMessage && <ErrorMessage size={size}>{errorMessage}</ErrorMessage>}
        </View>
    );
}

export default TextareaGroup;
