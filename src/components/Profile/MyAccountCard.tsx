"use client";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

interface IMyAccountCardProps {
    userProfile: any;
}

const MyAccountCard: React.FC<IMyAccountCardProps> = ({ userProfile }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Mon compte</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className='grid gap-4'>
                <div className=' flex items-center space-x-4 rounded-md border p-4'>
                    <div className='flex-1 space-y-1'>
                        <p className='text-sm font-medium leading-none'>Push Notifications</p>
                        <p className='text-sm text-muted-foreground'>Send notifications to device.</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <Button className='w-full'>Mark all as read</Button>
            </CardFooter>
        </Card>
    );
};

export default MyAccountCard;
