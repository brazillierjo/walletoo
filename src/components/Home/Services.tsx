import { Card, CardContent, CardHeader } from "@/src/components/ui/card";

export const Services: React.FC = () => {
  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Experience Our Exciting Features</h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Walletoo offers a range of features designed to help you make informed financial decisions.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Smart Budgeting</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Create and manage your budgets with ease. Get insights into your spending patterns and make adjustments
                as needed.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Expense Tracking</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Keep track of your expenses. Know where your money is going and identify areas where you can save.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Financial Goals</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Set financial goals and work towards achieving them. We'll provide you with the tools and advice to help
                you get there.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
