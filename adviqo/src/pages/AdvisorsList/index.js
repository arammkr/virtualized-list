import React, { useCallback } from 'react';
import Layout from "components/Layout";
import { useAdvisorsContext, useAdvisorsDispatchContext } from 'context/Advisors';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import Advisor from "../../components/Advisor";
import CircularProgress from '@material-ui/core/CircularProgress';
import AdvisorFilter from "../../components/AdvisorFilter";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		minHeight: 850,
	},
}));

const AdvisorsList = () => {
	const classes = useStyles();
	const advisorsContext = useAdvisorsContext();
	const advisorsDispatchContext = useAdvisorsDispatchContext();

	const isRowLoaded = useCallback( ( { index } ) => {
		return Boolean( advisorsContext.advisors[ index ] );
	}, [ advisorsContext.advisors ] );

	const rowRenderer = useCallback(({ key, index, style }) => {

		if (!isRowLoaded({ index })) {
			return  (<div key={key}>Loading</div>)
		}

		return (
			<div key={key} style={style}>
				<Advisor index={index} advisor={advisorsContext.advisors[index]} />
			</div>
		);
	}, [advisorsContext.advisors, isRowLoaded]);

	const handleScroll = useCallback(({clientHeight, scrollHeight, scrollTop}) => {

		if (advisorsContext.loader || !advisorsContext.meta.hasNext) {
			return;
		}

		if (clientHeight + scrollTop >= scrollHeight) {
			advisorsDispatchContext.setLoader(true);
			advisorsDispatchContext.setPage(++advisorsContext.page);
		}
	}, [advisorsDispatchContext.setLoader, advisorsContext.loader]);

	return (
		<Layout>
			<Typography variant="h2" color="textSecondary" component="p">
				Advisors
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						<AdvisorFilter/>
					</Paper>
				</Grid>
				<Grid item xs={9}>
					<Paper className={classes.paper}>
						<AutoSizer>
							{({ width }) => (
								<List
									onScroll={handleScroll}
									width={width}
									rowCount={advisorsContext.advisors.length}
									height={800}
									rowHeight={140}
									rowRenderer={rowRenderer}
								/>
							)}
						</AutoSizer>
						{ advisorsContext.loader && <CircularProgress/> }
					</Paper>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default AdvisorsList;
