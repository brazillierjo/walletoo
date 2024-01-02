import Link from "next/link";
import { Route } from "@/src/enums/frontendRoutes";

const Terms: React.FC = () => {
  return (
    <div className="py-4 lg:py-16">
      <div className="container mx-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-900">
        <h1 className="mb-6 text-3xl font-semibold">Conditions Générales d'Utilisation</h1>

        <p className="mb-4">
          Bienvenue sur Walletoo ! Ces conditions générales définissent les règles et réglementations d'utilisation de
          notre site web.
        </p>

        <p className="mb-4">
          En accédant à ce site web, nous supposons que vous acceptez ces conditions générales. N'utilisez pas Walletoo
          si vous n'acceptez pas l'ensemble des termes et conditions énoncés sur cette page.
        </p>

        <p className="mb-4">
          Consultez notre{" "}
          <Link href={Route.PRIVACY} className="text-blue-500">
            Politique de Confidentialité
          </Link>{" "}
          pour comprendre comment nous collectons, utilisons et protégeons vos informations personnelles.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Licence</h2>

        <p className="mb-4">
          Sauf indication contraire, Walletoo et/ou ses concédants détiennent les droits de propriété intellectuelle de
          l'ensemble des contenus présents sur Walletoo. Tous les droits de propriété intellectuelle sont réservés.
        </p>

        <h2 className="mb-4 text-xl font-semibold">Vous ne devez pas :</h2>

        <ul className="mb-4 ml-6 list-disc">
          <li>Republier du contenu provenant de Walletoo</li>
          <li>Vendre, louer ou concéder sous licence du contenu provenant de Walletoo</li>
          <li>Reproduire, dupliquer ou copier du contenu provenant de Walletoo</li>
        </ul>
      </div>
    </div>
  );
};

export default Terms;
