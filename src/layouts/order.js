/**
 * Created by jason on 4/16/16.
 */

import React, {
	View,
	Text,
	Component,
	StyleSheet,
	PropTypes,
	ListView
} from 'react-native'

import connectComponent from '../utils/connectComponent'
import * as orderList from '../components/order/orderList'

var ConnectedOrderList = connectComponent(orderList)

class order extends Component{

	static propTypes = {
		orders: PropTypes.array
	}


	render(){
		return (
			<ConnectedOrderList navigator={this.props.navigator}></ConnectedOrderList>
		)
	}
}

export const LayoutComponent = order
export function mapStateToProps(state){
	return {
		orders: state.order
	}
}