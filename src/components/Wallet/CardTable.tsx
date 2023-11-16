import { ITransaction } from "@/src/interfaces/transaction";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

type CardTableProps = {
    transactions: ITransaction[];
};

export const CardTable: React.FC<CardTableProps> = ({ transactions }) => {
    return (
        <Card className='w-1/2'>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    );
};
