import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from '../message/message.component';
import { ChatService } from '../chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MessageComponent]
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  userMessage!: string;
  chatMessages: { role: string, content: string }[] = [];
  isChatbotVisible: boolean = false;

  constructor(private chatService:ChatService, private router: Router){}

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Could not scroll to bottom:', err);
    }
  }

  sendMessage(): void {
    const predefinedQuestions = [
      { keywords: ['how are you', 'doing', 'feel'], answer: 'I am fine, thank you!' },
      { keywords: ['name', 'your'], answer: 'My name is Chatbot.' },
      { keywords: ['options', 'show'], answer: 'Here are the options: ...' }
    ];

    const userQuestion = this.userMessage.trim().toLowerCase();
    let matchedAnswer: string | undefined = undefined;

    for (let i = 0; i < predefinedQuestions.length; i++) {
      const keywords = predefinedQuestions[i].keywords;
      if (this.matchKeywords(userQuestion, keywords)) {
        matchedAnswer = predefinedQuestions[i].answer;
        break;
      }
    }

    this.chatMessages.push({ role: 'user', content: this.userMessage });

    if (matchedAnswer) {
      this.chatMessages.push({ role: 'assistant', content: matchedAnswer });
    } else {
      this.chatMessages.push({ role: 'assistant', content: "I'm sorry, I don't understand. Can you please ask another question?" });
    }

    this.userMessage = '';
  }

  sendMessage2(): void {
    if (!this.userMessage.trim()) {
      return; // Do not send empty messages
    }

    // Add user message to chatMessages
    this.chatMessages.push({ role: 'user', content: this.userMessage });

    // Send user message to backend via service method
    this.chatService.sendMessageToBackend(this.userMessage).subscribe(
      response => {
        const assistantReply = response.answer || "I'm sorry, I don't understand. Can you please ask another question?";
        this.chatMessages.push({ role: 'assistant', content: assistantReply });
      },
      error => {
        console.error('Error sending message to backend:', error);
        this.chatMessages.push({ role: 'assistant', content: "There was an error processing your request. Please try again later." });
      }
    );

    this.userMessage = ''; // Clear user input after sending
  }

  private matchKeywords(userQuestion: string, keywords: string[]): boolean {
    for (let i = 0; i < keywords.length; i++) {
      if (userQuestion.includes(keywords[i])) {
        return true;
      }
    }
    return false;
  }

  closeChat() {
    this.router.navigate(['/chatbot-image']); // Replace '/chatbot-image' with your actual route
  }
}
