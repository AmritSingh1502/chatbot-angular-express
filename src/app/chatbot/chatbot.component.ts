import { Component } from '@angular/core';
import { OpenAiApiService } from '../services/open-ai-api.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {


  
  userMessage!: string;
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [];
  isChatbotVisible: boolean = false;

 


  constructor(private openAiApiService: OpenAiApiService){}


  // toggleChatbot(): void {
  //   this.isChatbotVisible = !this.isChatbotVisible;
  // }




  sendMessage11(): void {
    const predefinedQuestions = [
      { question: 'How are you?', answer: 'I am fine, thank you!' },
      { question: 'What is your name?', answer: 'My name is Chatbot.' },
      // Add more predefined questions and answers as needed
    ];

    const userQuestion = this.userMessage.trim();
    const predefinedAnswer = predefinedQuestions.find(q => q.question.toLowerCase() === userQuestion.toLowerCase());

    if (predefinedAnswer) {
      // Handle predefined questions
      this.chatMessages.push({ role: 'user', content: userQuestion });
      this.chatMessages.push({ role: 'assistant-reply', content: predefinedAnswer.answer });
      this.userMessage = ''; // Clear the user input
    } else {
      // Handle unknown questions by calling the API
      this.chatMessages.push({ role: 'user', content: userQuestion });
      this.openAiApiService.sendMessage(userQuestion)
        .subscribe(response => {
          this.assistantReply = response.reply;
          this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
          this.userMessage = ''; // Clear the user input
        }, error => {
          // Handle error responses from the API
          this.chatMessages.push({ role: 'assistant', content: "I'm sorry, I don't understand. Can you please ask another question?" });
          this.userMessage = ''; // Clear the user input
        });
    }
  }

  sendMessage() {
    const userMessage = this.userMessage;
    this.chatMessages.push({ role: 'user', content: userMessage });
    this.openAiApiService.sendMessage(this.userMessage)
      .subscribe(response => {
        this.assistantReply = response.reply;
        this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        this.userMessage = '';
      });


      
  }


  
}
