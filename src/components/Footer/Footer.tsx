"use client";
import React from "react";
import { Logo } from "../Commons/Logo";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/src/components/ui/navigation-menu";
import { cn } from "@/src/utils/tailwindMerge";
import { Route } from "@/src/enums/frontend-routes";
import { links } from "@/src/utils/navbarLinks";

export const Footer: React.FC = () => {
    const components: { title: string; href: string; description: string }[] = [
        {
            title: "Contact",
            href: Route.CONTACT,
            description: "Contactez-nous pour toute question ou suggestion",
        },
        {
            title: "A propos",
            href: Route.ABOUT,
            description: "En savoir plus sur Walletoo",
        },
        {
            title: "Conditions générales d'utilisation",
            href: Route.TERMS,
            description: "Consultez nos conditions générales d'utilisation",
        },
        {
            title: "Politique de confidentialité",
            href: Route.PRIVACY,
            description: "Consultez notre politique de confidentialité",
        },
        {
            title: "Mentions légales",
            href: Route.LEGAL_NOTICE,
            description: "Consultez nos mentions légales",
        },
    ];

    return (
        <footer className='mx-auto flex items-center justify-between px-4 py-2 lg:px-8'>
            <NavigationMenu>
                <NavigationMenuList className='gap-8'>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Navigation sur Waletoo</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]'>
                                <li className='row-span-3'>
                                    <NavigationMenuLink asChild>
                                        <a
                                            className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md'
                                            href={Route.HOME}>
                                            <Logo />
                                            <div className='mb-2 mt-4 text-lg font-medium'>Walettoo</div>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                {links.map((link) => (
                                    <ListItem key={link.name} title={link.name} href={link.path}>
                                        {link.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>En savoir plus</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                                {components.map((component) => (
                                    <ListItem key={component.title} title={component.title} href={component.href}>
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            <div>
                <div className='text-sm text-muted-foreground'>
                    © {new Date().getFullYear()} <b>Walletoo</b>. Tous droits réservés.
                </div>
                <div className='text-sm text-muted-foreground'>
                    Fait avec <span className='text-accent'>❤️</span> par RINCON-BRAZILLIER Johan.
                    <a className='text-accent hover:underline focus:underline' href='' target='_blank'>
                        Walletoo
                    </a>
                </div>
            </div>
        </footer>
    );
};

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}>
                    <div className='text-sm font-medium leading-none'>{title}</div>
                    <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>{children}</p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
