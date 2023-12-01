import { DynamicUrlParams } from "@/src/enums/dynamicUrlParams";
import { IOperation } from "@/src/interfaces/operationInterface";
import { requestCheck } from "@/src/utils/requestCheck";
import { sessionCheck } from "@/src/utils/sessionCheck";

export async function POST(req: Request, config: { params: { type: string } }) {
  try {
    const user = await sessionCheck();
    const { type } = config.params;
    const { label, amount } = await req.json();
    const newOperation = { label, amount };

    requestCheck(req, type);

    if (type === DynamicUrlParams.INCOMES) {
      user.incomes.push(newOperation);
      await user.save();

      return Response.json({
        data: user.incomes[user.incomes.length - 1],
        message: "Operation added.",
        status: 200,
      });
    }

    if (type === DynamicUrlParams.EXPENSES) {
      user.expenses.push(newOperation);
      await user.save();
      return Response.json({
        data: user.expenses[user.expenses.length - 1],
        message: "Operation added.",
        status: 200,
      });
    }

    return Response.json({
      message: "There was an error during the POST request.",
      status: 500,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return Response.json({ message: error.message, status: 500 });
    }

    return Response.json({ message: "Internal Server Error", status: 500 });
  }
}

export async function PUT(req: Request, config: { params: { type: string } }) {
  try {
    const user = await sessionCheck();
    const { type } = config.params;
    const { _id, label, amount, category } = await req.json();

    requestCheck(req, type);

    if (type === DynamicUrlParams.INCOMES) {
      const index = user.incomes.findIndex((income: IOperation) => income._id?.toString() === _id);
      user.incomes[index] = { _id, label, amount, category };
      await user.save();

      return Response.json({
        data: user.incomes[index],
        message: "Operation updated.",
        status: 200,
      });
    }

    if (type === DynamicUrlParams.EXPENSES) {
      const index = user.expenses.findIndex((expense: IOperation) => expense._id?.toString() === _id);
      user.expenses[index] = { _id, label, amount, category };
      await user.save();

      return Response.json({
        data: user.expenses[index],
        message: "Operation updated.",
        status: 200,
      });
    }

    return Response.json({
      message: "There was an error during the PUT request.",
      status: 500,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return Response.json({ message: error.message, status: 500 });
    }

    return Response.json({ message: "Internal Server Error", status: 500 });
  }
}

export async function DELETE(req: Request, config: { params: { type: string } }) {
  try {
    const user = await sessionCheck();
    const { type } = config.params;
    const { _id } = await req.json();

    requestCheck(req, type);

    if (type === DynamicUrlParams.INCOMES)
      user.incomes = user.incomes.filter((income: IOperation) => income._id?.toString() !== _id);
    if (type === DynamicUrlParams.EXPENSES)
      user.expenses = user.expenses.filter((expense: IOperation) => expense._id?.toString() !== _id);

    await user.save();

    return Response.json({ message: "Operation deleted.", status: 200 });
  } catch (error) {
    console.error(error);

    if (error instanceof Error) {
      return Response.json({ message: error.message, status: 500 });
    }

    return Response.json({ message: "Internal Server Error", status: 500 });
  }
}
