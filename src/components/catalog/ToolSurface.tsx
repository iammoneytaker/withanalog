"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import styles from "./ToolSurface.module.css";

export function ToolSurface({ children }: { readonly children: ReactNode }) {
	const pathname = usePathname();
	const usesShell = [
		"/tools",
		"/tools/keyboard-input-test",
		"/tools/kps-test",
		"/tools/rapid-trigger-test",
	].includes(pathname);
	if (usesShell) return <>{children}</>;
	return <div className={styles.surface}>{children}</div>;
}
