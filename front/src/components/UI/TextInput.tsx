type TextInputProps = {
    label: string;
    value: string | number;
    required?: boolean;
    type?: React.HTMLInputTypeAttribute;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function TextInput({
    label,
    value,
    required = false,
    type = "text",
    onChange,
    }: TextInputProps) {
    return (
        <div className="flex flex-col gap-2 w-full">
        <label
            className="font-medium"
            style={{ color: "var(--text)" }}
        >
            {label}
            {required && (
            <span className="ml-1 text-red-500">*</span>
            )}
        </label>

        <input
            type={type}
            value={value}
            required={required}
            onChange={onChange}
            className="
            w-full
            rounded-xl
            border
            px-4
            py-3
            text-sm
            shadow-sm
            outline-none
            transition
            duration-200
            focus:border-transparent
            focus:ring-2
            "
            style={{
            backgroundColor: "var(--surface)",
            color: "var(--text)",
            borderColor: "var(--border)",
            }}
        />
        </div>
    );
}