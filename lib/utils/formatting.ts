export function formatDate(date: Date): string {
	return date.toLocaleDateString();
}

export function formatNumber(num: number): string {
	return new Intl.NumberFormat().format(num);
}
