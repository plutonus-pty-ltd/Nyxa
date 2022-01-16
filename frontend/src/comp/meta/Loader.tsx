import BarLoader from "react-spinners/BarLoader";

export default function Loader({ message }: { message?: string }) {
	return (
		<div className="flex flex-col justify-center items-center place-items-center h-screen my-auto">
			<img src="/static/images/logo.gif" className="h-16" alt="" />
			<div className="my-3 justify-center items-center flex flex-col">
				<BarLoader loading={true} color="#6a0a37" height={5} width={200} />
				<p className="mt-2 animate-pulse">{message}</p>
			</div>
		</div>
	);
}
