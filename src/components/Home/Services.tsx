import Image from "next/image";
import FeatureOne from "@/public/assets/webp/feature-1.webp";
import FeatureTwo from "@/public/assets/webp/feature-2.webp";
import { FaCircleCheck } from "react-icons/fa6";

export const Services: React.FC = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl space-y-12 px-4 py-8 lg:space-y-20 lg:px-20 lg:py-24">
        <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <div className="text-gray-500 dark:text-gray-400 sm:text-lg">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Accéder à des outils que vous connaissez 📝
            </h2>

            <p className="mb-8 font-light lg:text-xl">
              Découvrez la simplicité avec notre outil de gestion financière. Conçu pour une mise en place rapide et une
              utilisation aisée, vous pourrez sans effort entrer vos revenus et charges, et naviguer entre les
              différents outils. Que ce soit pour visualiser des graphiques détaillés ou catégoriser vos transactions,
              tout est à portée de clic.
            </p>

            <ul role="list" className="my-7 space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700">
              <li className="flex space-x-3">
                <FaCircleCheck className="fill-primary" />
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Saisie rapide des revenus et charges
                </span>
              </li>

              <li className="flex space-x-3">
                <FaCircleCheck className="fill-primary" />
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Visualisation intuitive des données financières
                </span>
              </li>

              <li className="flex space-x-3">
                <FaCircleCheck className="fill-primary" />
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Catégorisation des transactions
                </span>
              </li>
            </ul>
          </div>

          <Image className="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex" src={FeatureTwo} alt="Known Tools" />
        </div>

        <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
          <Image className="mb-4 hidden w-full rounded-lg lg:mb-0 lg:flex" src={FeatureOne} alt="Walletoo Features" />

          <div className="text-gray-500 dark:text-gray-400 sm:text-lg">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Gérez vos finances avec flexibilité et précision
            </h2>

            <p className="mb-8 font-light lg:text-xl">
              Walletoo rend la gestion de vos finances personnelles plus intuitive et adaptée à vos besoins. Choisissez
              votre devise, paramétrez votre langue, et visualisez vos transactions dans le format qui vous convient le
              mieux.
            </p>

            <ul role="list" className="my-7 space-y-5 border-t border-gray-200 pt-8 dark:border-gray-700">
              <li className="flex space-x-3">
                <FaCircleCheck className="fill-primary" />
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Choix de la devise pour des calculs précis
                </span>
              </li>

              <li className="flex space-x-3">
                <FaCircleCheck className="fill-primary" />
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Adaptation à votre langue pour une utilisation aisée
                </span>
              </li>

              <li className="flex space-x-3">
                <FaCircleCheck className="fill-primary" />
                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">
                  Format des transactions adapté (Européen ou Américain)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
