import Average from "./dashboard/Average";
import { MantineProvider } from "@mantine/core";
import Host from "./dashboard/Host";
import PerVisit from "./dashboard/PerVisit";

export default function Home() {
	return (
		<MantineProvider>
			<div>
				<Average />
				<Host />
				<PerVisit />
			</div>
		</MantineProvider>
	);
}
