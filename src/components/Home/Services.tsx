import { Card, CardContent, CardHeader } from "@/src/components/ui/card";

export const Services: React.FC = () => {
  return (
    <section id="details" className="w-full bg-gray-100 py-12 dark:bg-gray-700 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Optimisez votre santé financière.</h2>

            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Walletoo vous offre un outil de suivi financier. Entrez vos revenus et vos charges mensuels, et nous nous
              occupons du reste.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Visualisation Financière</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Explorez l'évolution de votre santé financière avec des analyses détaillées et des graphiques
                interactifs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Analyse des Économies</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Découvrez des stratégies personnalisées pour optimiser vos dépenses et augmenter vos économies.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-xl font-bold">Planification Stratégique</h3>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 dark:text-gray-400">
                Concrétisez vos objectifs financiers futurs grâce à un plan de gestion de finances sur mesure.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;
