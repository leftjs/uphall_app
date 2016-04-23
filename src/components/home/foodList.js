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
import * as foodDetailPage from './foodDetailPage'
import connectComponent from '../../utils/connectComponent'

const {width,height} = Dimensions.get('window')

class FoodList extends Component {

	static propTypes = {
		data: PropTypes.array,
		tag: PropTypes.string,
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


	_renderPic = (pic_url) => {
		if (pic_url) {
			return (
				<Image style={styles.image} source={{uri: pic_url}} />

			)
		}
	}

	_itemClick = (rowData) => {
		const {navigator,actions} = this.props
		navigator.push({
			title: "详情",
			onLeftButtonPress: () => this.props.navigator.pop(),
			component: connectComponent(foodDetailPage),
			passProps: {
				food: rowData,
			}
		})
	}


	_renderRow = (rowData) => {
		return (
			<TouchableOpacity style={styles.rowContainer} activeOpacity={0.7} onPress={() => this._itemClick(rowData)} >
				{this._renderPic(rowData.pic_url)}
				<Text style={styles.name}>{rowData.name}</Text>
				<View style={styles.likeContainer}>
					<Icon name="ios-heart-outline" size={20} style={styles.likeIcon} ></Icon>
					<Text style={styles.like}>{rowData.like}</Text>
				</View>
				<Text style={styles.address}>{rowData.address}</Text>
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
	image: {
		width,
		height: width
	},
	likeContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	rowContainer: {
		marginBottom: 20,
		alignItems: 'center'
	},
	address: {
		color: 'black'
	},
	name: {
		marginTop: 10,
		fontSize: 15,
		color: 'green'
	},
	like: {
		marginLeft: 10,
		fontSize: 20,
		color: 'gray'
	},
	likeIcon: {
		marginTop: 3
	},
	listView: {
		marginBottom: 64 + 48,
	},
})


export const LayoutComponent = FoodList
export function mapStateToProps(state,props){
	const {tag} = props
	return {
		data: state.foods[tag],
		user: state.user
	}
}
