"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

const links = [
	{ href: "/keyboards", label: "키보드 도감" },
	{ href: "/compare", label: "비교하기" },
	{ href: "/tools", label: "테스트" },
	{ href: "/typing-practice", label: "타자 연습" },
	{ href: "/guides", label: "가이드" },
	{ href: "/methodology", label: "측정 기준" },
];

export default function Header() {
	const [open, setOpen] = useState(false);
	const pathname = usePathname();
	if (pathname === "/household-items") return null;
	return (
		<header className={styles.header}>
			<nav className={styles.nav} aria-label="주 메뉴">
				<Link href="/" className={styles.brand} onClick={() => setOpen(false)}>
					WithAnalog<span>KEYBOARD LAB</span>
				</Link>
				<button
					className={styles.toggle}
					aria-expanded={open}
					aria-controls="primary-links"
					onClick={() => setOpen(!open)}
					aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
				>
					{open ? "닫기 ×" : "메뉴 ☰"}
				</button>
				<div
					id="primary-links"
					className={`${styles.links} ${open ? styles.open : ""}`}
				>
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							aria-current={
								pathname === link.href || pathname.startsWith(`${link.href}/`)
									? "page"
									: undefined
							}
							onClick={() => setOpen(false)}
						>
							{link.label}
						</Link>
					))}
				</div>
			</nav>
		</header>
	);
}
