import { Button } from "@/src/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

type EditableContentSelectProps = {
    options: string[];
    value: string;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    onChange: (value: string) => void;
};

export const EditableContentSelect: React.FC<EditableContentSelectProps> = ({
    options,
    value,
    isEditing,
    setIsEditing,
    onChange,
}) => {
    const handleValueChange = (newValue: string) => {
        onChange(newValue);
        setIsEditing(false);
    };

    return (
        <div>
            {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} variant='outline'>
                    {value}
                </Button>
            ) : (
                <Select defaultValue={value} onValueChange={handleValueChange}>
                    <SelectTrigger>
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
            )}
        </div>
    );
};
