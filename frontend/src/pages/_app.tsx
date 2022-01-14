import "../comp/styles/index.css";
import { ThemeProvider } from "next-themes";

export default function Nyxa({ Component, pageProps: { ...pageProps } }) {
	return (
		<ThemeProvider attribute="class">
			<Component {...pageProps} />
		</ThemeProvider>
	);
}
