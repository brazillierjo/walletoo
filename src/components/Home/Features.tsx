import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";

export const Features: React.FC = () => {
  return (
    <section className="mx-auto py-12 md:py-24 lg:py-32">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Tableau de bord</CardTitle>
            <CardDescription>Gérez et organisez vos activités quotidiennes en un seul endroit.</CardDescription>
          </CardHeader>

          <CardContent>
            <ul className="list-inside list-disc space-y-2">
              <li>
                <Badge>Prise de notes</Badge>
              </li>
              <li>
                <Badge>Mises à jour météorologiques</Badge>
              </li>
              <li>
                <Badge>Calendrier</Badge>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Portefeuille</CardTitle>
            <CardDescription>
              Visualisez et comprenez vos données financières à travers des graphiques et des analyses.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Page Stratégie</CardTitle>
            <CardDescription>
              Obtenez des analyses approfondies et comparez vos performances financières avec les recommandations de
              grandes organisations financières internationales.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  );
};
