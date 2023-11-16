"use client";
import { Route } from "@/src/enums/frontend-routes";
import Link from "next/link";

export default function Logo() {
    return (
        <Link className='h-fit' href={Route.HOME}>
            <div className='text-4xl font-bold text-[#2e388b] dark:text-white'>
                Wale<span className='font-extrabold text-[#6574aa]'>too</span>
            </div>
        </Link>
    );
}
