import { Fragment, useEffect, useState } from "react";
import { CitiesApi } from "@/src/APIs/citiesApi";
import { UserApi } from "@/src/APIs/userApi";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select";
import { Separator } from "@/src/components/ui/separator";
import { toast } from "@/src/components/ui/use-toast";
import { IUser } from "@/src/interfaces/userInterface";
import { currencies } from "@/src/utils/currencies";
import { operationFormats } from "@/src/utils/operationFormats";
import { temperaturesUnit } from "@/src/utils/temperaturesUnit";
import { IoClose } from "react-icons/io5";

type EditableComponentProps = {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
};

export const OperationFormatSelect: React.FC<EditableComponentProps> = ({ user, setUser }) => {
  const handleFormatChange = (newFormat: string) => {
    if (user && newFormat !== user.operationFormat) {
      UserApi.patch({ operationFormat: newFormat }).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user };
          newUser.operationFormat = newFormat;

          setUser(newUser);
          toast({
            title: "Format des opérations",
            description: "Le format des opérations a bien été mis à jour.",
          });
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="whitespace-nowrap">Format des opérations :</p>
      <Select defaultValue={user.operationFormat ?? ""} onValueChange={(newValue) => handleFormatChange(newValue)}>
        <SelectTrigger className="w-fit">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {operationFormats.map((option) => (
            <SelectItem key={option.name} value={option.name}>
              <div className="flex items-center gap-3">
                {option.name} <span className="text-xs opacity-70">{option.example}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const CurrencySelect: React.FC<EditableComponentProps> = ({ user, setUser }) => {
  const handleCurrencyChange = (newCurrency: string) => {
    if (user && newCurrency !== user.currency) {
      UserApi.patch({ currency: newCurrency }).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user };
          newUser.currency = newCurrency;

          setUser(newUser);
          toast({
            title: "Devise",
            description: "La devise a bien été mise à jour.",
          });
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="whitespace-nowrap">Devise des opérations :</p>
      <Select defaultValue={user.currency ?? ""} onValueChange={(newValue) => handleCurrencyChange(newValue)}>
        <SelectTrigger className="w-fit">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {currencies.map((option) => (
            <SelectItem key={option.name} value={option.name}>
              <div className="flex items-center gap-3">
                {option.name} <span className="text-xs opacity-70">({option.symbol})</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const CityInput: React.FC<EditableComponentProps> = ({ user, setUser }) => {
  const [inputValue, setInputValue] = useState<string>(user.city);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleCityChange = (newCity: string) => {
    if (user && newCity !== user.city) {
      UserApi.patch({ city: newCity }).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user };
          newUser.city = newCity;

          setUser(newUser);
          toast({
            title: "Ville",
            description: "La ville a bien été mise à jour.",
          });
        }
      });
    }
  };

  useEffect(() => {
    const fetchCities = async () => {
      if (inputValue.length >= 3 && isSearching) {
        await CitiesApi.get(inputValue).then((res) => {
          const cities = res.geonames.map((city) => city.name);
          setSuggestions(cities);
        });
      }
    };

    const delayDebounceFn = setTimeout(() => {
      setIsSearching(true);
      fetchCities();
    }, 500);

    return () => {
      clearTimeout(delayDebounceFn);
      setIsSearching(false);
    };
  }, [inputValue]);

  return (
    <div className="relative flex items-center gap-2">
      <p className="whitespace-nowrap">Ville (widget météo) :</p>

      <div className="relative">
        <Input
          className="w-full min-w-[200px] max-w-[200px]"
          placeholder="Rechercher une ville..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setSuggestions(null);
            setIsSearching(true);
          }}
        />

        {inputValue.length > 0 && (
          <Button
            onClick={() => {
              setInputValue("");
              setSuggestions(null);
              setIsSearching(false);
              handleCityChange("");
            }}
            variant="ghost"
            className="absolute right-0 -translate-y-9"
          >
            <IoClose />
          </Button>
        )}
      </div>

      {suggestions && (
        <div className="absolute left-10 top-8 z-10 w-[250px] rounded-md bg-white shadow-lg dark:bg-slate-800">
          {suggestions.map((city) => (
            <Fragment key={city}>
              <Button
                key={city}
                className="w-full"
                variant="ghost"
                onClick={() => {
                  setInputValue(city);
                  setSuggestions(null);
                  setIsSearching(false);
                  handleCityChange(city);
                }}
              >
                {city}
              </Button>

              <Separator className="dark:bg-gray-500" />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export const TemperatureUnitSelect: React.FC<EditableComponentProps> = ({ user, setUser }) => {
  const handleTemperaturesUnitChange = (newTemperatureUnit: string) => {
    if (user && newTemperatureUnit !== user.temperatureUnit) {
      UserApi.patch({ temperatureUnit: newTemperatureUnit }).then((res) => {
        if (res.status === 200) {
          const newUser = { ...user };
          newUser.temperatureUnit = newTemperatureUnit;

          setUser(newUser);
          toast({
            title: "Unité des températures",
            description: "L'unité des températures a bien été mise à jour.",
          });
        }
      });
    }
  };

  return (
    <div className="flex items-center gap-2">
      <p className="whitespace-nowrap">Unité des températures :</p>
      <Select
        defaultValue={user.temperatureUnit ?? ""}
        onValueChange={(newValue) => handleTemperaturesUnitChange(newValue)}
      >
        <SelectTrigger className="w-fit">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {temperaturesUnit &&
            temperaturesUnit.map((option, index) => (
              <SelectItem key={index} value={option.name}>
                <span className="flex items-center gap-3">
                  {option.name} <span className="text-xs opacity-70">({option.symbol})</span>
                </span>
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
};
