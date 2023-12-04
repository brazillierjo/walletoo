"use client";

import { userAtom } from "@/src/atoms/user.atom";
import { DisabledLink, RouterLink } from "@/src/components/Commons/Links";
import { links } from "@/src/utils/links";
import { useAtom } from "jotai";

export const Footer: React.FC = () => {
  const [user] = useAtom(userAtom);
  const navigationLinks = links.filter((link) => link.isInHeader || link.isInSidebar);
  const footerLinks = links.filter((link) => link.isInFooter);

  return (
    <footer className="mx-auto border-t border-gray-300 bg-secondary px-4 pt-2 text-sm dark:border-gray-700 lg:flex-row lg:px-8">
      <div className="mx-auto mb-5 flex w-full justify-evenly pt-5">
        <div className="flex flex-col gap-5">
          <h4 className="text-md font-bold">Menu de navigation</h4>

          <div className="flex flex-col gap-3">
            {navigationLinks.map((link, index) =>
              link.isSubscribedRequired && !user?.isSubscribed ? (
                <DisabledLink key={index} link={link} />
              ) : (
                <RouterLink key={index} link={link} />
              )
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h4 className="text-md font-bold">En savoir plus</h4>

          <div className="flex flex-col gap-3">
            {footerLinks.map((link, index) =>
              link.isSubscribedRequired && !user?.isSubscribed ? (
                <DisabledLink key={index} link={link} />
              ) : (
                <RouterLink key={index} link={link} />
              )
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700">
        <p className="py-2 text-center">
          © {new Date().getFullYear()} <b>Walletoo</b>. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};
