// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotIconComponent } from './chatbot-icon/chatbot-icon.component';
import { ChatbotComponent } from './chatbot/chatbot.component';

// const routes: Routes = [
//   { path: '', component: ChatbotIconComponent }, // Default route to the UserChatbotImageComponent
//   { path: 'chatbot', component: ChatbotComponent } // Route for the ChatbotAppComponent
// ];

const routes: Routes = [
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'chatbot-image', component: ChatbotIconComponent }, // Add route for the chatbot image
  { path: '', redirectTo: '/chatbot', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
