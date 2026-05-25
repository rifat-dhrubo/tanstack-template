function getInitialIsMobile(): boolean {
	if (typeof window === 'undefined') return false;
	return window.matchMedia(`(max-width: ${768 - 1}px)`).matches;
}

export function useIsMobile() {
	const [isMobile, setIsMobile] = React.useState(getInitialIsMobile);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${768 - 1}px)`);
		const onChange = () => {
			setIsMobile(mql.matches);
		};
		mql.addEventListener('change', onChange);
		return () => mql.removeEventListener('change', onChange);
	}, []);

	return isMobile;
}
