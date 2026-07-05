type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
};

export function MyButton({ children, onClick, type = "button" }: ButtonProps) {
    return (
        <button
        type={type}
        onClick={onClick}
        className="rounded-full px-4 py-2 font-medium shadow-sm transition hover:scale-105"
        style={{
            backgroundColor: "var(--primary)",
            color: "white",
        }}
        >
        {children}
        </button>
    );
}