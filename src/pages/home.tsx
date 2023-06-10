import CodeRender from "@/components/CodeRender";
import Dashboard from "./dashboard/Dashboard";
import { Box } from "@mui/material";



const Home = () => {
  return (
    <Box p={4}>
			<CodeRender
				showLineNumber
				language="json"
				code={JSON.stringify({
					a: 1,
					b: 2,
					c: {
						c1: 'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
						c2: [1, 2,3]
					}
				}, null, 2)}
			/>
			{/* <Dashboard /> */}
		</Box>
  );
};

export default Home;
