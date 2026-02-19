'use client';
import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const Header = () => {
    const pathName = usePathname();
    return (
        <header>
            <div className="main-container inner flex items-center justify-between">

                <Link href="/">
                    <Image
                        src="/logo.svg"
                        alt="CoinPulse logo"
                        width={132}
                        height={40}
                    />
                </Link>

                <nav className="flex items-center gap-6">

                    <Link href='/' className={cn('nav-link', {
                        'is-active': pathName === '/',
                        'is-home': true
                    })}>
                        Home
                    </Link>

                    <Link href="/coins" className={cn('nav-link', {
                        'is-active': pathName === '/coins'
                    })}>
                        All Coins
                    </Link>

                    <p>Search Modal</p>

                </nav>

            </div>
        </header>

    )
}
export default Header
