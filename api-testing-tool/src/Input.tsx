import React from 'react';


export const fetchData = async (
	event: React.MouseEvent<HTMLElement>, 
	changeResText: React.Dispatch<React.SetStateAction<string>>,
	changeResDuration: React.Dispatch<React.SetStateAction<string>>,
	changeResStatus: React.Dispatch<React.SetStateAction<string>>,
	url: string,
	method: string,
	) => {
	try {
		event?.preventDefault();
		performance.mark("startWork");
		const data = await fetch(url, {method: method});
		performance.mark("endWork");

		const fetchPerf = performance.getEntriesByType("resource").at(-1);

		changeResText(JSON.stringify(await data.json()) as React.SetStateAction<string>);
		changeResDuration(fetchPerf?.duration.toFixed(3).toString() as React.SetStateAction<string>);
		changeResStatus(data?.status.toString() as React.SetStateAction<string>);
	}
	catch(err) {
		changeResText("");
		changeResDuration("");
		changeResStatus("400");
	}
}

const Input = () => {
	
	const [resText, changeResText] = React.useState("Response");
	const [resDuration, changeResDuration] = React.useState("");
	const [resStatus, changeResStatus] = React.useState("");

	return(
		<div className="grid grid-rows-3 grid-cols-3 gap-y-0">
			<form className="col-start-2 col-end-4">
				<select id="methodSelect" className="w-1/8 h-10 row-start-1 border-2 border-rose-500 rounded-lg">
					<option value="GET">GET</option>
					<option value="POST">POST</option>
				</select>
				<input type="text" id="urlInput" className="w-2/6 h-10 border-2 border-rose-500 rounded-lg p-1 text-gray-500" placeholder="URL"/>
				<button className="w-1/12 h-10 border-2 border-rose-500 rounded-lg" onClick={(event) => fetchData(event, changeResText, changeResDuration, changeResStatus, (document.getElementById("urlInput") as HTMLInputElement)?.value, (document.getElementById("methodSelect") as HTMLInputElement)?.value)}>Send</button>
			</form>
			<output className="col-start-2 col-end-4 row-start-2 w-3/6 h-20 border-2 border-rose-500 rounded-lg p-1 text-gray-500">Response Time: {resDuration} ms<br></br>Response Status: {resStatus}</output>
			<div className="col-start-2 col-end-4 row-start-3 w-3/6 h-60 border-2 border-rose-500 rounded-lg p-1 text-gray-500" style={{overflow: 'scroll'}}>{resText}</div>
		</div>
	);
};

export default Input;
