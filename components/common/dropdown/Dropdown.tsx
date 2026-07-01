import { ReactNode, useState } from "react";
import { Platform, Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface DropdownProps {
    trigger: ReactNode; // 화면에 출력되는 버튼 역할 컴포넌트가 들어가는 props
    // children에 컴포넌트를 그냥 집어넣을 수도 있고
    // close: () => {} 라는 매개변수 함수를 넣어서 컴포넌트를 리턴하는 것을 넣을 수도 있다
    children: ReactNode | ((close: () => void) => ReactNode);
    className?: string;
    dropdownClassName?: string;
}

function Dropdown({ trigger, children, className, dropdownClassName }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const close = () => setIsOpen(false);

    return (
        <View className={twMerge("relative", "z-50", className)}>
            <Pressable onPress={() => setIsOpen(!isOpen)}>{trigger}</Pressable>

            {isOpen && (
                <>
                    {/* 백드롭 : 외부를 클릭하면 닫히도록 하기 위함 */}
                    <Pressable
                        onPress={close}
                        className={"z-40"}
                        style={
                            Platform.OS === "web"
                                ? {
                                      // 웹에서는 화면 전체를 감싸기 위해
                                      // fixed를 하고, 각 네 귀퉁이를 잡아주면 됨
                                      position: "fixed",
                                      top: 0,
                                      left: 0,
                                      right: 0,
                                      bottom: 0,
                                  }
                                : {
                                      // 앱에서는 fixed가 없어서
                                      // absolute를 주고, 값을 무지막지하게 크게 주면 됨
                                      position: "absolute",
                                      top: -1000,
                                      left: 1000,
                                      width: 3000,
                                      height: 3000,
                                  }
                        }
                    />
                    <View
                        className={twMerge(
                            // top, left, right, bottom 은 부모 기준
                            // translate는 내가 기준
                            // "left-1/2", "-translate-x-1/2",
                            ["absolute", "top-full", "left-0"],
                            ["mt-2", "z-50", "min-w-[150px]", "shadow-md"],
                            ["bg-background-paper", "border-divider", "rounded-lg"],
                            dropdownClassName,
                        )}>
                        {typeof children === "function" ? children(close) : children}
                    </View>
                </>
            )}
        </View>
    );
}

export default Dropdown;

// position ---------------------
// relative
// absolute: 어느 지점을 Anchor (닻, 기준점) 배치
// => 기준점을 잡는 방식: 부모로 거슬러 올라가면서
//    가장 가까이 있는 relative를 찾아서 그 부모를 기준점으로 함
// 이 2개는 웹에는 있고 앱에는 없음
// fixed: 이 자리 고정 배치
// sticky: fixed인데, 스크롤 내려도 고정
