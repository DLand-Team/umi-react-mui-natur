import { sleep } from '@/utils';
import { useAsyncFunction } from '@/utils/greate-async';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useEffect, useState } from 'react';

test('normal', async () => {
	const getUserInfo = async () => {
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const { loading, data } = useAsyncFunction(getUserInfo);
		if (loading) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
			</div>
		);
	};
	render(<App />);
	expect(screen.getByRole('loading')).toHaveTextContent('loading');
	await waitFor(() => screen.getByRole('app'));
	expect(screen.getByRole('app')).toHaveTextContent('xxx');
	expect(screen.getByRole('app')).toHaveTextContent('tom');
	expect(screen.getByRole('app')).toHaveTextContent('10');
});

test('manual', async () => {
	let times = 0;
	const getUserInfo = async () => {
		times++;
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const { loading, data, run } = useAsyncFunction(getUserInfo, {
			manual: true,
		});

		useEffect(() => {
			run();
		}, [])

		if (loading || !data) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
			</div>
		);
	};
	render(<App />);
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(1);
});

test('single', async () => {
	let times = 0;
	const getUserInfo = async () => {
		times++;
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const { loading, data, run } = useAsyncFunction(getUserInfo, {
			manual: true,
			single: true
		});

		useEffect(() => {
			run();
			run();
			run();
		}, [])

		if (loading || !data) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
			</div>
		);
	};
	render(<App />);
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(1);
});

test('debounceTime', async () => {
	let times = 0;
	const getUserInfo = async () => {
		times++;
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const { loading, data, run } = useAsyncFunction(getUserInfo, {
			manual: true,
			debounceTime: 100,
		});
		const [flag, setFlag] = useState(1);

		useEffect(() => {
			run();
		});
		useEffect(() => {
			setFlag(v => v+1);
		}, []);

		if (loading || !data) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
			</div>
		);
	};
	render(<App />);
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(1);
});

test('debounceTime and manual', async () => {
	let times = 0;
	const getUserInfo = async () => {
		times++;
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const { loading, data, run } = useAsyncFunction(getUserInfo, {
			manual: true,
			debounceTime: 100,
		});

		useEffect(() => {
			(async () => {
				run();
				await sleep(50);
				run();
				await sleep(50);
				run();
			})()
		}, [])

		if (loading || !data) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
			</div>
		);
	};
	render(<App />);
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(1);
});

test('deps auto', async () => {
	let times = 0;
	const getUserInfo = async () => {
		times++;
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const [flag, setFlag] = useState(1);
		const { loading, data } = useAsyncFunction(getUserInfo, {
			deps: [flag]
		});

		if (loading || !data) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
				<button role={'change'} onClick={() => setFlag(v => v + 1)}>change flag</button>
			</div>
		);
	};
	render(<App />);
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(1);
	fireEvent.click(screen.getByRole('change'));
	await waitFor(() => screen.getByRole('loading'));
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(2);
});

test('deps and triggle multiply', async () => {
	let times = 0;
	const getUserInfo = async () => {
		times++;
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const [flag, setFlag] = useState(1);
		const { loading, data } = useAsyncFunction(getUserInfo, {
			deps: [flag],
		});

		if (loading || !data) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
				<button role={'change'} onClick={() => setFlag(v => v + 1)}>change flag</button>
			</div>
		);
	};
	render(<App />);
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(1);
	fireEvent.click(screen.getByRole('change'));
	fireEvent.click(screen.getByRole('change'));
	fireEvent.click(screen.getByRole('change'));
	await waitFor(() => screen.getByRole('loading'));
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(4);
});

test('deps and single', async () => {
	let times = 0;
	const getUserInfo = async () => {
		times++;
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const [flag, setFlag] = useState(1);
		const { loading, data } = useAsyncFunction(getUserInfo, {
			deps: [flag],
			single: true,
		});

		if (loading || !data) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
				<button role={'change'} onClick={() => setFlag(v => v + 1)}>change flag</button>
			</div>
		);
	};
	render(<App />);
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(1);
	fireEvent.click(screen.getByRole('change'));
	fireEvent.click(screen.getByRole('change'));
	fireEvent.click(screen.getByRole('change'));
	await waitFor(() => screen.getByRole('loading'));
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(2);
});

test('deps and debounce', async () => {
	let times = 0;
	const getUserInfo = async () => {
		times++;
		await sleep(10);
		return {
			name: 'tom',
			age: 10,
			id: 'xxx',
		};
	};

	const App = () => {
		const [flag, setFlag] = useState(1);
		const { loading, data } = useAsyncFunction(getUserInfo, {
			deps: [flag],
			debounceTime: 30,
		});

		if (loading || !data) {
			return <span role="loading">loading</span>;
		}
		return (
			<div role={'app'}>
				<span>{data.id}</span>
				<span>{data.name}</span>
				<span>{data.age}</span>
				<button role={'change'} onClick={() => setFlag(v => v + 1)}>change flag</button>
			</div>
		);
	};
	render(<App />);
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(1);
	fireEvent.click(screen.getByRole('change'));
	fireEvent.click(screen.getByRole('change'));
	fireEvent.click(screen.getByRole('change'));
	await waitFor(() => screen.getByRole('loading'));
	await waitFor(() => screen.getByRole('app'));
	expect(times).toBe(2);
});


