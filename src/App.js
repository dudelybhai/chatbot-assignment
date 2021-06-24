import React from "react"
import { Chat } from "@progress/kendo-react-conversational-ui"
import { data } from "./data"
export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.user = {
			id: 1,
			avatarUrl:
				"https://www.pngitem.com/pimgs/m/22-220721_circled-user-male-type-user-colorful-icon-png.png",
		}
		this.bot = { id: 0 }
		var sample = []
		this.final = data.forEach((item) => {
			item.trainingData.expressions.forEach((value) => {
				sample.push({ type: "reply", value: value.text, reply: item.reply.text, text: item.name })
			})
		})
		this.state = {
			messages: [
				{
					author: this.bot,
					suggestedActions: sample,
					timestamp: new Date(),
					text: "Hello, this is a demo bot. I don't do much",
				},
			],
			realTime: this.intent,
		}
	}

	addNewMessage = (event) => {
		var replyData = this.state.messages[0].suggestedActions
		replyData = replyData.filter((item) => item.value === event.message.text)
		let botResponce = Object.assign({}, event.message)
		botResponce.text =
			replyData.length !== 0 ? replyData[0].reply : this.countReplayLength(event.message.text)
		botResponce.author = this.bot
		this.setState((prevState) => ({
			messages: [...prevState.messages, event.message],
		}))
		setTimeout(() => {
			this.setState((prevState) => ({
				messages: [...prevState.messages, botResponce],
			}))
		}, 1000)
	}

	countReplayLength = (question) => {
		let length = question.length
		let answer = question + " contains exactly " + length + " symbols."
		return answer
	}

	render() {
		return (
			<div>
				<Chat
					user={this.user}
					messages={this.state.messages}
					onMessageSend={this.addNewMessage}
					placeholder={"Type a message..."}
					width={400}
				/>
			</div>
		)
	}
}
