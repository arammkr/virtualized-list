import React from 'react';
import Container from '@material-ui/core/Container';

const Layout = ({ children }) => {

	return (
		<Container fixed>
			{children}
		</Container>
	);
};

export default Layout;
