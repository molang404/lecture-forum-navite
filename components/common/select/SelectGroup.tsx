import { StyleSizeType } from "../../../types/style";
import Select, { SelectOptionType } from "./Select";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import Label from "../form/Label";
import ErrorMessage from "../form/ErrorMessage";

interface SelectGroupProps {
    label?: string;
    errorMessage?: string;
    options: SelectOptionType[]; // Select를 클릭하면 나와야 하는 옵션들 정보 array
    value?: string | number; // 선택된 값
    onSelect: (value: string | number) => void; // 옵션을 선택할 때 받동될 함수
    placeholder?: string;
    wrap?: boolean;
    size?: StyleSizeType;
    className?: string;
}

function SelectGroup({
    label,
    errorMessage,
    options,
    value,
    onSelect,
    placeholder,
    wrap,
    size = "medium",
    className,
}: SelectGroupProps) {
    return (
        <View className={twMerge("w-full mb-4", wrap && "flex-1", className)}>
            {label && <Label size={size}>{label}</Label>}
            <Select
                options={options}
                onSelect={onSelect}
                value={value}
                placeholder={placeholder}
                hasError={!!errorMessage}
                size={size}
            />
            {errorMessage && <ErrorMessage size={size}>{errorMessage}</ErrorMessage>}
        </View>
    );
}

export default SelectGroup;
