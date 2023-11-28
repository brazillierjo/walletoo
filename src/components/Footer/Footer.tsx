import { Logo } from "@/src/components/Commons/Logo";
import { links } from "@/src/utils/links";

export const Footer: React.FC = () => {
    const navigationLinks = links.filter((link) => link.isInHeader || link.isInSidebar);
    const footerLinks = links.filter((link) => link.isInFooter);

    return (
        <footer className='mx-auto border-t border-gray-300 px-4 py-5 text-sm text-muted-foreground dark:border-gray-700 lg:flex-row lg:px-8'>
            <div className='flex justify-between gap-6'>
                <Logo withLabel />

                <div className='flex'>
                    <div className='flex w-full flex-col'>
                        {navigationLinks.map((link, index) => (
                            <a key={index} href={link.to} className='mb-2 text-sm hover:text-primary'>
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className='flex w-full flex-col'>
                        {footerLinks.map((link, index) => (
                            <a key={index} href={link.to} className='mb-2 text-sm hover:text-primary'>
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>

                <p>
                    © {new Date().getFullYear()} <b>Walletoo</b>. Tous droits réservés.
                </p>
            </div>
        </footer>
    );
};
