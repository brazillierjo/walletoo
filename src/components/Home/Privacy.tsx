import { FaUniversalAccess } from "react-icons/fa6";
import { MdOutlineSecurity, MdPrivacyTip } from "react-icons/md";
import { SiAltiumdesigner } from "react-icons/si";

export const Privacy: React.FC = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl items-center px-4 py-8 lg:grid lg:grid-cols-4 lg:gap-16 lg:px-6 lg:py-24 xl:gap-24">
        <div className="col-span-2 mb-8">
          <p className="text-lg font-medium text-blue-600 dark:text-blue-500">Sécurité et Facilité</p>

          <h2 className="mb-4 mt-3 text-3xl font-extrabold tracking-tight text-gray-900 md:text-3xl dark:text-white">
            Vos données sont en sécurité 🔐
          </h2>

          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Chez Walletoo, nous redéfinissons la gestion de vos finances avec sécurité et simplicité. Profitez d'une
            expérience utilisateur fluide, soutenue par une authentification sécurisée et une politique de
            confidentialité rigoureuse.
          </p>

          <div className="mt-6 space-y-4 border-t border-gray-200 pt-6 dark:border-gray-700">
            <div>
              <p className="inline-flex items-center text-base font-medium text-blue-600 dark:text-blue-500">
                Authentification aisée via OAuth, sans les tracas de l'email.
              </p>
            </div>

            <div>
              <p className="inline-flex items-center text-base font-medium text-blue-600 dark:text-blue-500">
                Contrôle total de votre compte - Réinitialisation et suppression en un clic.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-2 space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0">
          <div>
            <FaUniversalAccess className="h-10 w-10 fill-blue-500" />
            <h3 className="mb-2 text-2xl font-bold dark:text-white">Accès simplifié</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Avec Walletoo, dites adieu aux inscriptions complexes. Connectez-vous rapidement et en toute sécurité
              grâce à l'authentification OAuth.
            </p>
          </div>

          <div>
            <MdOutlineSecurity className="h-10 w-10 fill-blue-500" />
            <h3 className="mb-2 text-2xl font-bold dark:text-white">Sécurité personnalisable</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Choisissez parmi une variété de services tiers pour une sécurité renforcée qui respecte vos préférences
              personnelles.
            </p>
          </div>

          <div>
            <MdPrivacyTip className="h-10 w-10 fill-blue-500" />
            <h3 className="mb-2 text-2xl font-bold dark:text-white">Confidentialité assurée</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Nous prenons la confidentialité au sérieux. Vos données restent protégées et sous votre contrôle total à
              chaque instant.
            </p>
          </div>

          <div>
            <SiAltiumdesigner className="h-10 w-10 fill-blue-500" />
            <h3 className="mb-2 text-2xl font-bold dark:text-white">Flexibilité et facilité</h3>
            <p className="font-light text-gray-500 dark:text-gray-400">
              Profitez d'une expérience utilisateur fluide et flexible, conçue pour une gestion financière sans tracas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
