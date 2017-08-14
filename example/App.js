import React, { Component } from 'react';
import {
	MessageBox,
	ChatItem,
	ChatList,
	SystemMessage,
	MessageList,
	Input,
	Button,
	Avatar,
	Navbar,
	SideBar,
} from '../src';

import FaSearch from 'react-icons/lib/fa/search';
import FaComments from 'react-icons/lib/fa/comments';

const loremIpsum = require('lorem-ipsum');
const Identicon = require('identicon.js')

export class App extends Component {

	token() {
		return (parseInt(Math.random() * 10 % 3));
	}

	photo(size) {
		return new Identicon(String(Math.random()) + String(Math.random()), {
			margin: 0,
			size: size || 20,
		}).toString()
	}

	random(type) {
		switch (type) {
			case 'message':
				var type = this.token();
				if (type < 1)
					type = 'photo';
				else if (type > 1)
					type = 'file';
				else
					type = 'text';

				return {
					position: (this.token() >= 1 ? 'right' : 'left'),
					type: type,
					text: loremIpsum({ count: 1, units: 'sentences' }),
					data: {
						uri: `data:image/png;base64,${this.photo(150)}`,
						status: {
							click: false,
							loading: 0,
						}
					},
					date: new Date(),
				};
			case 'chat':
				return {
					avatar: `data:image/png;base64,${this.photo()}`,
					alt: loremIpsum({ count: 2, units: 'words' }),
					title: loremIpsum({ count: 2, units: 'words' }),
					date: new Date(),
					subtitle: loremIpsum({ count: 1, units: 'sentences' }),
					unread: parseInt(Math.random() * 10 % 3),
				};
		}
	}

	render() {
		var arr = [];
		for (var i = 0; i < 5; i++)
			arr.push(i);

		var messageSource = arr.map(x => this.random('message'));
		var chatSource = arr.map(x => this.random('chat'));

		return (
			<div className='container'>
				<div
					className='chat-list'>
					<SideBar
						top={
							<Avatar
								type='circle'
								src={`data:image/png;base64,${this.photo()}`}/>
						}
						center={
							<ChatList
								dataSource={chatSource} />
						}
						bottom={
							<span>
								<Button
									type='transparent'
									color='black'
									icon={{
										component: <FaComments/>,
										size: 18
									}}/>
								<Button
									type='transparent'
									color='black'
									icon={{
										component: <FaSearch/>,
										size: 18
									}}/>
							</span>
						}/>
				</div>
				<div
					className='right-panel'>
					<MessageList
						className='message-list'
						dataSource={messageSource} />
					<Input
						className='input-area'
						placeholder="Mesajınızı buraya yazınız."
						defaultValue=""
						buttons={
							<Button
								color='white'
								backgroundColor='black'
								icon={{
									component: <FaSearch />,
									size: 18,
									float: 'right'
								}}/>
						}/>

					<Avatar src="https://randomuser.me/api/portraits/women/22.jpg" size="medium" type="circle"/>
				</div>

				{
					// arr.map((x, i) => {
					// var tmp = this.random();

					// return <ChatItem
					// 	key={i}
					// 	title={tmp.title}
					// 	subtitle={tmp.subtitle}
					// 	avatar={tmp.avatar}
					// 	unread={tmp.unread}
					// 	date={tmp.date}/>;

					// return <MessageBox
					// 	key={i}
					// 	type={tmp.type}
					// 	text={tmp.text}
					// 	data={tmp.data}
					// 	position={tmp.position}/>

					// return <SystemMessage
					// 	text={'10.10.1996'}/>
					// })
				}
			</div>
		);
	}
}

export default App;
