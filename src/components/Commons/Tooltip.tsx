import { BsQuestionCircle } from "react-icons/bs";
import { Button } from "@/src/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/src/components/ui/hover-card";

type TooltipProps = {
    title?: string;
    description?: string;
};

export const Tooltip: React.FC<TooltipProps> = ({ title, description }) => {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <Button variant='link'>
                    <BsQuestionCircle />
                </Button>
            </HoverCardTrigger>

            <HoverCardContent>
                <div className='flex flex-col gap-5'>
                    {title && <h3 className='text-sm font-semibold'>{title}</h3>}
                    {description && <p className='text-sm font-normal'>{description}</p>}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
};
