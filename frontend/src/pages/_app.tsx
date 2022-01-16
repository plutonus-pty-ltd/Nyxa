import "../comp/styles/index.css";

export default function Nyxa({ Component, pageProps: { ...pageProps } }) {
	return (
		<body className="bg-gray-800 font-sans antialiased min-h-screen">
			<Component {...pageProps} />
		</body>
	);
}
