import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from '@material-ui/core/styles';
import Badge from "@material-ui/core/Badge";

const useStyles = makeStyles((theme) => ({
	root: {
		height: '140px',
	}
}));


const Advisor = (props) => {
	const { advisor } = props;
	const classes = useStyles();
	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Badge color={advisor.status === 'offline' ? 'secondary' : 'primary'} variant="dot" invisible={false}>
						<Avatar alt={advisor.name}  src={advisor.avatar}/>
					</Badge>
				}
				title={advisor.name}
				subheader={`Reviews count (${advisor.reviews})`}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{advisor.languages && advisor.languages.join(', ')}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default Advisor;
