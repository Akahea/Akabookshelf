type Option = {
    value: string;
    label: string;
};

type SelectProps = {
    label: string;
    value: string;
    options: Option[];
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const MySelect = ({ label, value, options, required, onChange }: SelectProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
        <label className="font-medium" style={{ color: "var(--text)" }}>
            {label}
        </label>

        <select
            value={value}
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
            required={required}
        >
            {options.map((option) => (
            <option key={option.value} value={option.value}>
                {option.label}
            </option>
            ))}
        </select>
        </div>
    );
};

export default MySelect;