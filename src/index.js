/**
 * Created by jason on 4/19/16.
 */
import React,{
	Component
} from 'react-native'

import {Provider} from 'react-redux'

import configureStore from './store/configureStore'

import * as MainPage from './mainPage'
import connectComponent from './utils/connectComponent'
var ConnectedMainPage = connectComponent(MainPage)
const store = configureStore()

class App extends Component{
	render(){
		return (
			<Provider store={store}>
				<ConnectedMainPage/>
			</Provider>
		)
	}
}

export default App