import { Text, TextProps, View, TouchableOpacity, TouchableOpacityProps, ActivityIndicator, ViewProps } from "react-native";
import clsx from "clsx";
import { createContext, useContext } from "react";

type Variants = "primary" | "secondary"

type ButtonProps = TouchableOpacityProps & ViewProps & {
    variant?: Variants
    isLoading?: boolean //loading que impede a pessoa ficar mandando várias requisições apertando o botão (bloquea botão quando aperta)
}

const ThemeContent = createContext<{ variant?: Variants }>({})

function Button({
    variant = "primary",
    children,
    isLoading,
    className,
    ...rest
}: ButtonProps) {
    return <TouchableOpacity
        disabled={isLoading}
        activeOpacity={0.7}
        style={{ marginTop: 16, }}
        {...rest}
    >
        <View className={clsx("h-11 flex-row items-center justify-center rounded-lg gap-2 px-2",
            {
                "bg-lime-300": variant === "primary",
                "bg-zinc-800": variant === "secondary",
            },
            className
        )}
            {...rest}>
            <ThemeContent.Provider value={{ variant }}>
                {isLoading ? <ActivityIndicator className="text-lime-950" /> : children}
            </ThemeContent.Provider>
        </View>
    </TouchableOpacity>
}

function Title({ children }: TextProps) {
    const { variant } = useContext(ThemeContent)

    return <Text
        className={clsx("text-base font-semibold", {
            "text-lime-950": variant === "primary",
            "text-zinc-200": variant === "secondary",
        })}>{children}</Text>
}

Button.Title = Title

export { Button }