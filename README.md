# **Mini-Blog — Full Project Documentation**

A simple full-stack application for managing **Blog Posts** and **Categories**, built using:

* **Frontend:** Angular, Signals, NGRX State Management

* **Backend:** .NET Web API (C\#), Entity Framework Core

* **Database:** SQL Server

* **Mapping:** AutoMapper (basic CRUD mappings)

This project demonstrates clean state management, API communication, and modular architecture.

## **🚀 Overview**

The application allows users to:

### **Frontend Features (Angular \+ NGRX)**

✔ View all blog posts  
 ✔ Create, edit, delete blog posts  
 ✔ View and manage categories  
 ✔ Loader indicators using signals  
 ✔ Centralized state management using **NGRX**  
 ✔ Async pipe \+ signals to avoid manual subscriptions  
 ✔ Reusable Angular components  
 ✔ Full CRUD integration with the backend

### **Backend Features (.NET 8 Web API)**

✔ BlogPost CRUD endpoints  
 ✔ Category CRUD endpoints  
 ✔ AutoMapper profiles for DTO ↔ Model conversion  
 ✔ EF Core migrations for database setup

## **📦 Tech Stack**

### **Frontend**

* Angular (latest)

* NGRX Store \+ Effects

* Angular Signals

* RxJS (minimal usage)

* Bootstrap / Material (depending on your setup)

* Async pipe (no manual subscriptions)

* Type-safe state management (no `any`)

### **Backend**

* .NET 8 Web API

* Entity Framework Core

* SQL Server

* AutoMapper

# **🖼 Core Features Explained**

### **➤ Blog CRUD**

* List all posts

* Create post

* Edit post

* Delete post

* Category selection via dropdown

### **➤ Categories Module**

* List categories

* Create / Edit

* Used by Blog module

### **➤ UI Enhancements**

* Loaders

* Responsive layout

* Error handling

* Alerts/snackbars (optional)

### **Backend \-** 

### **1\.  Install dependencies**

`dotnet restore`

### **2\. Update `appsettings.json` with your SQL Server connection**

`"ConnectionStrings": {`  
  `"DefaultConnection": "Server=.;Database=BlogDb;Trusted_Connection=True;TrustServerCertificate=True;"`  
`}`

### **3\. Run EF Core migrations**

`dotnet ef database update`

### **4\. Run the API**

`dotnet run`

###   **Frontend \-** 

### **`1. Navigate to the Angular project`**

`cd frontend`

### **`2. Install packages`**

`npm install`

### **`3. Start the Angular app`**

`ng serve --open`

