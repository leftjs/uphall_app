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
const {width,height} = Dimensions.get('window')

class messageList extends Component {

	static propTypes = {
		data: PropTypes.array
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
				data: ds.cloneWithRows(nextProps.data || [])
			});
		}
	}





	_renderPic = (pic_url) => {


		if (pic_url) {
			return (
				<Image style={styles.image} source={{uri: pic_url}} />
			)
		}
		return (
			<Image style={styles.image} source={{uri: "http://ww3.sinaimg.cn/mw690/71ae9b51gw1f34ggm06a9j20cs0cs74t.jpg"}} />
		)
	}
	_renderRow = (rowData) => {
		const {user, content} = rowData
		return (
			<TouchableOpacity style={styles.rowContainer} activeOpacity={0.7}  >
				<View style={{flexDirection: 'row'}}>
					{this._renderPic(user.avatar_uri)}
					<View >
						<Text style={styles.name}>{user.name}</Text>
						<Text style={styles.content} numberOfLines={5}>{content}</Text>
					</View>
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
		height: 60,
		borderRadius: 30,
		borderWidth: 1,
		borderColor: 'pink'
	},
	content: {
		marginLeft: 10,
		marginTop: 5,
		color: 'black',
		width: width - 100
	},
	name: {
		marginLeft: 10,
		marginTop: 5,
		fontSize: 20,
		color: 'green'
	},
	listView: {
		//marginBottom: 64 + 48,
	},
})


export const LayoutComponent = messageList
export function mapStateToProps(state,props){
	return {
		data: state.message
	}
}
