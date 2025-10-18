
interface TitleProps {
    title: string;
}

export const Title: React.FC <TitleProps>= ({ title }) => {
    return (
        <div className="text-3xl font-bold text-[var(--primary-color)] mb-6">{title}</div>
    );
};
