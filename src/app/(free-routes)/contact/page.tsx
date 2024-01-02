import { Button } from "@/src/components/ui/button";
import { CgWebsite } from "react-icons/cg";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact: React.FC = () => {
  return (
    <div className="py-4 lg:py-16">
      <div className="container rounded-lg bg-white p-6 shadow dark:bg-gray-900">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Prenez contact pour toute question ou demande de renseignement.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="mt-6 text-2xl font-semibold">Contact direct</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Envoyez-moi un courriel et je vous répondrai dans les plus brefs délais.
            </p>
            <Button>
              <a className="flex items-center gap-2" href="mailto:j.brazillier@gmail.com">
                <MdEmail className="h-4 w-4" />
                e-mail
              </a>
            </Button>
          </div>

          <div className="space-y-4">
            <h2 className="mt-6 text-2xl font-semibold">Retrouver-moi sur ces plateformes</h2>
            <p className="text-gray-500 dark:text-gray-400">Plus d'informations sur mon parcours et mes projets.</p>

            <div className="flex gap-4">
              <Button>
                <a
                  className="flex items-center gap-2"
                  href="https://brazillierjohan.fr"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <CgWebsite className="h-4 w-4" />
                  Portfolio
                </a>
              </Button>

              <Button>
                <a
                  className="flex items-center gap-2"
                  href="https://github.com/brazillierjo"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaGithubSquare className="h-4 w-4" />
                  GitHub
                </a>
              </Button>

              <Button>
                <a
                  className="flex items-center gap-2"
                  href="https://linkedin.com/in/johan-r-brazillier-9b917a174"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
