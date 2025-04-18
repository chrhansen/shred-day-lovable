
interface SelectionPillProps {
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export function SelectionPill({ label, selected = false, onClick }: SelectionPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
        ${selected 
          ? 'bg-blue-900 text-white' 
          : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
        }`}
    >
      {label}
    </button>
  );
}
