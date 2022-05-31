import useFPGrowth from './useFPGrowth';
import useFrecency from './useFrecency';

export default function useSuggestions() {
	const frecency = useFrecency();
	const FPGrowth = useFPGrowth();

	const combinedSuggestion = frecency.concat(FPGrowth);
	const uniqueElements = [];

	combinedSuggestion.forEach((element) => {
		if (!uniqueElements.some((item) => item.title === element.title)) {
			uniqueElements.push(element);
		}
	});

	return uniqueElements;
}
