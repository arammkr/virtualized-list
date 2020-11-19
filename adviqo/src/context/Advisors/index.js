import React, { useCallback, useContext, useEffect, useState } from 'react';
import Fetch from 'utils/fetch';

export const AdvisorsContext = React.createContext();
export const AdvisorsDispatchContext = React.createContext();
export const useAdvisorsContext = () => useContext(AdvisorsContext);
export const useAdvisorsDispatchContext = () => useContext(AdvisorsDispatchContext);

export const AdvisorsProvider = ({ children }) => {
	const [advisors, setAdvisors] = useState([]);
	const [loader, setLoader] = useState(true);
	const [meta, setMeta] = useState({ page: 1 });
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState({});

	const fetchHandler = result => {
		const { data, ...meta } = result;
		setAdvisors([...advisors, ...data]);
		setMeta(meta);
		setLoader(false);
	};

	useEffect(() => {
		fetchAdvisors();
	}, [filters.sortBy, filters.status, filters.reviews, page]);

	const fetchAdvisors = () => Fetch.get({ url: 'http://localhost:8080', urlParams: { page, ...filters } }).then(fetchHandler);

	const filterAdvisors = (sortBy, status, reviews) => {
		setLoader(true);
		setMeta({ ...meta, page: 1 });
		const newFitlers = {};
		if (sortBy) {
			newFitlers.sortBy = sortBy;
		}
		if (status) {
			newFitlers.status = status;
		}
		if (reviews) {
			newFitlers.reviews = reviews;
		}
		setPage(1);
		setAdvisors([]);
		setFilters(newFitlers);
	}

	return (
		<AdvisorsContext.Provider value={{ advisors, loader, meta, page }}>
			<AdvisorsDispatchContext.Provider value={{ setAdvisors, setLoader, fetchAdvisors, filterAdvisors, setMeta, setPage }}>
				{children}
			</AdvisorsDispatchContext.Provider>
		</AdvisorsContext.Provider>
	);
};
