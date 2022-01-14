import { useTheme } from "next-themes";

export default function MainLayout({ children }) {
	const { resolvedTheme, setTheme } = useTheme();

	return (
		<>
			<div data-theme={resolvedTheme} className="flex min-h-screen overflow-hidden bg-indigo-100 dark:bg-indigo-900 text-gray-900 dark:text-gray-50">
				<div className="relative flex flex-col flex-1 overflow-x-hidden">
					<main className="mx-3 my-3">
						{children}
					</main>
				</div>
			</div>
		</>
	);
}
