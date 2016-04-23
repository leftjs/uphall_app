/**
 * Created by jason on 4/19/16.
 */
import React, {
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

const styles = StyleSheet.create({
	root: {
		height: 18,
		width: 18,
	},
	dot: {
		backgroundColor: '#e4e6e7',
		height: 5,
		width: 5,
		borderRadius: 2.5,
		margin: 3,
	},
	active: {
		backgroundColor: '#319fd6',
	},
});

export default class PaginationDot extends React.Component {
	static propTypes = {
		active: React.PropTypes.bool.isRequired,
		index: React.PropTypes.number.isRequired,
		onClick: React.PropTypes.func.isRequired,
	};

	handleClick = (event) => {
		this.props.onClick(event, this.props.index);
	};

	render() {
		const {
			      active,
			      } = this.props;

		let styleDot;

		if (active) {
			styleDot = [styles.dot, styles.active];
		} else {
			styleDot = styles.dot;
		}

		return (
			<TouchableOpacity style={styles.root} onPress={this.handleClick}>
				<View style={styleDot} />
			</TouchableOpacity>
		);
	}
}