import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenAiApiService } from '../services/open-ai-api.service';
import { MessageComponent } from '../message/message.component';

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
  assistantReply!: string;
  chatMessages: { role: string, content: string }[] = [];
  isChatbotVisible: boolean = false;

  constructor(private openAiApiService: OpenAiApiService) {}

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

    if (matchedAnswer) {
      this.chatMessages.push({ role: 'user', content: this.userMessage });
      this.chatMessages.push({ role: 'assistant', content: matchedAnswer });
    } else {
      // OpenAI API
      this.chatMessages.push({ role: 'user', content: this.userMessage });
      this.openAiApiService.sendMessage(this.userMessage).subscribe(
        response => {
          this.assistantReply = response.reply;
          this.chatMessages.push({ role: 'assistant', content: this.assistantReply });
        },
        error => {
          this.chatMessages.push({ role: 'assistant', content: "I'm sorry, I don't understand. Can you please ask another question?" });
        }
      );
    }

    this.userMessage = '';
  }


  private matchKeywords(userQuestion: string, keywords: string[]): boolean {
    for (let i = 0; i < keywords.length; i++) {
      if (userQuestion.includes(keywords[i])) {
        return true;
      }
    }
    return false;
  }
}
