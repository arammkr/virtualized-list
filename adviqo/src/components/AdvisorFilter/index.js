import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Typography from "@material-ui/core/Typography";
import { useAdvisorsDispatchContext } from "../../context/Advisors";
import useUpdate from "utils/hooks";
import { debounce } from 'lodash';

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: '100%',
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));


const AdvisorFilter = () => {

	const [sortBy, setSortBy] = useState(null);
	const [status, setStatus] = useState(null);
	const [reviews, setReviews] = useState([0, 100]);
	const classes = useStyles();
	const advisorsDispatchContext = useAdvisorsDispatchContext();

	const handleChange = (event, cb) => {
		cb(event.target.value);
	};

	const handleReviewRangeChange = (event, newValue) => {
		setReviews(newValue);
	};

	useUpdate(() => {
		advisorsDispatchContext.filterAdvisors(sortBy, status, reviews);
	}, [sortBy, status, reviews]);

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">Reviews</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={sortBy}
					onChange={(event) => handleChange(event, setSortBy)}
				>
					<MenuItem value={null}>Select</MenuItem>
					<MenuItem value={'ASC'}>Reviews Ascending</MenuItem>
					<MenuItem value={'DESC'}>Reviews Descending</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label">Status</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={status}
					onChange={(event) => handleChange(event, setStatus)}
				>
					<MenuItem value={null}>Select</MenuItem>
					<MenuItem value={'online'}>Online</MenuItem>
					<MenuItem value={'offline'}>Offline</MenuItem>
				</Select>
			</FormControl>

			<FormControl className={classes.formControl}>
				<Typography id="range-slider" align='left'>
					Reviews count
				</Typography>
				<Slider
					value={reviews}
					onChange={handleReviewRangeChange}
					valueLabelDisplay="auto"
					aria-labelledby="range-slider"
				/>
			</FormControl>
		</div>
	);
};

export default AdvisorFilter;
