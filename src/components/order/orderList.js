/**
 *
 * Created by jason on 4/19/16.
 */


import React, {
	View,
	Text,
	StyleSheet,
	Image,
	Component,
	ListView,
	PropTypes,
	Dimensions,
	TouchableOpacity
} from 'react-native'

import RefreshableListView from 'react-native-refreshable-listview'
import Icon from 'react-native-vector-icons/Ionicons'
import connectComponent from '../../utils/connectComponent'
import * as foodDetailPage from '../home/foodDetailPage'
const {width,height} = Dimensions.get('window')

class orderList extends Component {

	static propTypes = {
		data: PropTypes.array,
		navigator: PropTypes.object
	}
// 构造
  constructor(props) {

    super(props);
    // 初始状态
	  var ds = new ListView.DataSource({
		  rowHasChanged: (r1, r2) => {
			  r1 !== r2
		  }
	  })
    this.state = {
	    data: ds.cloneWithRows(props.data || [])
    };
  }


	componentWillReceiveProps(nextProps) {

		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => {
				r1 !== r2
			}
		})
		if (nextProps.data !== this.props.data) {
			this.setState({
				data: ds.cloneWithRows(nextProps.data)
			});
		}
	}



	_itemClick = (rowData) => {
		const {navigator,actions} = this.props
		navigator.push({
			title: "详情",
			onLeftButtonPress: () => this.props.navigator.pop(),
			component: connectComponent(foodDetailPage),
			passProps: {
				food: rowData
			}
		})
	}



	_renderPic = (pic_url) => {
		if (pic_url) {
			return (
				<Image style={styles.image} source={{uri: pic_url}} />

			)
		}
	}
	_renderRow = (rowData) => {
		const {user, food} = rowData
		return (
			<TouchableOpacity style={styles.rowContainer} activeOpacity={0.7} onPress={() => this._itemClick(rowData.food)} >
				<View style={{flexDirection: 'row'}}>
					{this._renderPic(food.pic_url)}
					<View >
						<Text style={styles.name}>{food.name}</Text>
						<Text style={styles.address}>{food.address}</Text>
					</View>
					<Text style={styles.price}>单价: {food.price}元</Text>

				</View>
			</TouchableOpacity>
		)
	}


	render(){

		return (
			<ListView
				dataSource={this.state.data}
				enableEmptySections
				renderRow={this._renderRow}
				style={styles.listView}
			>
			</ListView>
		)
	}
}

const styles = StyleSheet.create({

	rowContainer: {
		marginBottom: -2,
		padding: 10
	},
	image: {
		width: 60,
		height: 60
	},
	address: {
		marginLeft: 10,
		marginTop: 10,
		color: 'black'
	},
	price: {
		color: 'green',
		position: 'absolute',
		right: 20,
		bottom: 20
	},
	name: {
		marginLeft: 10,
		marginTop: 10,
		fontSize: 20,
		color: 'green'
	},
	listView: {
		marginBottom: 64 + 48,
	},
})


export const LayoutComponent = orderList
export function mapStateToProps(state,props){
	return {
		data: state.order
	}
}
