import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";

type EditableContentSelectProps = {
    options: string[];
    value: string;
    onChange: (value: string) => void;
};

export const EditableContentSelect: React.FC<EditableContentSelectProps> = ({ options, value, onChange }) => {
    return (
        <Select defaultValue={value} onValueChange={(newValue) => onChange(newValue)}>
            <SelectTrigger className='w-fit'>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option} value={option}>
                        {option}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};
