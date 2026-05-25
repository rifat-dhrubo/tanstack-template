import { getRouter } from '@/router.tsx';

describe('router', () => {
	it('creates a router instance with route tree', () => {
		const router = getRouter();
		expect(router).toBeDefined();
		expect(router.state).toBeDefined();
	});
});
