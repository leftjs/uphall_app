/**
 * Created by jason on 4/16/16.
 */
import React, {
	Component,
	TabBarIOS,
	View,
	StyleSheet,
	Text,
	Navigator,
	NavigatorIOS
} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import connectComponent from './utils/connectComponent'


import * as home from './layouts/home'
import * as message from './layouts/message'
import * as order from './layouts/order'
import * as mine from './layouts/mine'

import * as foodPublish from './layouts/foodPublish'

const HOME_TAB = 'HOME_TAB'
const MESSAGE_TAB = 'MESSAGE_TAB'
const ORDER_TAB = 'ORDER_TAB'
const MINE_TAB = 'MINE_TAB'

class mainPage extends Component{


// 构造
  constructor(props) {
    super(props)
    // 初始状态
    this.state = {
	    selectedTab: HOME_TAB,
	    navs: {}
    }
  }

	componentWillMount() {
		this.props.actions.getUserFromStorage({
			resolved: (user) => {
				this.props.actions.login({
					username: user.username,
					password: user.password
				})
			},
			rejected: () => {
				console.log('rejected')
			}
		})
	}

	setTab = (tabId) => {
		if (tabId === this.state.selectedTab) {
			return
		}
		this.setState({selectedTab: tabId})

		const {actions} = this.props
		switch (tabId) {
			case HOME_TAB:
				actions.getFoods()
				return
			case ORDER_TAB:
				actions.getOrderByUserId(this.props.user._id)
				return
			case MESSAGE_TAB:
				actions.getMessages()
				return
			default:
				return
		}
	}


	_addNavigatorIOS = (component, title) => {


		var rightButtonTitle
		var onRightButtonPress
		if(title === "首页" ) {
			rightButtonTitle = "发布"
			if (title === "首页") {
				onRightButtonPress = () => {
					this.state.navs[title].push({
						component: connectComponent(foodPublish),
						title: '发布菜肴'
					})
				}
			}
		}
		return (
			<NavigatorIOS
				style={{flex: 1}}
			  barTintColor = 'white'
			  titleTextColor = 'green'
				ref={(view) => this.state.navs[title] = view}
			  tintColor = 'green'
				translucent={false}
			  initialRoute={{
			    component,
			    title,
			    rightButtonTitle,
			    onRightButtonPress
			  }}
			/>
		)
	}

	_addNavigator = (component, title) => {
		component = connectComponent(component)
		return (
			<Navigator
				initialRoute={{name: title, component: component}}
			  configureScene={(route) => {
			  return Navigator.SceneConfigs.HorizontalSwipeJump
			  }}
			  renderScene={(route, navigator) => {
			    let Component = route.component
			    return <Component {...route.params} navigator={navigator}/>
			  }}
			/>
		)
	}

	_renderTabBarItem = (title, component, identity, iconName, selectedIconName) => {
		component = connectComponent(component)
		return (
			<Icon.TabBarItemIOS
				title={title}
				iconName={iconName}
				selectedIconName={selectedIconName}
				selected={this.state.selectedTab === identity}
				size="30"
				onPress={() => this.setTab(identity)}
			>
				{this._addNavigatorIOS(component,title)}
			</Icon.TabBarItemIOS>
		)
	}


	render(){

		console.log(this.props)
		return (
				<TabBarIOS
					tintColor="green"
				  barTintColor="white">
					{this._renderTabBarItem("首页", home, HOME_TAB, "ios-home-outline", "ios-home")}
					{this._renderTabBarItem("预定", order,ORDER_TAB, "ios-paper-outline", "ios-paper")}
					{this._renderTabBarItem("消息", message, MESSAGE_TAB, "ios-chatboxes-outline", "ios-chatboxes")}
					{this._renderTabBarItem("我", mine, MINE_TAB, "ios-person-outline", "ios-person")}

				</TabBarIOS>
		)
	}
}

export const LayoutComponent = mainPage
export function mapStateToProps(state) {
	return {
		user: state.user
	}
}


//
//{this._renderTabBarItem("订单", order, ORDER_TAB, "ios-paper-outline", "ios-paper")}
//
//{this._renderTabBarItem("我", mine, MINE_TAB, "ios-person-outline", "ios-person")}

