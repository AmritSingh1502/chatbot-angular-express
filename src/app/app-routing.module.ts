// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotIconComponent } from './chatbot-icon/chatbot-icon.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

const routes: Routes = [
  { path: '', component: ChatbotIconComponent }, // Default route to the UserChatbotImageComponent
  { path: 'chatbot', component: ChatbotComponent } // Route for the ChatbotAppComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
