import React,{Component} from 'react';
import {render} from 'react-dom';
import $ from 'jquery';
$(()=>{
	console.log('start')
})
class Demo extends Component{
	constructor(props) {
		super(props);
		
	}
	render(){
		return(
				<div>sdkfjsdj</div>
			)
	}
}

render(<Demo/>,document.querySelector('#app'))