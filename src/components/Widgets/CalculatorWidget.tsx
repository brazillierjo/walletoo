import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

function Calculator() {
  const [resultValue, setResultValue] = useState("0");

  const handleBtnClick = (buttonValue: React.SetStateAction<string>) => {
    if (resultValue === "0") {
      setResultValue(buttonValue);
    } else {
      setResultValue(resultValue + buttonValue);
    }
  };

  const handleCalculate = () => {
    try {
      setResultValue(eval(resultValue).toString());
    } catch (error) {
      setResultValue("Error");
    }
  };

  const handleClear = () => {
    setResultValue("0");
  };

  return (
    <Card className="h-fit min-h-[350px] w-full flex-shrink-0 px-4 pb-2 pt-6 sm:w-1/2 lg:w-[300px]">
      <h4 className="text-center text-sm font-semibold uppercase">Ma calculatrice</h4>

      <Input className="mx-auto my-8 w-48 text-right" type="text" value={resultValue} readOnly />

      <div className="mt-2 flex w-full justify-center gap-2">
        <Button variant="outline" onClick={() => handleBtnClick("7")}>
          7
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("8")}>
          8
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("9")}>
          9
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("+")}>
          +
        </Button>
      </div>

      <div className="mt-2 flex w-full justify-center gap-2">
        <Button variant="outline" onClick={() => handleBtnClick("4")}>
          4
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("5")}>
          5
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("6")}>
          6
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("-")}>
          -
        </Button>
      </div>

      <div className="mt-2 flex w-full justify-center gap-2">
        <Button variant="outline" onClick={() => handleBtnClick("1")}>
          1
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("2")}>
          2
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("3")}>
          3
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("*")}>
          *
        </Button>
      </div>

      <div className="mt-2 flex w-full justify-center gap-2">
        <Button variant="outline" onClick={() => handleBtnClick("0")}>
          0
        </Button>
        <Button variant="outline" onClick={handleClear}>
          C
        </Button>
        <Button variant="outline" onClick={handleCalculate}>
          =
        </Button>
        <Button variant="outline" onClick={() => handleBtnClick("/")}>
          /
        </Button>
      </div>
    </Card>
  );
}

export default Calculator;
