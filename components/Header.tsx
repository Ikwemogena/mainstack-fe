'use client'

import Image from "next/image";
import Link from 'next/link'
import { usePathname } from "next/navigation";
export default function Header() {
    const currentPath = usePathname();
    return (
        <div className="header">
            <Image
                src="/assets/mainstack-logo.svg"
                alt="Mainstack Logo"
                width={36}
                height={36}
                priority
            />
            <nav className="header__nav">
                <ul className="header__nav-list">
                    <li>
                        <Link href="/">
                            <Image
                                src="/assets/icons/home-icon.svg"
                                alt="Mainstack Logo"
                                width={20}
                                height={20}
                                priority
                            />
                            Home
                        </Link>
                    </li>
                    <li><Link href="/"> <Image
                        src="/assets/icons/analytics-icon.svg"
                        alt="Mainstack Logo"
                        width={20}
                        height={20}
                        priority
                    />Analytics</Link></li>
                    <li><Link href="/" className={currentPath === '/' ? 'active' : ''}>
                        <Image
                            src="/assets/icons/payments-icon.svg"
                            alt="Revenue Icon"
                            width={20}
                            height={20}
                            priority
                        />Revenue</Link></li>
                    <li><Link href="/"><Image
                        src="/assets/icons/crm-icon.svg"
                        alt="CRM Icon"
                        width={20}
                        height={20}
                        priority
                    />CRM</Link></li>
                    <li><Link href="/"><Image
                        src="/assets/icons/apps-icon.svg"
                        alt="Mainstack Logo"
                        width={20}
                        height={20}
                        priority
                    />Apps</Link></li>
                </ul>
            </nav>

            <div className="header__actions">
                <div>
                    <Image
                        src="/assets/icons/notification-icon.svg"
                        alt="Mainstack Logo"
                        width={25}
                        height={25}
                        priority
                    />
                </div>
                <div>
                    <Image
                        src="/assets/icons/chat-icon.svg"
                        alt="Mainstack Logo"
                        width={25}
                        height={25}
                        priority
                    />
                </div>
                <div className="header__actions-menu">
                    <p className="header__actions-menu-profile">OJ</p>
                    <Image
                        src="/assets/icons/menu-icon.svg"
                        alt="Mainstack Logo"
                        width={25}
                        height={25}
                        priority
                    />
                </div>
            </div>
        </div>
    )
}