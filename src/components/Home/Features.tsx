import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";

export const Features: React.FC = () => {
  return (
    <main className="container mx-auto p-6">
      <div className="mb-8 grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
            <CardDescription>Manage and organize your daily activities in one place.</CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <Badge>Note-taking</Badge>
              </li>
              <li>
                <Badge>Weather updates</Badge>
              </li>
              <li>
                <Badge>Calendar</Badge>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="link">Learn more</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wallet Page</CardTitle>
            <CardDescription>Visualize and understand your financial data through charts and analyses.</CardDescription>
          </CardHeader>

          <CardContent>
            <BarChart className="aspect-[2/1] w-full" />
          </CardContent>
          <CardFooter>
            <Button variant="link">Learn more</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Strategy Page</CardTitle>
            <CardDescription>
              Get in-depth analyses and compare your financial performance with recommendations from major international
              financial organizations.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LineChart className="aspect-[2/1] w-full" />
          </CardContent>
          <CardFooter>
            <Button variant="link">Learn more</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};
