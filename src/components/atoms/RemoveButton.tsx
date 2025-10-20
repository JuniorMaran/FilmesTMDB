import React from 'react';

interface RemoveButtonProps {
    onClick: () => void;
    title: string;
    text: string;
}

export const RemoveButton: React.FC<RemoveButtonProps>=({ onClick, title, text }) => {
    return (
        <button
            title={title}
            onClick={onClick}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md px-4 py-2 transition-colors cursor-pointer">
            {text}
        </button>
    );
};
