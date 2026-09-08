import type { ReactNode } from "react";
import { ToolSurface } from "@/components/catalog/ToolSurface";
export default function TypingTemplate({
	children,
}: {
	readonly children: ReactNode;
}) {
	return <ToolSurface>{children}</ToolSurface>;
}
