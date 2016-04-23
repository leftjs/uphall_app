/**
 * Created by jason on 4/22/16.
 */
import React, {
	Component,
	Image,
	View,
	StyleSheet,
	PropTypes,
	Text,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	AlertIOS
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'

const {width,height} = Dimensions.get('window')
class foodDetailPage extends Component {

	static propTypes = {
		food: PropTypes.object,
		user: PropTypes.object
	}




	_likePress = () => {
		const {food,actions} = this.props
		actions.likeFood({
			id: food._id,
			resolved: () => {
				actions.getFoods()
			},
			rejected: () => {
				console.log('喜欢失败')
			}
		})
	}

	_orderPress = () => {
		this.props.actions.orderFood({
			id: this.props.food._id,
			token: this.props.user.token
		},()=> {
			AlertIOS.alert(
				'预定成功',
				'您已成功预定,请在预定界面查看',
				[
					{text: '确定', onPress: () => console.log('确定按钮点击')},
				]
			)
		},()=> {
			AlertIOS.alert(
				'预定失败',
				'预定失败,请重新预约',
				[
					{text: '确定', onPress: () => console.log('确定按钮点击')},
				]
			)
		})

	}


	render(){

		console.log(this.props.user)
		const {food} = this.props
		return (
			<ScrollView  contentInset={{bottom:64 + 48}}
			             automaticallyAdjustContentInsets={false}>
				<Image source={{uri: food.pic_url}} style={styles.pic}></Image>
				<Text style={styles.nameText}>{food.name}</Text>
				<Text style={styles.descText}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{food.description}</Text>
				<View style={styles.priceContainer}>
					<Icon name="social-yen-outline" size={20} ></Icon><Text style={styles.priceText}>{food.price}元</Text>
				</View>
				<View style={styles.locationContainer}>
					<Icon name="location" size={20} ></Icon><Text style={styles.locationText}>{food.address}</Text>
				</View>
				<View style={styles.buttons}>
					<Icon.Button name="ios-heart" backgroundColor="green" onPress={this._likePress} style={{height: 50,width: (width - 40) / 2, justifyContent: 'center'}} size={25} iconStyle={{color: 'white'}} disable={true}>
						<Text style={{color: 'white', fontSize: 20}}>喜欢</Text>
					</Icon.Button>
					<Icon.Button name="ios-cart" backgroundColor="green" onPress={this._orderPress} style={{height: 50,width: (width - 40) / 2, justifyContent: 'center'}} size={25} iconStyle={{color: 'white'}}>
						<Text style={{color: 'white',fontSize: 20}}>预定</Text>
					</Icon.Button>
				</View>

			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	pic: {
		width,
		height: width
	},
	nameText: {
		marginTop: 10,
		fontSize: 20,
		alignSelf: 'center',
		color: 'green'
	},
	descText: {
		marginTop: 10,
		fontSize: 15,
		padding: 10
	},
	priceContainer: {
		alignSelf: 'center',
		flexDirection: 'row'
	},
	priceText: {
		fontSize: 15,
		marginLeft: 5
	},
	locationContainer: {
		marginTop: 5,
		alignSelf: 'center',
		flexDirection: 'row'
	},
	locationText: {
		fontSize: 15,
		fontStyle: 'normal',
		marginLeft: 5,
		marginTop: 3
	},
	buttons: {
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10
	}
})

export const LayoutComponent = foodDetailPage
export function mapStateToProps(state,props) {
	return {
		user: state.user
	}
}