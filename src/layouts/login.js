/**
 * Created by jason on 4/15/16.
 */
import React,{
	View,
	StyleSheet,
	Component,
	Text,
	TouchableHighlight,
	AlertIOS
} from "react-native"

import t from 'tcomb-form-native'
import Spinner from 'react-native-loading-spinner-overlay'
import fetch from 'isomorphic-fetch'
import * as register from './register'
import connectComponent from '../utils/connectComponent'

var Form = t.form.Form

const User = t.struct({
	username: t.String,
	password: t.String
})

const options = {
	//background: 'red'
	auto: 'placeholders',
	fields: {
		username: {
			label: '用户名',
			placeholder: '请输入用户名',
			error: '用户名未填写',
			autoFocus: true
		},
		password: {
			label: '密码',
			placeholder: '请输入密码',
			error: '密码为填写',
			password: true,
		}
	}
}


class login extends Component {

	// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    progressing: false
    };
  }

	LoginBtnOnPress = () => {
		const {actions} = this.props
		let value = this.refs.form.getValue()
		if (value) {
			let postData = JSON.parse(JSON.stringify(value))
			actions.login({
				...postData,
				resolved: () => {
					AlertIOS.alert(
						'登录成功',
						'您已经成功登录',
						[
							{text: '确定', onPress: () => 	this.props.navigator.popToTop()
							},
						]
					)

				},
				rejected: () => {
					AlertIOS.alert(
						'登录失败',
						'登录失败,请重试',
						[
							{text: '确定', onPress: () => console.log('确定按钮点击')},
						]
					)
				}
			})
		}
	}

	RegisterBtnOnPress = () => {
		this.props.navigator.push({
			component: connectComponent(register),
			title: "注册"
		})
	}

	renderForm = () => {
		return(
			<View style={styles.container}>
				<Form
					ref="form"
					type={User}
					options={options}
				/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.LoginBtnOnPress}
					underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>
						登录
					</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={styles.button}
					onPress={this.RegisterBtnOnPress}
					underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>
						还没有账号?注册
					</Text>
				</TouchableHighlight>
			</View>
		)
	}

	renderProgress = () => {
		return (
			<View style={{flex: 1}}>
				<Spinner visible={this.state.progressing} />
			</View>
		)
	}


	render(){
		return (
		<View>
			{this.renderForm()}
			{this.renderProgress()}
		</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginTop: 50,
		padding: 20,
		backgroundColor: '#ffffff',
		flex: 1
	},
	button: {
		height: 36,
		backgroundColor: '#48bbec',
		borderColor: '#48bbec',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent:'center'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	}
})

export const LayoutComponent = login
export function mapStateToProps(state) {
	return {
		state
	}
}


