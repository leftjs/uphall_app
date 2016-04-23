/**
 * Created by jason on 4/16/16.
 */

import React, {
	View,
	Text,
	Component,
	StyleSheet,
	TextInput,
	Dimensions,
	AlertIOS
} from 'react-native'

const {width, height} = Dimensions.get('window')

import * as messageList from '../components/message/messageList'
import connectComponent from '../utils/connectComponent'
import KeyboardSpacer from 'react-native-keyboard-spacer'

var ConnectedMessageList = connectComponent(messageList)

class message extends Component{


	_returnBtnClick = (event) => {

		const {actions, user}  = this.props
		let content = event.nativeEvent.text
		if (!content) {
			return
		}

		this._textInput.clear()


		actions.postMessage({
			token: user.token,
			content,
			resolved: () => {
				 actions.getMessages()
			},
			rejected: () => {
				AlertIOS.alert(
					'发送失败',
					'消息发送失败,请登录后重试',
					[
						{text: '确定', onPress: () => console.log('确定按钮点击')},
					]
				)
			}
		})
	}


	render(){
		const {actions, user} = this.props
		return (
			<View style={{width, height: height - 64 - 48}}>
				<ConnectedMessageList></ConnectedMessageList>
				<View style={{width, height: 40, backgroundColor: 'lightgray', justifyContent: 'center'}}>
					<TextInput ref={(view) => this._textInput = view} style={{left: 0, right: 0, height: 40, padding: 5}} placeholder={"请输入内容"} onSubmitEditing={this._returnBtnClick}></TextInput>
				</View>
				<KeyboardSpacer topSpacing={-48}/>
			</View>
		)
	}
}

export const LayoutComponent = message
export function mapStateToProps(state){
	return {
		user: state.user
	}
}